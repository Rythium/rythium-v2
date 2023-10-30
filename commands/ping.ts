const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

export = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Get the bot respond time"),
    run: async ({client, interaction, config, lang, storedSettings}) => {
      interaction.reply(lang.ping(client))
    }
 };
