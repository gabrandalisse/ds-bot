class GeneralChannel {
  constructor() {
    this.commands = ["idea"];
    this.url = process.env.IDEA_ETL_FLOW_URL;
  }

  validateCommand(message) {
    return this.commands.some((cmd) => message.content.includes(cmd));
  }

  requestParams(message) {
    const prompt = message.content.replace("!idea", "").trim();

    return {
      method: "POST",
      data: {
        prompt,
      },
      url: this.url,
    };
  }
}

module.exports = GeneralChannel;
