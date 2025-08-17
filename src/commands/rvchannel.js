const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "rvchannel",
  aliases: ["rvc"],
  category: ":frame_photo: WELCOME",

  run: (client, message, args) => {
   if (!message.member.hasPermission("ADMINISTRATION")) {
      return message.channel.send("You do not enough permission to use this command.");
    }
 
  db.delete(`verify_${message.guild.id}`);



    
    message.channel.send(`Removed verification Channel.`)
  }
}
