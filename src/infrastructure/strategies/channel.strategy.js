class CarryWatchChannelStrategy {
  async execute() {
    const response = await fetch(process.env.CARRY_WATCH_FLOW_URL, {
      method: "GET",
    });

    return await response.json();
  }
}

class WebScrappingChannelStrategy {
  async execute() {
    const response = await fetch(process.env.WEB_SRAPPING_FLOW_URL, {
      method: "GET",
    });

    return await response.json();
  }
}

class AuctionWatchChannelStrategy {
  async execute() {
    const response = await fetch(process.env.AUCTION_WATCH_FLOW_URL, {
      method: "GET",
    });

    return await response.json();
  }
}

module.exports = {
  CarryWatchChannelStrategy,
  WebScrappingChannelStrategy,
  AuctionWatchChannelStrategy,
};
