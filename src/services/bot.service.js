class BotService {
  async processMessage(message) {
    // message.content.toLowerCase() === "!hola"
    const response = await fetch(process.env.SERVICE_URL, {
      method: "GET",
    });

    const data = await response.json();
    console.log("Response from external service:", data);
    return "Message processed successfully!!!";
  }
}

module.exports = BotService;
