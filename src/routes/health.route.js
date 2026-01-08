const express = require("express");
const client = require('../clients/ds.client');

const router = express.Router();

router.get("/", (req, res) => {
  const isDiscordReady = client.isReady();
  const discordPing = client.ws.ping;

  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
    services: {
      discord: {
        status: isDiscordReady ? "CONNECTED" : "DISCONNECTED",
        ping: discordPing,
      },
    },
  };

  if (!isDiscordReady) {
    healthcheck.message = "Service Unavailable";
    return res.status(503).json(healthcheck);
  }

  res.status(200).json(healthcheck);
});

module.exports = router;
