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

    // const hashPassword = bcrypt.hash(password, );

    bcrypt.hash(password, 8, async(err, hash) => {
        // Store hash in your password DB.
        await sql.query('INSERT INTO users SET ?', {username: username, password: password}, async (error) => {
            if(error){
                throw error;
                res.redirect('/');
            } 
            res.redirect('/login');
        })
    });
})

router.get('/auth/login', (req, res) => res.render('login'));
router.post('/auth/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    if(username && password)
    {
        
        sql.query(`SELECT username FROM users WHERE username = ?`, [username], async (error, result) => {

            if(error) throw error;
            if(result.length === 0 || await bcrypt.compare(password, results[0].password))
            {
                throw new error("no valido");
                res.redirect('/auth/login');
                console.log("mierda, no funcionó");
            } 
            
            res.redirect('/contacts');
                

        })

    }
}); 

module.exports = router;