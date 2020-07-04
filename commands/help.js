const prefix = process.env.DEFAULT_PREFIX

module.exports = {
  name: "help",
  description:
    "Get help for one command in perticular or get list of all commands.",
  execute(message, args) {
    const reponse = [];
    const { commands } = message.client;

    if (!args.length) {
      reponse.push("Voici la liste de mes commandes :");
      reponse.push(commands.map((command) => command.name).join(", "));
      reponse.push(
        `\nVous pouvez aussi en savoir plus sur une commande en utilisant ${prefix}help <commande>`
      );

      return message.author
        .send(reponse, { split: true })
        .then(() => {
          if (message.guild) {
            message.channel.send(
              `Hey ${message.author} !\nJe t'ai envoyé un MP contenant mes commandes !`
            );
            
            
          }
        })
        .catch((error) => {
          console.error(
            `Impossible d'envoyer un MP à ${message.author.tag}.\n`,
            error
          );
          message.reply(
            "Je n'ai pas réussi à t'envoyer ma liste de commandes, as-tu bien authorisé les MP provennnant de ce serveur ?"
          );
        });
    }
    const commandName = args[0].toLowerCase();
    const command =
      commands.get(commandName) ||
      commands.find((c) => c.aliases && c.aliases.includes(commandName));

    if (!command) return message.reply("Cette commande n'existe pas !");

    reponse.push(`**Nom:** ${command.name}`);
    if (command.description)
      reponse.push(`**Description**: ${command.description}`);

    if (command.usage)
      data.push(`**Utilisation:** ${prefix}${command.name} ${command.usage}`);

    if (command.aliases) data.push(`**Alias:** ${command.aliases.join(", ")}`);

    message.channel.send(reponse, { split: true });
  },
};
