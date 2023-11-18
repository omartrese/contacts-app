const cookieParser = require('cookie-parser');
const express = require('express');
const router = express.Router();

router.use(cookieParser());

router.get('/', (req, res) => {
    res.render('home');
    console.log('Cookies: ', req.cookies);
    console.log('Signed Cookies: ', req.signedCookies);
});

module.exports = router;
