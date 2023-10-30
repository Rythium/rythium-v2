const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

export = {
  data: new SlashCommandBuilder()
    .setName("rps")
    .setDescription("Play Rock Paper Scissors with the bot")
    .addStringOption(option =>
          option.setName('choise')
            .setDescription('Your choise')
            .setRequired(true)
            .addChoices(
              { name: 'Rock', value: 'Rock' },
              { name: 'Paper', value: 'Paper' },
              { name: 'Scissors', value: 'Scissors' },
            )),
    run: async (client, interaction, config, langUS) => {
      let pchoise = interaction.options.getString('choise')
      var bchoises = ['Rock', 'Paper', 'Scissors'];
      var bchoise = bchoises[Math.floor(Math.random()*bchoises.length)];
      console.log(pchoise, bchoise)
      if(pchoise === bchoise) return interaction.reply(`👤 **|** Your choise: **${pchoise}**\n🤖 **|** My choise: **${bchoise}**\n❓ **|** It's a tie!`)
      if(pchoise === `Rock` && bchoise === `Paper`) return interaction.reply(`👤 **|** Your choise: **${pchoise}**\n🤖 **|** My choise: **${bchoise}**\n❓ **|** You lost!`)
      if(pchoise === `Rock` && bchoise === `Scissors`) return interaction.reply(`👤 **|** Your choise: **${pchoise}**\n🤖 **|** My choise: **${bchoise}**\n❓ **|** You won!`)
      if(pchoise === `Paper` && bchoise === `Rock`) return interaction.reply(`👤 **|** Your choise: **${pchoise}**\n🤖 **|** My choise: **${bchoise}**\n❓ **|** You won!`)
      if(pchoise === `Paper` && bchoise === `Scissors`) return interaction.reply(`👤 **|** Your choise: **${pchoise}**\n🤖 **|** My choise: **${bchoise}**\n❓ **|** You lost!`)
      if(pchoise === `Scissors` && bchoise === `Paper`) return interaction.reply(`👤 **|** Your choise: **${pchoise}**\n🤖 **|** My choise: **${bchoise}**\n❓ **|** You won!`)
      if(pchoise === `Scissors` && bchoise === `Rock`) return interaction.reply(`👤 **|** Your choise: **${pchoise}**\n🤖 **|** My choise: **${bchoise}**\n❓ **|** You lost!`)
    }
 };
