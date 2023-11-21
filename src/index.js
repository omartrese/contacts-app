const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');       

// const home = require('./routes/index.js');

const app = express();
const port = 8000;

app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: "main"
}));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(require('./routes/main.js'));
app.use(require('./routes/auth.js').router);
app.use(require('./routes/userContacts.js'));

// app.get('/', (req, res) => {
//     // res.send("hello world");
//     res.render('home');

// });

app.listen(port);
console.log(`listening on port ${port}`);
console.log(`URL: localhost:${port}`);