const express = require('express');
const router = express.Router();
const db = require('./dbConnection');
const { signupValidation, loginValidation } = require('./validation');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const twoFactor = require('./twoFactor.js');
const Speakeasy = require("speakeasy");

// two factor
router.post("/totp-secret", (req, res, next) => {
    var secret = Speakeasy.generateSecret({ length: 20 });
    res.send({ "secret": secret.base32 });
});
router.post("/totp-generate", (req, res, next) => {
    res.send({
        "token": Speakeasy.totp({
            secret: req.body.secret,
            encoding: "base32"
        }),
        "remaining": (30 - Math.floor((new Date()).getTime() / 1000.0 % 30)) // time 30 seconds
    });
});


router.post("/totp-validate", (req, res, next) => {
    res.send({
        "valid": Speakeasy.totp.verify({
            secret: req.body.secret,
            encoding: "base32",
            token: req.body.token,
            window: 1
        })
    });
});

router.post('/register', signupValidation, (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
            req.body.email
        )});`,
        (err, result) => {
            if (result.length) {
                return res.status(409).send({
                    msg: 'This user is already in use!'
                });
            } else {
                // username is available
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            msg: err
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
                                        msg: err
                                    });
                                    throw err;
                                }
                                return res.status(201).send({
                                    msg: 'The user has been registerd with us!'
                                });
                            }
                        );
                    }
                });
            }
        }
    );
});

router.post('/login', loginValidation, (req, res, next) => {
    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (emailRegex.test(req.body.email)) {
        db.query(
            `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
            (err, result) => {
                // user does not exists
                if (err) {
                    throw err;
                    return res.status(400).send({
                        msg: err
                    });
                }
                if (!result.length) {
                    return res.status(401).send({
                        msg: 'Email or password is incorrect!'
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
                                msg: 'Email or password is incorrect!'
                            });
                        }
                        if (bResult) {
                            const token = jwt.sign({ id: result[0].id }, 'the-super-strong-secrect', { expiresIn: '1h' });
                            // db.query(
                            //     `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
                            // );
                            return res.status(200).send({
                                msg: 'Logged in!',
                                token,
                                user: result[0]
                            });
                        }
                        return res.status(401).send({
                            msg: 'Username or password is incorrect!'
                        });
                    }
                );
            }
        );
    }
    else {
        console.log("Email or password is invalid");
        return res.status(401).send({
            msg: 'Please include a valid email and password'
        });
    }
});

// router.get('/logout', (req, res) => {
//     if (condition) {
        
//     }
// });
module.exports = router;