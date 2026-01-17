const HTTPClient = require("../clients/http.client");
const AuctionWatchChannel = require("../domain/channels/auction-watch.channel");
const CarryWatchChannel = require("../domain/channels/carry-watch.channel");
const GeneralChannel = require("../domain/channels/general.channel");
const NSFWWebScrapingChannel = require("../domain/channels/nsfw-web-sraping.channel");
const WebScrapingChannel = require("../domain/channels/web-scraping.channel");

class BotService {
  constructor() {
    this.http = new HTTPClient();
    this.channels = new Map([
      [process.env.CARRY_WATCH_CHANNEL_ID, new CarryWatchChannel()],
      [process.env.WEB_SCRAPING_CHANNEL_ID, new WebScrapingChannel()],
      [process.env.NSFW_WEB_SCRAPING_CHANNEL_ID, new NSFWWebScrapingChannel()],
      [process.env.AUCTION_WATCH_CHANNEL_ID, new AuctionWatchChannel()],
      [process.env.GENERAL_CHANNEL_ID, new GeneralChannel()],
    ]);
  }

  async processMessage(message) {
    const channel = this.channels.get(message.channelId);
    if (!channel) throw new Error("channel not found");

    if (!channel.validateCommand(message)) throw new Error("invalid command");

    const response = await this.http.makeRequest(
      channel.requestParams(message),
    );

    if (response.received)
      return "Message received successfully, executing automated flow!";
    else throw new Error("unexpected response received");
  }
}

module.exports = BotService;
