const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// import axioconst TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '5408801300:AAGDGGTh92QQiUmKCx5qx2f8qvGrrwidGtQ';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {
    polling: true
});


const getData = async () => {
  try {
    const result = await axios.get('https://espriapi.azurewebsites.net/api/HttpTriggerCSharp?method=guldur');
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
    console.log('object');
    const resd = getData();
    console.log(resd);
    resd.then(x=>{
        bot.sendMessage(chatId, JSON.stringify(x.soru));
        setTimeout(() => {
            bot.sendMessage(chatId, JSON.stringify(x.cevap + " 😂"));
        }, 500);
        
    })
});