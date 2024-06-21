const express = require('express');
const router = express.Router();
const { generateToken } = require('../utils/jwtHelper');
const { getHashPassword, comparePasswords } = require('../utils/passwordHelper');
const user = require('../models/user');

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({message: 'Missing required parameters'});
    
    user.getUser(email, async (err, userData) => {
        if (err || !userData) return res.status(400).json({message: "Invalid email or password."});

        const validPassword = await comparePasswords(password, userData.password);
        if (!validPassword) return res.status(400).json({message: "Invalid email or password."});

        const token = generateToken(userData);
        res.json({token, name: userData.name, message: "Login successful!"});
    });
});

router.post("/register", async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) return res.status(400).json({message: 'Missing required parameters'});
    const hashPassword = await getHashPassword(password);

    user.addUser(name, email, hashPassword, (err, userData) => {
        if (err) return res.status(400).send({ message: "User already exists" });
        const token = generateToken(userData);
        return res.json({token, name, message: "User created successfully!"});
    });
});
  
module.exports = router;