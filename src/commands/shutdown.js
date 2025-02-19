const { SlashCommandBuilder } = require('discord.js');
const config = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shutdown')
        .setDescription('Safely shuts down the bot (Owner only)'),

    run: async (client, interaction) => {
        // Check if user is bot owner
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

            // Log shutdown event
            console.log(`Bot shutdown initiated by ${interaction.user.tag} (${interaction.user.id})`);

            // Wait a moment for the reply to be sent
            setTimeout(() => {
                // Destroy the client connection
                client.destroy();
                
                // Exit process
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
