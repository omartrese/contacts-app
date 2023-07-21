const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:false}));
router.use(express.text());

router.get('/signup', (req, res) => res.render('signup'));

router.post('/signup', (req, res) => {
    res.send(req.body);
    res.send(req.params);
})

module.exports = router;