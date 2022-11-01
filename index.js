const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const express = require('express');
const dotenv = require("dotenv");
var cors = require("cors")
const app = express();
const router = require('express').Router();
app.use(cors());
app.use(express.json());
app.options('*', cors());
dotenv.config();

const token = process.env.TOKEN;

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
    //console.log('asdf');

  } catch (error) {
    //console.log(error);
  }
};

bot.onText(/\/espri/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = getData();
  resp.then(x => {
    bot.sendMessage(chatId, JSON.stringify(x.soru));
    setTimeout(() => {
      bot.sendMessage(chatId, JSON.stringify(x.cevap + " 😂"));
    }, 500);

  })
});

bot.onText(/\/caylabizi/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendPhoto(chatId, "https://trthaberstatic.cdn.wp.trt.com.tr/resimler/1474000/cay-istanbul-1475368.jpg");
});


bot.onText(/\/caylabizi/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendPhoto(chatId, "https://trthaberstatic.cdn.wp.trt.com.tr/resimler/1474000/cay-istanbul-1475368.jpg");
});
