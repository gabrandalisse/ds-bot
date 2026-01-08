require("dotenv").config();
const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

// --- 1. CONFIGURACIÓN DE EXPRESS ---
const app = express();
const port = process.env.PORT || 3000;

// Definimos los permisos (Intents) necesarios
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // Vital para leer el contenido del mensaje (!hola)
  ],
});

app.get("/", (req, res) => {
  res.send("El bot de Discord está activo y escuchando 🤖");
});

app.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto ${port}`);
});

// --- 2. CONFIGURACIÓN DEL BOT DE DISCORD ---

// Evento: Cuando el bot está listo
client.once("ready", () => {
  console.log(`Bot conectado como: ${client.user.tag}`);
});

// Evento: Cuando llega un mensaje
client.on("messageCreate", async (message) => {
  console.log(
    `Mensaje recibido: "${message.content}" en el canal ${message.channelId}`
  );

  // 1. Evitar que el bot se responda a sí mismo
  if (message.author.bot) return;

  // 2. Verificar que el mensaje sea en el canal específico
  if (message.channelId !== process.env.CHANNEL_ID) return;

  // 3. Verificar el contenido del comando
  if (message.content.toLowerCase() === "!hola") {
    try {
      await message.reply("¡Hola! Soy tu bot de Express y Discord 👋");
    } catch (error) {
      console.error("Error al responder:", error);
    }
  }
});

// Iniciar sesión
client.login(process.env.DISCORD_TOKEN);
