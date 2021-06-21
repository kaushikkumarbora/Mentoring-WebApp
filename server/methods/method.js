const methods = {};

methods.signIn = require('./signin');
methods.signOut = require('./signout');
methods.getMentorbyID = require('./getmentor');
methods.getMenteebyID = require('./getmentee');
methods.getChat = require('./getchat');
methods.sendMessage = require('./sendmessage');

module.exports = methods;