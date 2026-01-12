class BotService {
  async processMessage(message) {
    this.validateIncomingMessage(message);

    let url;
    switch (message.channelId) {
      case process.env.CARRY_WATCH_CHANNEL_ID:
        url = process.env.CARRY_WATCH_FLOW_URL;
        break;

      case process.env.WEB_SRAPING_CHANNEL_ID:
        url = process.env.WEB_SRAPING_FLOW_URL;
        break;

      case process.env.NSFW_WEB_SRAPING_CHANNEL_ID:
        url = process.env.NSFW_WEB_SRAPING_FLOW_URL;
        break;

      case process.env.AUCTION_WATCH_CHANNEL_ID:
        url = process.env.AUCTION_WATCH_FLOW_URL;
        break;

      default:
        throw new Error("invalid channel id");
    }

    if (!url) throw new Error("url not found");
    const response = await this.makeHTTPRequest(url);

    console.log("response from external service:", response);

    if (response.received) response = "message received successfully, executing automated flow!";
    else throw new Error("unexpected response received");
  }

  validateIncomingMessage(msg) {
    if (msg.author.bot || !msg.content.startsWith('!')) return;
  }

  async makeHTTPRequest(url) {
    const response = await fetch(url, {
      method: "GET",
    });

    return await response.json();
  }
}

module.exports = BotService;
