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

    let response;
    try {
      result = await bot.processMessage(message);
      if (result.received) response = "message processed successfully.";
    } catch (error) {
      const wording = "error in message listener: " + error.message;

      console.error(wording);
      response = wording;
    } finally {
      await message.reply(response);
    }
  });
};

module.exports = registerListeners;
