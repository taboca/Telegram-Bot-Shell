var sys = require("sys"),
    path = require("path"),
    fs = require("fs")
    url = require("url"),
    config = require("./config.js"),
    shell = require('shelljs'),
    http = require("http");
 
var TelegramBot = require('node-telegram-bot-api');

var token = config.token;

var bot = new TelegramBot(token, {polling: true});

// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var resp = match[1];
  bot.sendMessage(fromId, resp);
});

// Any kind of message
bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  var fromId = msg.from.id;
  // photo can be: a file path, a stream or a Telegram file_id
  //var photo = 'image.png';
  //console.log(msg);
  if(msg.text.indexOf('ls')>-1) { 
 	shell.ls('*').forEach(function(file) { 
          bot.sendMessage(fromId, file);
        });
  } 
  if(msg.text.indexOf('cd')>-1) { 
	var par2 = msg.text.split('cd')[1];
 	shell.cd(par2);
        bot.sendMessage(fromId, 'ok');
  } 

});






