const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "rrvrole",
  aliases: ["rrvr"],

  run: (client, message, args) => {
   if (!message.member.hasPermission("ADMINISTRATION")) {
      return message.channel.send("You do not enough permission to use this command.");
    }
 
  db.delete(`srrole_${message.guild.id}`);
  

    
    message.channel.send(`Removed role that is verification role`)
  }
}
