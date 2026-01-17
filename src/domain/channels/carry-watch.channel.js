class CarryWatchChannel {
  constructor() {
    this.commands = ["execute"];
    this.url = process.env.CARRY_WATCH_FLOW_URL;
  }

  validateCommand(message) {
    return this.commands.some((cmd) => message.content.includes(cmd));
  }
}

module.exports = CarryWatchChannel;
