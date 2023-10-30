const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const getRandomCat = require('random-cat-img');

export = {
  data: new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Get a random cat image."),
    run: async (client, interaction, config, langUS) => {
      (async () => {
      const data = await getRandomCat();

      const catEmbed = new EmbedBuilder()
	    .setColor(config.embedszin)
	    .setTitle(langUS.cat())
	    .setImage(data.message)
	    .setTimestamp()

      interaction.reply({ embeds: [catEmbed] })
    })();
    }
 };
