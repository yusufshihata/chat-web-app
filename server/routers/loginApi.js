const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const LoginValidator = require('../models/validation/loginValidation');
const User = require('../models/User');
const cookie_parser = require('cookie-parser');


router.post('/', async (req, res) => {
    const { error } = LoginValidator(req.body);

    if (error) {
        return res.status(400).send({ msg: "Invalid Data"});
    }

    const { email, password } = req.body;

    const user = await User.findOne({ "email": email });

    if(!user) {
        return res.status(404).send({msg: "Email is not Found"});
    };

    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword) {
        return res.status(400).send({ "msg": "Password isn't Correct" });
    };

    const token = jwt.sign({ id: user._id }, "Stack", { expiresIn: "1hr" }, process.env.JWT_TOKEN);

    res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });

    res.status(200).send({ auth: true, token: token });

});

module.exports = router;
