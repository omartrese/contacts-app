const express = require('express');
let currentUser = require('./auth').currentUser;
const router = express.Router();
const sql = require('./../db');
let user; 

router.get('/contacts', (req, res) => {  
    
    if (currentUser) {
      user = currentUser();
      console.log("CURRENT USER= " + user.username);
      res.redirect(`/contacts/${user.username}`);
    } else {
      res.redirect('/auth/login');
      console.log("algo no va por aquí my broder");
    }
  });

router.get('/contacts/:user', (req, res) => {
  console.log(user);
  // TODO --> Start doing the freaking contacts backend to end t his shitty project, I wanna do a Fucking videogame with Unity and Blender
  
  sql.query(`SELECT * FROM contacts WHERE userOwner = '${user.username}'`, (err, results) => {
    if(err) return console.log(err);

    res.render('contacts', {username: user.username, contacts: results});
    })
});

router.post('/contacts/:user', (req, res) => {
  console.log(req.body)
  res.redirect(`/contacts/${currentUser().username}`);
  // TODO --> make this post request adds the contacts to the database
})

router.get('/contacts/:user/add', (req, res) => {
  res.render('add', {username: currentUser().username});
})



module.exports = router;