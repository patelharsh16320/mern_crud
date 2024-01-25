const jwt = require('jsonwebtoken');
// const User = require("../model/userSchema");
const Employee = require ("../model/empSchema");
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const EmpAuthenticate = async (req, res, next) => {

    try {

        const token = req.cookies;
        const jToken = token.jwttoken;
        const verifiyToken = jwt.verify(jToken, process.env.SECRET_KEY);

        const rootUser = await Employee.findOne({ _id: verifiyToken._id, "tokens.token": jToken });

        if (!rootUser) {
            console.log('User not found');
        } 

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch (err) {
        res.status(401).send("Unautorized: No token Provided...")
        console.log(err.message)
    }
}

module.exports = EmpAuthenticate;