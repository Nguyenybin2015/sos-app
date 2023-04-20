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
                                        db.query(`SELECT id FROM users WHERE email = ${db.escape(req.body.email)}`, (err, id) => {
                                            // console.log(id)
                                            res.status(201).send({
                                                msg: 'The user has been registerd with us!',
                                                user: id[0],
                                                status: '201 Created'
                                            });
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

var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
router.post('/login', (req, res, next) => {
    // check email valid or invalid
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

    // Check if the user exists
    db.query(`SELECT * FROM users INNER JOIN profile_user ON users.email = profile_user.email WHERE users.id = ${userId} `, async (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal server error');
        } else {
            if (result.length === 0) {
                res.status(404).send('User not found');
            } else {
                // Update the user's profile information
                const user = result[0];
                // console.log(req.body);

                // user.password = await bcrypt.hash(req.body.password, 10);
                if (req.body.name) user.name = req.body.name;
                if (req.body.avatar) user.avatar = req.body.avatar;
                if (req.body.lock_deposits) user.lock_deposits = req.body.lock_deposits;
                if (req.body.lock_withdrawals) user.lock_withdrawals = req.body.lock_withdrawals;
                if (req.body.maintenance) user.maintenance = req.body.maintenance;
                if (req.body.close_system) user.close_system = req.body.close_system;
                if(req.body.email){
                    if (emailRegex.test(req.body.email)) {
                        user.email= req.body.email;
                    }
                    else {
                        console.log("Email or password is invalid");
                            res.status(401).send({
                            msg: 'Please include a valid email and password',
                            status: '401 Unauthorized'
                        });
                    }
                }
                db.query(`UPDATE users INNER JOIN profile_user ON users.id = profile_user.id SET name = ?, profile_user.email = ?, avatar = ?, lock_deposits = ?, lock_withdrawals = ?, maintenance = ?, close_system = ? WHERE users.id = ${userId}`, [user.name, user.email, user.avatar, user.lock_deposits, user.lock_withdrawals, user.maintenance, user.close_system],
                    async (err, result) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error');
                        } else {
                            if (req.body.password) {
                                var token = Speakeasy.totp({
                                    secret: process.env.SECRET_TOKEN,
                                    encoding: "base32",
                                });
                                try {
                                    var verify = Speakeasy.totp.verify({
                                        secret: process.env.SECRET_TOKEN,
                                        encoding: "base32",
                                        token: req.body.TokenClient
                                    });
                                    if (verify) {
                                        user.password = await bcrypt.hash(req.body.password, 10);
                                        db.query(`UPDATE users INNER JOIN profile_user ON users.id = profile_user.id SET password = ? WHERE users.id = ${userId}`, [user.password], () => {
                                            db.query(`SELECT * FROM users INNER JOIN profile_user ON users.id = profile_user.id WHERE users.id = ${userId} `, (err, profile) => {
                                                // console.log(profile)
                                                return res.status(200).send({
                                                    msg: 'Logged in!',
                                                    user: profile[0],
                                                    status: '200 OK'
                                                });
                                            });
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
                            else {
                                res.status(200).send('Profile updated successfully');
                            }
                        }
                    });



                // Update the user's profile information in the database
                // db.query(`UPDATE users, profile_user SET name = ?, profile_user.email = ?, password = ?, avatar = ?, lock_deposits = ?, lock_withdrawals = ?, maintenance = ?, close_system = ?`, [user.name, user.email, user.password, user.avatar, user.lock_deposits, user.lock_withdrawals, user.maintenance, user.close_system],
                //     (err, result) => {
                //         if (err) {
                //             console.log(err);
                //             res.status(500).send('Internal server error');
                //         } else {
                //             if (result.affectedRows === 0) {
                //                 res.status(400).send('Invalid request');
                //             } else {
                //                 res.status(200).send('Profile updated successfully');
                //             }
                //         }
                //     });
            }
        }
    });
});
// router.get('/logout', (req, res) => {
//     if (condition) {

//     }
// });
module.exports = router;