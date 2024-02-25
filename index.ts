const Discord = require("discord.js");
const {
    Client,
    GatewayIntentBits,
    Partials,
    MessageActionRow,
    MessageButton,
    Permissions,
    ButtonStyle,
    IntentsBitField,
    PermissionsBitField,
    Collection,
} = Discord;
const client: typeof Client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent,
    ],
    shards: "auto",
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.User,
        Partials.ThreadMember,
    ],
});
const config: Object = require("./config.json");
const { readdirSync, writeFileSync } = require("fs");
const moment = require("moment");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
var path = require("path");

import { initDash } from "./dashboard/dashboard";

var fs = require("fs");
var path = require("path");

const mongoose = require("mongoose");

require("dotenv").config();

var token: String = process.env.DISCORD_TOKEN;

const rest = new REST({ version: "10" }).setToken(token);

mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const { Player } = require("discord-music-player");
const player = new Player(client, {
    leaveOnEmpty: true, // This options are optional.
});
// You can define the Player as *client.player* to easily access it.
client.player = player;

client.slashcommands = new Collection();
client.commandaliases = new Collection();

const log = (x: String): void => {
    console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${x}`);
};

//slash-command-handler
const slashcommands: Array<any> = [];

readdirSync("./commands").forEach((file) => {
    if (path.extname(file) != ".js") return;

    const command = require(`./commands/${file}`);
    //    console.log(command.disabled)
    if (command.disabled) return;
    /*     console.log(file)
    console.log(command)
    console.log(command.data)
    console.log(JSON.stringify(command.data))
    console.log(JSON.parse(JSON.stringify(command.data)))
    console.log("\n\n\n\n") */

    slashcommands.push(JSON.parse(JSON.stringify(command.data)));
    client.slashcommands.set(command.data.name, command);
});

client.on("ready", async () => {
    try {
        await rest.put(Routes.applicationCommands(client.user.id), {
            body: slashcommands,
        });
    } catch (error) {
        console.error(error);
    }

    await client.guilds.fetch();
    for (const [id, guild] of client.guilds.cache) {
        await guild.members.fetch();
    }

    const guildId = "1143529194601578569";
    var guildData = JSON.parse(
        JSON.stringify(client.guilds.cache.get(guildId))
    );
    var guild = client.guilds.cache.get(guildId);

    guildData.members.forEach((e, i) => {
        guildData.members[i] = guild.members.cache.get(e);

        guildData = JSON.parse(JSON.stringify(guildData));

        guildData.members[i].roles.forEach((f, j) => {
            guildData.members[i].roles[j] = guild.roles.cache.get(f);
        });
    });

    guildData.channels.forEach((e, i) => {
        guildData.channels[i] = guild.channels.cache.get(e);
    });
    guildData.roles.forEach((e, i) => {
        guildData.roles[i] = guild.roles.cache.get(e);
    });

    writeFileSync("data.json", JSON.stringify(guildData, null, 4));
    log(`${client.user.username} started!`);

    initDash(client);
});

const GuildSettings = require("./models/settings");
//event-handler
readdirSync("./events").forEach(async (file) => {
    if (path.extname(file) != ".js") return;

    const event = await require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, async (...args) => {
            if (args[0] && args[0].guild && args[0].guild.id) {
                let storedSettings = await GuildSettings.findOne({
                    guildID: args[0].guild.id,
                });

                if (!storedSettings) {
                    // If there are no settings stored for this guild, we create them and try to retrive them again.
                    const newSettings = new GuildSettings({
                        guildID: args[0].guild.id,
                    });

                    await newSettings.save().catch((e) => {
                        console.log(e);
                    });
                    storedSettings = await GuildSettings.findOne({
                        guildID: args[0].guild.id,
                    });
                }
                args = [storedSettings, ...args];
            }

            event.execute(...args);
        });
    } else {
        client.on(event.name, async (...args) => {
            if (args[0] && args[0].guild && args[0].guild.id) {
                let storedSettings = await GuildSettings.findOne({
                    guildID: args[0].guild.id,
                });

                if (!storedSettings) {
                    // If there are no settings stored for this guild, we create them and try to retrive them again.
                    const newSettings = new GuildSettings({
                        guildID: args[0].guild.id,
                    });

                    await newSettings.save().catch((e) => {
                        console.log(e);
                    });
                    storedSettings = await GuildSettings.findOne({
                        guildID: args[0].guild.id,
                    });
                }
                args = [storedSettings, ...args];
            }

            event.execute(...args);
        });
    }
});

//nodejs-events
process.on("unhandledRejection", console.log);
process.on("uncaughtException", console.log);
process.on("uncaughtExceptionMonitor", console.log);

client.login(token);
