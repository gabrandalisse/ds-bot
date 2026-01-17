class AuctionWatchChannel {
  constructor() {
    this.commands = ["execute"];
    this.url = process.env.AUCTION_WATCH_FLOW_URL;
  }

  validateCommand(message) {
    return this.commands.some((cmd) => message.content.includes(cmd));
  }
}

module.exports = AuctionWatchChannel;
