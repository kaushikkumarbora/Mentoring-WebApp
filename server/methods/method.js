const methods = {};

methods.signIn = require('./signin');
methods.signOut = require('./signout');
methods.register = require('./register');
methods.getMentorbyID = require('./getmentor');
methods.getMenteebyID = require('./getmentee');
methods.getChat = require('./getchat');
methods.sendMessage = require('./sendmessage');
methods.Feedback = require('./feedback');
methods.Event = require('./event');
methods.sendReport = require('./report');
methods.Status = require('./mentor_status');

module.exports = methods;