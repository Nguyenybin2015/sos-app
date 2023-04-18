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
        `SELECT * FROM profile_user WHERE LOWER(email) = LOWER(${db.escape(
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
                        db.query(`INSERT INTO profile_user (email) VALUES (${db.escape(req.body.email)})`, (err, results) => {
                            if (err) {
                                // console.log(err);
                                res.status(500).send({
                                    msg: err,
                                    status: '500 Internal Server Error'
                                });
                            } else {
                                db.query(`INSERT INTO users (name, email, password) VALUES ('${req.body.name}', ${db.escape(req.body.email)}, ${db.escape(hash)})`, (err, results) => {
                                    if (err) {
                                        // console.log(err);
                                        res.status(500).send({
                                            msg: err,
                                            status: '500 Internal Server Error'
                                        });
                                    } else {
                                        res.status(201).send({
                                            msg: 'The user has been registerd with us!',
                                            status: '201 Created'
                                        });
                                    }
                                });
                            }
                        });
                        // has hashed pw => add to database
                        // db.query(
                        //     `INSERT INTO users (name, email, password) VALUES ('${req.body.name}', ${db.escape(req.body.email)}, ${db.escape(hash)}),
                        //     INSERT INTO profile_user (email) VALUES (${db.escape(req.body.email)})`,
                        //     (err, result) => {
                        //         if (err) {
                        //             return res.status(400).send({
                        //                 msg: err,
                        //                 status: '400 Bad Request'
                        //             });
                        //             throw err;
                        //         }
                        //         return res.status(201).send({
                        //             msg: 'The user has been registerd with us!',
                        //             status: '201 Created'
                        //         });
                        //     }
                        // );
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

router.get('/users/:userId', (req, res, next) => {
    const userId = req.params.userId;

    db.query(`SELECT * FROM users, profile_user WHERE id = ${userId}`, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal server error');
        } else {
            if (rows.length === 0) {
                res.status(404).send('User not found');
            } else {
                res.status(200).send(rows[0]);
            }
        }
    });

});
router.put('/users/:userId', (req, res, next) => {
    const userId = req.params.userId;

    db.query(`SELECT * FROM users, profile_user WHERE id = ${userId}`, (err, result) => {
        console.log({ result })
        if (err) {
            console.log(err);
            res.status(500).send('Internal server error');
        } else {
            if (result.length === 0) {
                res.status(404).send('User not found');
            } else {
                const user = result[0];

                if (req.body.name) user.name = req.body.name;
                console.log(req.body.name);
                // if (req.body.email) user.email = req.body.email;
                // if (req.body.password) user.password = req.body.password;
                // if (req.body.phone) user.phone = req.body.phone;
                if (req.body.avatar) user.avatar = req.body.avatar;
                if (req.body.lock_deposits) user.lock_deposits = req.body.lock_deposits;
                if (req.body.lock_withdrawals) user.lock_withdrawals = req.body.lock_withdrawals;
                if (req.body.maintenance) user.maintenance = req.body.maintenance;
                if (req.body.close_system) user.close_system = req.body.close_system;

                // Update the user's profile information in the database
                console.log(user.name)
                console.log(user.avatar)
                console.log(user.lock_deposits)
                console.log(user.lock_withdrawals)
                console.log(user.maintenance)
                console.log(user.close_system)
                console.log(user.id)
                db.query(`UPDATE users, profile_user SET name = '${user.name}, avatar = ${user.avatar}, lock_deposits = ${user.lock_deposits}, lock_withdrawals = ${user.lock_withdrawals}, maintenance = ${user.maintenance}, close_system = ${user.close_system}  WHERE id = ${user.id}`, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Internal server error');
                    } else {
                        if (result.affectedRows === 0) {
                            res.status(400).send('Invalid request');
                        } else {
                            res.status(200).send('Profile updated successfully');
                            // console.log(userId)
                            db.query(`SELECT * FROM users, profile_user WHERE id = ${userId}`, (err, user) => { console.log({ user }) });

                        }
                    }
                });
                // db.query(`UPDATE users, profile_user SET name = ?, avatar = ?, lock_deposits = ?, lock_withdrawals = ?, maintenance = ?, close_system = ?  WHERE id = ?`, [user.name, user.avatar, user.lock_deposits, user.lock_withdrawals, user.maintenance, user.close_system, userId], (err, result) => {
                //     if (err) {
                //         console.log(err);
                //         res.status(500).send('Internal server error');
                //     } else {
                //         if (result.affectedRows === 0) {
                //             res.status(400).send('Invalid request');
                //         } else {
                //             res.status(200).send('Profile updated successfully');
                //             // console.log(userId)
                //             db.query(`SELECT * FROM users, profile_user WHERE id = ${userId}`, (err, user) => { console.log({user})});

                //         }
                //     }
                // });
            }
        }
    });

});

// router.get('/logout', (req, res) => {
//     if (condition) {

//     }
// });
module.exports = router;