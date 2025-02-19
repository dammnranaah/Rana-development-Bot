const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('Set the slowmode for the current channel')
        .addIntegerOption(option =>
            option.setName('seconds')
                .setDescription('Slowmode duration in seconds (0 to disable)')
                .setRequired(true)
                .setMinValue(0)
                .setMaxValue(21600)), // Discord's max slowmode is 6 hours (21600 seconds)

    run: async (client, interaction) => {
        // Check if user has permission to manage messages
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return interaction.reply({
                content: "You don't have permission to manage messages!",
                ephemeral: true
            });
        }

        const seconds = interaction.options.getInteger('seconds');

        try {
            await interaction.channel.setRateLimitPerUser(seconds);
            
            // Create appropriate response message
            const response = seconds === 0
                ? '✅ Slowmode has been disabled!'
                : `✅ Slowmode has been set to ${seconds} second${seconds === 1 ? '' : 's'}!`;
            
            await interaction.reply({
                content: response,
                ephemeral: false // Make visible to everyone so they know slowmode has changed
            });
        } catch (error) {
            console.error('Slowmode error:', error);
            await interaction.reply({
                content: 'There was an error trying to set the slowmode!',
                ephemeral: true
            });
        }
    }
};
