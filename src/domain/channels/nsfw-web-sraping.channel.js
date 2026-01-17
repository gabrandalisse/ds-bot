class NSFWWebScrapingChannel {
  constructor() {
    this.commands = ["execute"];
    this.url = process.env.NSFW_WEB_SCRAPING_FLOW_URL;
  }

  validateCommand(message) {
    return this.commands.some((cmd) => message.content.includes(cmd));
  }
}

module.exports = NSFWWebScrapingChannel;
