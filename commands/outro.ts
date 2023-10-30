const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { RepeatMode } = require('discord-music-player');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export = {
  data: new SlashCommandBuilder()
    .setName("outro")
    .setDescription("Get outro"),
  run: async (client, interaction, config, langUS) => {

    let queue = client.player.createQueue(interaction.guild.id);
    await queue.join(interaction.member.voice.channel);
    let guildQueue = client.player.getQueue(interaction.guild.id);
    guildQueue.setVolume(200);
    interaction.reply(langUS.outroStart(config))
    let song = await queue.play("Monte TheFatRat - Xenogenesis (Outro Song)").catch(err => {
      interaction.reply(langUS.outroErr(config))
      console.log(err);
      if (!guildQueue)
        queue.stop();
    });
    await interaction.editReply(langUS.outro(config))

    await sleep(16500)
    interaction.member.voice.disconnect();

  }
};
