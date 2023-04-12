// two factor authentication nodejs otp
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const app = express();


app.post("/totp-secret", (req, res, next) => {
    var secret = Speakeasy.generateSecret({ length: 20 });
    res.send({ "secret": secret.base32 });
});
app.post("/totp-generate", (req, res, next) => {
    res.send({
        "token": Speakeasy.totp({
            secret: req.body.secret,
            encoding: "base32"
        }),
        "remaining": (30 - Math.floor((new Date()).getTime() / 1000.0 % 30))
    });
});
app.post("/totp-validate", (req, res, next) => {
    res.send({
        "valid": Speakeasy.totp.verify({
            secret: req.body.secret,
            encoding: "base32",
            token: req.body.token,
            window: 0
        })
    });
});