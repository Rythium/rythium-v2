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
const client = new Client({
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
const config = require("./config.json");
const { readdirSync } = require("fs");
const moment = require("moment");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
var path = require("path");

import { initDash } from "./dashboard/dashboard";

var fs = require("fs");
var path = require("path");
//var antiCrash = require("discord-anticrash");
//const discordTranscripts = require('discord-html-transcripts');

const mongoose = require("mongoose");
const GuildSettings = require("./models/settings");

require("dotenv").config();

var token = process.env.DISCORD_TOKEN;

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

const log = (x) => {
  console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${x}`);
};

//slash-command-handler
const slashcommands = [];
readdirSync("./commands").forEach(async (file) => {
  if (path.extname(file) != ".js") return;

  console.log(file)
  const command = require(`./commands/${file}`);
  slashcommands.push(command.data.toJSON());
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
  log(`${client.user.username} started!`);
});

//event-handler
readdirSync("./events").forEach(async (file) => {
  if (path.extname(file) != ".js") return;

  const event = await require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
});

//nodejs-events
process.on("unhandledRejection",       console.log);
process.on("uncaughtException",        console.log);
process.on("uncaughtExceptionMonitor", console.log);

client.login(token);
