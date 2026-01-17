class WebScrapingChannel {
  constructor() {
    this.commands = ["execute"];
    this.url = process.env.WEB_SCRAPING_FLOW_URL;
  }

  validateCommand(message) {
    return this.commands.some((cmd) => message.content.includes(cmd));
  }
}

module.exports = WebScrapingChannel;
