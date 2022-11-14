const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { sqarlex } = require("../config.json");

module.exports = async (client) => {
  const rest = new REST({ version: "10" }).setToken(sqarlex);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: client.commands,
    });
  } catch (error) {
    console.error(error);
  }
    console.log(`[sqarlex - BOT] ${client.user.tag} Aktif!`);
};
