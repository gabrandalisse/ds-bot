class HTTPClient {
  async makeRequest({ url, method = "GET", data = null }) {
    if (!url) throw new Error("URL is required in client");

    const options = {
      method,
    };

    if (data) {
      options.body = JSON.stringify(data);
      options.headers = { "Content-Type": "application/json" };
    }

    const response = await fetch(url, options);

    const result = await response.json();

    console.log("response from external service:", result);

    return result;
  }
}

module.exports = HTTPClient;
