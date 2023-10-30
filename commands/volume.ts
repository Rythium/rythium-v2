const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { RepeatMode } = require('discord-music-player');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export = {
    data: new SlashCommandBuilder()
        .setName("volume")
        .setDescription("Set volume")
        .addIntegerOption(option =>
            option.setName('volume')
                .setDescription('Volume percentage')
                .setMinValue(1)
                .setMaxValue(1000)
                .setRequired(true))
    , run: async (client, interaction, config, langUS) => {
        let guildQueue = client.player.getQueue(interaction.guild.id);
        let volume = interaction.options.getInteger('volume')
            let song = await guildQueue.setVolume(volume);
            interaction.reply(langUS.volume(config, volume))
    }
};
