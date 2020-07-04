require('dotenv').config();
const fs = require("fs");

const Discord = require("discord.js");

const prefix = process.env.DEFAULT_PREFIX

const client = new Discord.Client();
client.commands = new Discord.Collection();

const variables = require("./variables.yml");

//read commands folder and keep on JS files
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

//set command name for each command found
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Quand le bot démarre
client.on("ready", () => {
  console.log(`[${process.env.APPLICATION_NAME}] est prêt !`);
});

client.on("error", (error) => {
  console.error("Une erreur est survenue..\n", error);
});

//Nouveau joueur rejoint le Discord
/*client.on("guildMemberAdd", (member) => {
  console.log(`${member} vient de rejoindre la guilde ${member.guild}.`);
});*/

// Joueur envoie un message sur le serrveur, on vérifie s'il s'agit d'une commande
client.on("message", (message) => {
  //Si bot
  if (message.author.bot || !message.content.startsWith(prefix.toLowerCase())) {
    return;
  }

  //Recup nom de la commande à exécuter et parsing des potentiels paramètres
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  console.log(`${commandName} ${args}`);

  if (!client.commands.has(commandName)) {
    return;
  }

  const command = client.commands.get(commandName);

  // Vérification de l'envoi du message, et arrêt de la commande si c'est envoyé depuis un MP alors que
  // la commande est guild only
  if (command.guildOnly && !message.guild) {
    message.channel.send(
      "Cette commande n'est utilisable que sur un serveur !"
    );
    return;
  }

  try {
    command.execute(message, args);
    console.log(`${command.name} ${command.description}`);
  } catch (e) {
    console.error(e);
  }
});

client.login(process.env.CLIENT_TOKEN);