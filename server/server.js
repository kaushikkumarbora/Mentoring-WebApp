const express = require('express');
const path = require('path');
const fs = require('fs')
const rateLimit = require("express-rate-limit");

const method = require('./methods/method')
const database = require('./database/database');
const authJwt = require('./methods/auth/authJwt');
const db = require('./database/database');

const app = express();
database.sequelize.sync();

const filepath = path.join(__dirname, 'build/');
console.log('path: ' + filepath);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: "Too many requests, please try again after 15 minutes"
});

app.use(limiter);

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

app.post('/register', method.register);

app.get('/mentor/:mentorID', [authJwt.verifyToken, authJwt.verifyUsertype], method.getMentorbyID);

app.get('/mentee/:menteeID', [authJwt.verifyToken, authJwt.verifyUsertype], method.getMenteebyID);

app.post('/report', [authJwt.verifyToken, authJwt.verifyUsertype], method.sendReport);

app.get('/feedback', [authJwt.verifyToken, authJwt.verifyUsertype], method.Feedback.getFeedback);

app.post('/feedback', [authJwt.verifyToken, authJwt.verifyUsertype], method.Feedback.sendFeedback);

app.get('/event', [authJwt.verifyToken, authJwt.verifyUsertype], method.Event.getEvent);

app.post('/event', [authJwt.verifyToken, authJwt.verifyUsertype], method.Event.sendEvent);

app.post('/event/:eventID', [authJwt.verifyToken, authJwt.verifyUsertype], method.Event.approveEvent);

app.get('/chat/:otherID', [authJwt.verifyToken, authJwt.verifyUsertype], method.getChat);

app.get('/chat', [authJwt.verifyToken, authJwt.verifyUsertype], method.getChat);

app.post('/message/', [authJwt.verifyToken, authJwt.verifyUsertype], method.sendMessage);

app.get('/status', [authJwt.verifyToken, authJwt.verifyUsertype], method.Status.getstatus);

app.post('/status/register', [authJwt.verifyToken, authJwt.verifyUsertype], method.Status.register);

app.post('/status/recuse', [authJwt.verifyToken, authJwt.verifyUsertype], method.Status.recuse);

app.listen(8080);

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