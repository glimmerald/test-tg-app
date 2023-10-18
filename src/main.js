import { Telegraf } from "telegraf";
import { message } from 'telegraf/filters';
import config from "config";
import { create } from "./notion.js";

const bot = new Telegraf(config.get('TELEGRAM_TOKEN'), {
    handlerTimeout: Infinity,
})

bot.command('start', ctx => {
    ctx.reply('Добро пожаловать в бота!')
})

bot.on(message('text'), async ctx =>{
    try {
        const couch = "тренер 1",
        date = new Date('April 28, 1998 05:35:32'),
        time = 12;
        const notionResponse = await create(couch, date.toISOString(), time);
        ctx.reply(`Ваша Страница: ${notionResponse.url} `)
    } catch(error) {
        ctx.reply(error);
        console.log("Error while processing");
    }
})

bot.launch();