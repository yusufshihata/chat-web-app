const express = require("express");
const router = express.Router();
const Joi = require('@hapi/joi');
const User = require('../models/User');
const RegisterValidator = require("../models/validation/registerValidation");
const bcrypt = require("bcrypt");


router.post('/', async (req, res) => {
	const { error } = RegisterValidator(req.body);

    if (error) {
        return res.status(400).json({ "msg": "There is an Error in your data" });
    }

    const is_exist = await User.findOne({ "email" :req.body.email });

    if (is_exist) {
        return res.status(400).json({ "msg": "The user is already exists" });
    }
    
    const salt = await bcrypt.genSalt(10);
    user_password = await bcrypt.hash(req.body.password, salt);

    if (req.body.age < 12) {
    	return res.status(400).send({ "msg": "You must be at least 12 years old to use this app" });
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: user_password,
        age: req.body.age,
        friends: [],
    };

    const UserData = await new User(data);

    try {
        const saved_user = await User.collection.insertOne(UserData);
        res.status(200).send(saved_user);
    }

    catch(err) {
        res.status(400).send("User Didn't add");
    };
});

module.exports = router;
