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
                .setMaxValue(21600)), 

    run: async (client, interaction) => {
        
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return interaction.reply({
                content: "You don't have permission to manage messages!",
                ephemeral: true
            });
        }

        const seconds = interaction.options.getInteger('seconds');

        try {
            await interaction.channel.setRateLimitPerUser(seconds);
            
            
            const response = seconds === 0
                ? '✅ Slowmode has been disabled!'
                : `✅ Slowmode has been set to ${seconds} second${seconds === 1 ? '' : 's'}!`;
            
            await interaction.reply({
                content: response,
                ephemeral: false 
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
