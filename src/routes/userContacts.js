const express = require('express');
let currentUser = require('./auth').currentUser;
const router = express.Router();
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

router.get('/contacts/:user', async (req, res) => {
    // res.send("lo conseguiste hijo de fruta");
    res.render('contacts', {username: user.username});
    console.log(user);
});


module.exports = router;