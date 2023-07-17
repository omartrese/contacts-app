const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');       

const app = express();
const port = 8000;

app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: "main"
}));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    // res.send("hello world");
    res.render('home');

});

app.listen(8000);
console.log(`listening on port ${port}`);