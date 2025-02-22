const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "rrvrole",
    description: "Reset the role that gets removed upon verification",
    
    run: async (client, message, args) => {
        // Check if user has admin permissions
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return message.reply('You need Administrator permissions to use this command!');
        }

        // Delete the remove role from database
        await db.delete(`removeRole_${message.guild.id}`);

        // Create success embed
        const embed = new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle('✅ Remove Role Reset')
            .setDescription('The role to remove upon verification has been reset. Use !setrrole to set a new one.')
            .setTimestamp();

        // Send confirmation
        await message.channel.send({ embeds: [embed] });
    }
}; 