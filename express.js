const express = require('express');

const dotenv = require("dotenv");
var cors = require("cors")
const app = express();
app.use(cors());
app.use(express.json());
app.options('*', cors());
dotenv.config();

const TOKEN = process.env.TOKEN;


const TelegramBot = require('node-telegram-bot-api');

// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);
const url = 'https://esprituel-ayi.herokuapp.com/';
const port = process.env.PORT;
// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${url}/bot${TOKEN}`);



// parse the updates to JSON

// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start Express Server
app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});

// Just to ping!
bot.on('message', msg => {
  bot.sendMessage(msg.chat.id, 'I am alive!');
});