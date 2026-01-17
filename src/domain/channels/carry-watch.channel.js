class CarryWatchChannel {
  constructor() {
    this.commands = ["execute"];
    this.url = process.env.CARRY_WATCH_FLOW_URL;
  }

  validateCommand(message) {
    return this.commands.some((cmd) => message.content.includes(cmd));
  }

  requestParams(message) {
    return {
      url: this.url,
    };
  }
}

module.exports = CarryWatchChannel;
