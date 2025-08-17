const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "rvrole",
    description: "Reset the verification role",
    
    run: async (client, message, args) => {
        
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return message.reply('You need Administrator permissions to use this command!');
        }

        
        await db.delete(`giveRole_${message.guild.id}`);

        
        const embed = new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle('✅ Verification Role Reset')
            .setDescription('The verification role has been reset. Use !setrole to set a new one.')
            .setTimestamp();

        
        await message.channel.send({ embeds: [embed] });
    }
}; 
