const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { RepeatMode } = require('discord-music-player');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export = {
    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Stop the music")

    , run: async (client, interaction, config, langUS) => {
        let guildQueue = client.player.getQueue(interaction.guild.id);
        guildQueue.stop();
        interaction.reply(langUS.stop(config))
    }
};