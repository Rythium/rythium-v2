const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

export = {
  data: new SlashCommandBuilder()
    .setName("flip")
    .setDescription("Flip a coin."),
    run: async (client, interaction, config, langUS) => {
      var coins = ['Head', 'Tail'];
      var coin = coins[Math.floor(Math.random()*coins.length)];
      interaction.reply(langUS.flip(coin))
    }
 };
