const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
var giveMeAJoke = require('give-me-a-joke');

export = {
  data: new SlashCommandBuilder()
    .setName("dadjoke")
    .setDescription("Get a random Dad joke."),
    run: async (client, interaction, config, langUS) => {
      giveMeAJoke.getRandomDadJoke (function(joke) {
      interaction.reply(`:rofl: **|** ${joke}`)
    });

    }
 };
