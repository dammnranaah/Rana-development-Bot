const { SlashCommandBuilder } = require('discord.js');
const config = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shutdown')
        .setDescription('Safely shuts down the bot (Owner only)'),

    run: async (client, interaction) => {
        
        if (!config.owners.includes(interaction.user.id)) {
            return interaction.reply({
                content: 'Only the bot owner can use this command!',
                ephemeral: true
            });
        }

        try {
            await interaction.reply({
                content: '🔄 Shutting down bot...',
                ephemeral: true
            });

            
            console.log(`Bot shutdown initiated by ${interaction.user.tag} (${interaction.user.id})`);

            
            setTimeout(() => {
                
                client.destroy();
                
                
                process.exit(0);
            }, 1000);

        } catch (error) {
            console.error('Shutdown error:', error);
            await interaction.reply({
                content: 'There was an error trying to shut down the bot!',
                ephemeral: true
            });
        }
    }
};
