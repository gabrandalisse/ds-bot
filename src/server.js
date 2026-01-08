require("dotenv").config();

const express = require("express");
const client = require("./clients/ds.client");

const registerListeners = require("./listeners/bot.listener");
const healthRoute = require("./routes/health.route");

registerListeners(client);

const app = express();
const port = process.env.PORT || 3000;

app.use("/", healthRoute);

app.listen(port, () => {
  console.log(`✅ express server running in port: ${port}`);
});
