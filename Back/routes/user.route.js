const express = require('express')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const router = express.Router()

router.post('/signup', async (req, res) => {
    const existingUser = await User.findOne({ email: req.body.email }).catch(err => {
        console.error(err);
        res.status(500).send("Error occurred while checking the user");
    });
    if (existingUser) {
        return res.status(400).send('Email is not available');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        email: req.body.email,
        password: hashedPassword
    });

    const savedUser = await user.save().catch(err => {
        console.error(err);
        res.status(500).send("Error occurred while saving the user");
    });
    if (savedUser) {
        res.json(savedUser);
    }
});

router.post('/signin', async (req, res) => {
    const user = await User.findOne({ email: req.body.email }).catch(err => {
        console.error(err);
        res.status(500).send("Error occurred while finding the user");
    });
    if (!user) {
        return res.status(400).send('Cannot find user');
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
        res.json(user);
    } else {
        res.status(400).send('Invalid password');
    }
});

module.exports = router
