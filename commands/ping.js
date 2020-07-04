
module.exports = {
  name: "ping",
  description: "Renvoit Pong !",
  guildOnly: true,
  execute(message, args) {
    message.reply("Pong !");
  },
};
