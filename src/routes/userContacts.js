const express = require('express');
let currentUser = require('./auth').currentUser;
const router = express.Router();
let user;

router.use(express.urlencoded());

router.get('/contacts', (req, res) => {  
    
    if (currentUser) {
        let user = currentUser();
        setUserName(user);
        console.log("CURRENT USER= " + user.username);
        res.redirect(`/contacts/${user.username}`);
    } else {
      res.redirect('/auth/login');
      console.log("algo no va por aquí my broder");
    }
  });

router.get('/contacts/:user', (req, res) => {
    res.send("lo conseguiste hijo de fruta");
});

function setUserName(user)
{
    this.user = user;
}


module.exports = router;