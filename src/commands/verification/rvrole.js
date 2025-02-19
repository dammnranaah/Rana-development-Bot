const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "rvrole",
    description: "Reset the verification role",
    
    run: async (client, message, args) => {
        // Check if user has admin permissions
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return message.reply('You need Administrator permissions to use this command!');
        }

        // Delete the verification role from database
        await db.delete(`giveRole_${message.guild.id}`);

        // Create success embed
        const embed = new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle('✅ Verification Role Reset')
            .setDescription('The verification role has been reset. Use !setrole to set a new one.')
            .setTimestamp();

        // Send confirmation
        await message.channel.send({ embeds: [embed] });
    }
}; 