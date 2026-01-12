const BotService = require("../services/bot.service");

const registerListeners = (client) => {
  const bot = new BotService();

  client.once("ready", () => {
    console.log(`✅ bot connected and ready as: ${client.user.tag}`);
  });

  client.on("messageCreate", async (message) => {
    console.log(
      `message received: "${message.content}" from channel ${message.channelId}`
    );

    if (message.author.bot) return;

    try {
      const response = await bot.processMessage(message);
      await message.reply(response);
    } catch (error) {
      console.error("error in message listener:", error.message);
    }
  });
};

module.exports = registerListeners;
