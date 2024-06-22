const router = require('./index');
const express = require('express');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const pg = require('pg');

jest.mock('../models/user');
jest.mock('jsonwebtoken');
jest.mock('bcryptjs');
jest.mock('pg');

class Client {
    constructor() {}
    connect(err) {
        throw err;
    }
}

describe('Index Route', () => {
  const app = express();
  app.use(express.json());
  app.use('/', router);

  beforeEach(() => {
    user.getUser = jest.fn();
    user.addUser = jest.fn();
    jwt.sign = jest.fn();
    bcrypt.hash = jest.fn();
    bcrypt.compare = jest.fn();
    pg.Client = jest.fn();
    pg.Client.mockImplementation((config) => Client);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('POST /login', () => {
    it('should return 400 if email or password is missing', async () => {
      const res = await request(app).post('/login').send({});
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Missing required parameters');
    });

    it('should return 400 if email or password is invalid', async () => {
      user.getUser.mockImplementation((email, cb) => cb('Invalid email or password.'));
      const res = await request(app).post('/login').send({ email: 'test@example.com', password: 'password' });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Invalid email or password.');
    });

    it('should return a token if email and password are valid', async () => {
      const userData = { id: 1, email: 'test@example.com', password: 'hashedPassword' };
      user.getUser.mockImplementation((email, cb) => cb(null, userData));
      bcrypt.compare.mockImplementation((password, hashPassword) => true);
      jwt.sign.mockImplementation((payload, secretOrPrivateKey, options, callback) => 'token');

      const res = await request(app).post('/login').send({ email: 'test@example.com', password: 'password' });
      expect(res.status).toBe(200);
      expect(res.body.token).toBe('token');
      expect(res.body.name).toBe(userData.name);
      expect(res.body.message).toBe('Login successful!');
    });
  });

  describe('POST /register', () => {
    it('should return 400 if email, password, or name is missing', async () => {
      const res = await request(app).post('/register').send({});
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Missing required parameters');
    });

    it('should return 400 if user already exists', async () => {
      user.addUser.mockImplementation((name, email, password, cb) => cb('User already exists'));
      const res = await request(app).post('/register').send({ email: 'test@example.com', password: 'password', name: 'John Doe' });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('User already exists');
    });

    it('should return a token if user is created successfully', async () => {
      const userData = { id: 1, email: 'test@example.com', password: 'hashedPassword', name: 'John Doe' };
      user.addUser.mockImplementation((name, email, password, cb) => cb(null, userData));
      bcrypt.hash.mockImplementation((password, salts) => 'hashedPassword');
      jwt.sign.mockImplementation((payload, secretOrPrivateKey, options, callback) => 'token');

      const res = await request(app).post('/register').send({ email: 'test@example.com', password: 'password', name: 'John Doe' });
      expect(res.status).toBe(200);
      expect(res.body.token).toBe('token');
      expect(res.body.name).toBe(userData.name);
      expect(res.body.message).toBe('User created successfully!');
    });
  });
});