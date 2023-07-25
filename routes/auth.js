const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:false}));
router.use(express.text());

router.get('/auth', (req, res) => res.redirect('/'));

router.get('/auth/signup', (req, res) => res.render('signup'));

router.post('/auth/signup', (req, res) => {
    res.send(req.body);
    res.send(req.params);
})

router.get('/auth/login', (req, res) => res.render('login'));

module.exports = router;