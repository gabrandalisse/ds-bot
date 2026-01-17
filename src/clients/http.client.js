class HTTPClient {
  async makeRequest({ url, method = "GET", data = null }) {
    if (!url) throw new Error("URL is required in client");

    const response = await fetch(url, {
      method,
      body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log("response from external service:", result);

    return result;
  }
}

module.exports = HTTPClient;
