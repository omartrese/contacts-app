const express = require('express');
let currentUser = require('./auth').currentUser;
const router = express.Router();
const sql = require('./../db');
let user; 

router.use(express.json());
router.use(express.urlencoded({extended:true}));


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
  
  sql.query(`SELECT * FROM contacts WHERE userOwner = '${user.username}'`, async (err, results) => {
    if(err) return console.log(err);
    
    await res.render('contacts', {username: user.username, contacts: results});
  })
});


router.get('/contacts/:user/add', async (req, res) => {
  await res.render('add', {username: user.username});
});


router.post('/contacts/:user', (req, res) => {
  //console.log(req.body)
  let contactName = req.body.name;
  let contactTlf = req.body.tlf;
  // TODO --> make this post request adds the contacts to the database

  sql.query('INSERT INTO contacts SET ?', {name: contactName, tlfnum: contactTlf, userOwner: user.username}, (error) => {
    if(error) return res.status(500, {Error: 'not valid data'}); 
    console.log('current user is: ', user);
    
  });
  res.redirect(`/contacts`);
});


router.post('/contacts/delete/:id', (req, res) => {
  const contactId = req.params.id;
  console.log('contact ID: ', contactId);
  
  sql.query(`DELETE FROM contacts WHERE id = ${contactId}`, (error) => {
    if (error) return console.log(error);
  });

  res.redirect(`/contacts`);
});


module.exports = router;