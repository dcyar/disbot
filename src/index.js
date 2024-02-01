const path = require('path');
require('dotenv/config');
const { Client, GatewayIntentBits } = require('discord.js');
const { CommandKit } = require('commandkit');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

new CommandKit({
    client,
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events'),
    bulkRegister: true,
    devGuildIds: [process.env.DEV_GUILD_ID],
})

client.login(process.env.DISCORD_TOKEN);