const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const sql = require('./../db');

let isAuth = false;
let currentUser = null;

function getCurrentUser()
{
    return currentUser;
}

function setCurrentUser(user)
{
    currentUser = user;
}

router.use(express.json());
router.use(express.urlencoded({extended:true}));
router.use(cookieParser());

router.use(express.text());

router.get('/auth', (req, res) => res.redirect('/'));

router.get('/auth/signup', (req, res) => res.render('signup'));

router.post('/auth/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const cryptedPass = bcrypt.hashSync(password, 8);
    sql.query('INSERT INTO users SET ?', {username: username, password: cryptedPass}, async (error) => {
        if(error){
            res.status(500, {error: 'that username already exists'});
            
        } 
        res.cookie('user', username);
        console.log('Cookies: ', req.cookies);
        console.log('Signed Cookies: ', req.signedCookies);
        res.redirect('/auth');
    });
        
});


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
        } else 
        {
            isAuth = true;
            setCurrentUser(results[0]);
            res.redirect('/contacts');

            console.log(currentUser);

            console.log('Cookies: ', req.cookies);
            console.log('Signed Cookies: ', req.signedCookies);
            
        }
    })
});


module.exports = {
    router: router,
    currentUser: getCurrentUser
};