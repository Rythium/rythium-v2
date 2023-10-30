const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { RepeatMode } = require('discord-music-player');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a music")
    .addStringOption(option =>
      option.setName('name')
        .setDescription('Name or URL')
        .setRequired(true))
        .addIntegerOption(option =>
          option.setName('volume')
              .setDescription('Volume percentage')
              .setMinValue(1)
              .setMaxValue(1000)
              .setRequired(false))

    , run: async (client, interaction, config, langUS) => {

      let queue = client.player.createQueue(interaction.guild.id);
      await queue.join(interaction.member.voice.channel);
      let guildQueue = client.player.getQueue(interaction.guild.id);
      guildQueue.setVolume(100);
      let music = interaction.options.getString('name')
      const volume = interaction.options.getInteger('volume') ?? '100';
      interaction.reply(langUS.playStart(config, music))
      let song = await queue.play(music).catch(err => {
          console.log(err);
          interaction.reply(langUS.playErr(config))
          if(!guildQueue)
              queue.stop();
      });
      await sleep(500)
      await interaction.editReply(langUS.play(config, music, volume))
      guildQueue.setVolume(volume);
    }
 };
