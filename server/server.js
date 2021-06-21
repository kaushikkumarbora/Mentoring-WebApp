const express = require('express');
const path = require('path');
const fs = require('fs')

const method = require('./methods/method')
//const database = require('./database/database');
const authJwt = require('./methods/auth/authJwt')

const app = express();
//database.sequelize.sync({ force: true });


const filepath = path.join(__dirname, '../client/build/');
console.log('path: ' + filepath);

app.use((req, res, next) => {
  console.log('Debug Middleware: ' + req.path);
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(filepath, { index: false }));

app.get('/', (req, res) => {
  res.sendFile(filepath + 'index.html');
  console.log('Sent index.html');
})

app.post('/signin', method.signIn);

app.post('/signout', method.signOut);

app.get('/mentor/:mentorID', [authJwt.verifyToken, authJwt.verifyUsertype], method.getMentorbyID);

app.get('/mentee/:menteeID', [authJwt.verifyToken, authJwt.verifyUsertype], method.getMenteebyID);

app.get('/chat', [authJwt.verifyToken, authJwt.verifyUsertype], method.getChat);

app.post('/chatsend/:chatID', [authJwt.verifyToken, authJwt.verifyUsertype], method.sendMessage);

app.listen(4000);

/*
  Todo
  /         GET     send index.html
  /signin   POST    respond success or failure and token -----DONE-----PARTIAL----

  BELOW all + token

  /signout  POST    respond success or failure and delete token
  /mentor/:mentorID   GET   respond json with details 0 for all mentors
  /mentee/:menteeID   GET   respond json with details 0 for all mentee
  /chat               GET   respond with active and dead chat
  /chatsend/:chatid + data   POST  respond with success or fail


*/