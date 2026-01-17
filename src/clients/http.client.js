class HTTPClient {
  async get(url) {
    if (!url) throw new Error("URL is required in client");

    const response = await fetch(url, {
      method: "GET",
    });

    const result = await response.json();

    console.log("response from external service:", result);

    return result;
  }
}

module.exports = HTTPClient;
