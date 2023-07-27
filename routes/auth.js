const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const sql = require('./../db');

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.use(express.text());

router.get('/auth', (req, res) => res.redirect('/'));

router.get('/auth/signup', (req, res) => res.render('signup'));

router.post('/auth/signup', (req, res) => {
    // res.send(req.body);
    // res.send(req.params);
    const username = req.body.username;
    const password = req.body.password;
    const cryptedPass = bcrypt.hashSync(password, 8);
    // const hashPassword = bcrypt.hash(password, );

    sql.query('INSERT INTO users SET ?', {username: username, password: cryptedPass}, async (error) => {
        if(error){
            throw error;
        } 
        
        res.redirect('/auth');
    })
})

router.get('/auth/login', (req, res) => res.render('login'));
router.post('/auth/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const cryptedPass = bcrypt.hash(password, 8); 


    if(!username || !password)
    {
        res.send('COMPLETE LOS CAMPOS DEL FORMULARIO');
        console.log(username);
        console.log(password);
    }
    sql.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {

        if(results.length === 0 || !(bcrypt.compareSync(password, results[0].password)))
        {
            res.send('not valid data');
        } else res.send('funciono, putaso');
        
    })
}); 

module.exports = router;