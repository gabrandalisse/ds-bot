class GeneralChannel {
  constructor() {
    this.commands = ["idea"];
    this.url = process.env.IDEA_ETL_FLOW_URL;
  }

  validateCommand(message) {
    return this.commands.some((cmd) => message.content.includes(cmd));
  }
}

module.exports = GeneralChannel;
