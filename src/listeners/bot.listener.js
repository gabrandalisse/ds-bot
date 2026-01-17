const BotService = require("../services/bot.service");

const registerListeners = (client) => {
  const bot = new BotService();

  client.once("ready", () => {
    console.log(`✅ bot connected and ready as: ${client.user.tag}`);
  });

  client.on("messageCreate", async (message) => {
    console.log(
      `message received: "${message.content}" from channel ${message.channelId} by user ${message.author}`
    );

    if (message.author.bot || !message.content.startsWith("!")) return;

    let response;
    try {
      response = await bot.processMessage(message);
    } catch (error) {
      const wording = "Error in message listener: " + error.message;

      console.error(wording);
      response = wording;
    } finally {
      await message.reply(response);
    }
  });
};

module.exports = registerListeners;
