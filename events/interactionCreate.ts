const { InteractionType } = require("discord.js");
var config = require("../config.json");
var lang = require("../langs/hu_HU"); // TODO language getting logic

export = {
  name: "interactionCreate",
  execute: async (interaction) => {
    let client = interaction.client;
    if (interaction.type == InteractionType.ApplicationCommand) {
      if (interaction.user.bot) return;
      try {
        const command = client.slashcommands.get(interaction.commandName);
        command.run({client, interaction, config, lang});
      } catch {
        interaction.reply({
          content:
            "An error occurred while trying to run the command! Please try again.",
          ephemeral: true,
        });
      }
    }
  },
};
