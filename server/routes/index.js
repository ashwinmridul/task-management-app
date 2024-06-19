const express = require('express');
const router = express.Router();
const csvdb = require('csv-database');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcryptjs");
const { generateToken } = require('../utils/jwtHelper');
const path = require('path');

const salts = 10; // Store this securely!

const getUserDB = async () => {
    const filePath = path.join(__dirname, 'data', 'users.csv');
    return await csvdb(filePath, ["id", "name", "email", "password"]);

};

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({message: 'Missing required parameters'});
    const userDB = await getUserDB();

    const user = await userDB.get({ email });
    if (!user || !user.length) return res.status(400).json({message: "Invalid email or password."});

    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) return res.status(400).json({message: "Invalid email or password."});

    const token = generateToken(user[0]);
    res.json({ token, name: user[0].name, message: "Login successful!" });
});

router.post("/register", async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) return res.status(400).json({message: 'Missing required parameters'});
    const userDB = await getUserDB();
    const existingUser = await userDB.get({ email });
    if (existingUser && existingUser.length > 0) return res.status(400).send({ message: "User already exists" });
    try {
        const id = uuidv4();
        const hashPassword = await bcrypt.hash(password, salts);
        const user = { id, email, password: hashPassword, name };
        await userDB.add(user);
        const token = generateToken(user);
        res.json({ token, name, message: "User created successfully!" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Error creating user" });
    }
});
  
module.exports = router;