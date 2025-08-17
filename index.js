const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.GuildMember,
        Partials.User
    ]
});
const { readdirSync } = require("fs")
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const config = require("./config.js");
const { log } = require("./src/helpers/functions.js");
const db = require("quick.db");
const schedule = require('node-schedule');


client.commands = new Collection();
client.messageCommands = new Collection();
client.aliases = new Collection();

const rest = new REST({ version: '10' }).setToken(config.token);


const commands = [];
const commandFiles = readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    try {
        const command = require(`./src/commands/${file}`);
        
        
        if (command.data) {
            commands.push(command.data.toJSON());
            client.commands.set(command.data.name, command);
            log(`Loaded slash command ${file}`);
        }
        
        else if (command.name) {
            client.messageCommands.set(command.name, command);
            if (command.aliases) {
                command.aliases.forEach(alias => {
                    client.aliases.set(alias, command.name);
                });
            }
            log(`Loaded message command ${file}`);
        } else {
            log(`Skipped loading ${file} - Invalid command structure`);
        }
    } catch (error) {
        console.error(`Error loading command ${file}:`, error);
    }
}


const eventFiles = readdirSync('./src/events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./src/events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
    log(`Loaded event ${file}`);
}


client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;

    const prefix = config.ticket?.prefix || "!";
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    let command = client.messageCommands.get(cmd);
    if (!command) command = client.messageCommands.get(client.aliases.get(cmd));

    if (command) {
        try {
            command.run(client, message, args);
        } catch (error) {
            console.error(error);
            message.reply("There was an error executing that command.").catch(console.error);
        }
    }
});


client.on("ready", async () => {
    try {
        if (commands.length > 0) {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );
        }
    } catch (error) {
        console.error(error);
    }
    log(`${client.user.username} has been started!`);
});


const blacklist = db.fetch("blacklist")
if (!blacklist) {
    db.set("blacklist", [])
}


schedule.scheduleJob('0 0 * * *', async () => {
    await db.delete("staffs.daily")
});

schedule.scheduleJob('0 0 * * 0', async () => {
    await db.delete("staffs.weekly")
});

schedule.scheduleJob('0 0 1 * *', async () => {
    await db.delete("staffs.monthly")
});


client.login(config.token);
