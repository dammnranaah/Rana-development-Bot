const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "rvchannel",
    description: "Reset the verification channel",
    
    run: async (client, message, args) => {
        // Check if user has admin permissions
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return message.reply('You need Administrator permissions to use this command!');
        }

        // Delete the verification channel from database
        await db.delete(`verifyChannel_${message.guild.id}`);

        // Create success embed
        const embed = new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle('✅ Verification Channel Reset')
            .setDescription('The verification channel has been reset. Use !setverify in a channel to set it as the new verification channel.')
            .setTimestamp();

        // Send confirmation
        await message.channel.send({ embeds: [embed] });
    }
}; 