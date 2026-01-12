class BotService {
  async processMessage(message) {
    if (!message.content.includes("!execute"))
      throw new Error("message without valid command");

    let url;
    switch (message.channelId) {
      case process.env.CARRY_WATCH_CHANNEL_ID:
        url = process.env.CARRY_WATCH_FLOW_URL;
        break;

      case process.env.WEB_SRAPPING_CHANNEL_ID:
        url = process.env.WEB_SRAPPING_FLOW_URL;
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

    if (response.received) response = "message received successfully";
    else throw new Error("unexpected response received");
  }

  async makeHTTPRequest(url) {
    const response = await fetch(url, {
      method: "GET",
    });

    return await response.json();
  }
}

module.exports = BotService;
