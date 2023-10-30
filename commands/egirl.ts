const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

export = {
  data: new SlashCommandBuilder()
    .setName("egirl")
    .setDescription("Get egirl image."),
    run: async (client, interaction, config, langUS) => {

      const eEmbed = new EmbedBuilder()
	      .setColor(config.embedszin)
	      .setTitle(`Cute, isn't it?`)
	      .setImage('https://massive.boats/K9XLKX')
	      .setTimestamp()

      interaction.reply({ embeds: [eEmbed] })
    }
 };
