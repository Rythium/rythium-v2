const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

export = {
  data: new SlashCommandBuilder()
    .setName("nickname")
    .setDescription("Changes your nickname")

    .addStringOption(option =>
      option.setName('name')
        .setDescription('Your new nickname')
        .setRequired(true))

  , run: async (client, interaction, config, langUS) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ChangeNickname)) return interaction.reply(langUS.nickPermErr(config))
    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ChangeNickname)) return interaction.reply(langUS.nickPermErr2(config))

    if (interaction.member.id === interaction.guild.ownerId) return interaction.reply(langUS.nickPermHigher(config))

    let nick = interaction.options.getString('name')
    interaction.member.setNickname(nick)

    interaction.reply(`${config.tick} **|** Nickname successfully set!`)
  }
};
