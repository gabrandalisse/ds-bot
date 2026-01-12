const {
  CarryWatchChannelStrategy,
  WebScrappingChannelStrategy,
  AuctionWatchChannelStrategy,
} = require("../infrastructure/strategies/channel.strategy");

class BotService {
  strategy = null;

  async processMessage(message) {
    if (message.content.contains("!execute"))
      throw new Error("message without valid command");

    switch (message.channelId) {
      case process.env.CARRY_WATCH_CHANNEL_ID:
        this.strategy = new CarryWatchChannelStrategy();
        break;

      case process.env.WEB_SRAPPING_CHANNEL_ID:
        this.strategy = new WebScrappingChannelStrategy();
        break;

      case process.env.AUCTION_WATCH_CHANNEL_ID:
        this.strategy = new AuctionWatchChannelStrategy();
        break;

      default:
        throw new Error("invalid channel id");
    }

    if (!this.strategy)
      throw new Error("strategy not found");

   
    const response = await this.strategy.execute();

    console.log("response from external service:", response);
    
    return response;
  }
}

module.exports = BotService;
