# CONTACTS APP

This is a contacts app made with node.js and express, using mySQL as RDBMS and Handlebars as 
HTML server-side rendering engine 

# DEVELOPMENT SET-UP

## 1. Clone the project

```
git clone https://github.com/omartrese/contacts-app.git
cd contacts-app
(probably you should to remove node_modules before init the proyect with npm)
npm init -y
npm i
```

## 2. Create the database and its tables

 First you need to have already installed mySQL server and then configure the db credentials in `/src/db.js`.
 
 Then execute or paste the SQL code from `/database/db.sql`

## 3. Run and test the app

`npm run run`
