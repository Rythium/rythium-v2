/* const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

export = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a member from the server")
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('The member to kick')
				.setRequired(true))
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('The reason for kicking'))

  , run: async (client, interaction, config, langUS) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.reply(langUS.kickPermErr(config))
    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.reply(langUS.kickPermErr2(config))
    const usr = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') ?? 'No reason provided';
    //if (interaction.member.id === interaction.guild.ownerId) return interaction.reply(langUS.kickPermHigher(config))
    let authorRole = interaction.member.roles.highest;
    if (usr.roles.highest.position > authorRole.position) {
      interaction.reply(`The mentioned user has a higher role than you.`);
      return;
  } else if (usr.roles.highest.position < authorRole.position) {
      interaction.reply(`You have a higher role than the mentioned user.`);
      return;
  } else {
      interaction.reply(`You and the mentioned user have the same role.`);
      return;
  }
    if (usr.id === interaction.member.id) return interaction.reply(langUS.kickSame(config))
  }
};
 */