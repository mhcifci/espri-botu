const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const express = require('express');

const dotenv = require("dotenv");
var cors = require("cors")
const app = express();
app.use(cors());
app.use(express.json());
app.options('*', cors());
dotenv.config();

const token = process.env.TOKEN;

// import axioconst TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {
    polling: true
});



const getData = async () => {
  try {
    const result = await axios.get(process.env.API_URL);
    if (result.status < 399) {
        console.log(result.data);
        return result.data;
    }
    console.log('asdf');
    
  } catch (error) {
    console.log(error);
  }
};


// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const resd = getData();
    resd.then(x=>{
        bot.sendMessage(chatId, JSON.stringify(x.soru));
        setTimeout(() => {
            bot.sendMessage(chatId, JSON.stringify(x.cevap + " 😂"));
        }, 500);
        
    })
});

app.listen(process.env.PORT, () => {
  console.log(`Express server is listening on ${process.env.PORT}`);
});

