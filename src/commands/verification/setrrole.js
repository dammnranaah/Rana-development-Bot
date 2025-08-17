const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "setrrole",
    description: "Set the role to remove upon verification",
    
    run: async (client, message, args) => {
        
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return message.reply('You need Administrator permissions to use this command!');
        }

        
        const role = message.mentions.roles.first();
        if (!role) {
            return message.reply('Please mention a role to remove upon verification!');
        }

        
        if (!role.editable) {
            return message.reply('I cannot manage that role! Please choose a role below my highest role.');
        }

        
        await db.set(`removeRole_${message.guild.id}`, role.id);

        
        const embed = new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle('✅ Remove Role Set')
            .setDescription(`The role ${role.toString()} will now be removed from members upon verification.`)
            .setTimestamp();

        
        await message.channel.send({ embeds: [embed] });
    }
}; 
