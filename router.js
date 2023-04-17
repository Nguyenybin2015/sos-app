const express = require('express');
const router = express.Router();
const db = require('./dbConnection');
const { signupValidation, loginValidation } = require('./validation');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Speakeasy = require("speakeasy");
require('dotenv').config();


router.post('/register', signupValidation, (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
            req.body.email
        )});`,
        (err, result) => {
            if (result.length) {
                return res.status(409).send({
                    msg: 'This user is already in use!',
                    status: '409 Conflict'
                });
            } else {
                // username is available
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            msg: err,
                            status: '500 Internal Server Error'
                        });
                    } else {
                        // has hashed pw => add to database
                        db.query(
                            `INSERT INTO users (name, email, password) VALUES ('${req.body.name}', ${db.escape(
                                req.body.email
                            )}, ${db.escape(hash)})`,
                            (err, result) => {
                                if (err) {
                                    return res.status(400).send({
                                        msg: err,
                                        status: '400 Bad Request'
                                    });
                                    throw err;
                                }
                                return res.status(201).send({
                                    msg: 'The user has been registerd with us!',
                                    status: '201 Created'
                                });
                            }
                        );
                    }
                });
            }
        }
    );
});

router.post('/login', (req, res, next) => {
    // check email valid or invalid
    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (emailRegex.test(req.body.email)) {
        next();
    }
    else {
        console.log("Email or password is invalid");
        return res.status(401).send({
            msg: 'Please include a valid email and password',
            status: '401 Unauthorized'
        });
    }
}, (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
        (err, result) => {
            // user does not exists
            if (err) {
                throw err;
                return res.status(400).send({
                    msg: err,
                    status: '400 Bad Request'
                });
            }
            if (!result.length) {
                return res.status(401).send({
                    msg: 'Email or password is incorrect!',
                    status: '401 Unauthorized'
                });
            }
            // check password
            bcrypt.compare(
                req.body.password,
                result[0]['password'],
                (bErr, bResult) => {
                    // wrong password
                    if (bErr) {
                        throw bErr;
                        return res.status(401).send({
                            msg: 'Email or password is incorrect!',
                            status: '401 Unauthorized'
                        });
                    }
                    if (bResult) {
                        const secret = Speakeasy.generateSecret({ name: result[0].name });
                        // console.log(secret);
                        var token = Speakeasy.totp({
                            secret: process.env.SECRET_TOKEN,
                            encoding: "base32",
                        });
                        // console.log(process.env.SECRET_TOKEN)
                        // console.log(token);
                        // console.log(req.body.TokenClient);
                        try {
                            var verify = Speakeasy.totp.verify({
                                secret: process.env.SECRET_TOKEN,
                                encoding: "base32",
                                token: req.body.TokenClient
                            });
                            console.log(verify);
                            if (verify) {
                                return res.status(200).send({
                                    msg: 'Logged in!',
                                    user: result[0],
                                    status: '200 OK'
                                });
                            }
                            else {
                                return res.Pleasestatus(401).send({
                                    msg: 'Include a valid OTP',
                                    status: '401 Unauthorized'
                                })
                            }
                        } catch (verify) {
                            return res.send({
                                TokenClient: token
                            });

                        }
                    }
                    return res.status(401).send({
                        msg: 'Username or password is incorrect!',
                        status: '401 Unauthorized'
                    });
                }
            );
        }
    );
});

// router.get('/logout', (req, res) => {
//     if (condition) {

//     }
// });
module.exports = router;