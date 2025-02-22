const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Delete a specified number of messages')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Number of messages to delete (max 100)')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100)),

    run: async (client, interaction) => {
        // Check if user has permission to manage messages
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return interaction.reply({
                content: "You don't have permission to manage messages!",
                ephemeral: true
            });
        }

        const amount = interaction.options.getInteger('amount');

        try {
            // Fetch and delete messages
            const messages = await interaction.channel.messages.fetch({ limit: amount });
            const deletedMessages = await interaction.channel.bulkDelete(messages, true);

            // Reply with success message
            await interaction.reply({
                content: `Successfully deleted ${deletedMessages.size} messages!`,
                ephemeral: true
            });

            // Delete the success message after 5 seconds
            setTimeout(async () => {
                try {
                    await interaction.deleteReply();
                } catch (error) {
                    console.error('Error deleting reply:', error);
                }
            }, 5000);

        } catch (error) {
            console.error('Purge error:', error);
            
            // Handle common errors
            if (error.code === 50034) {
                return interaction.reply({
                    content: 'Cannot delete messages older than 14 days!',
                    ephemeral: true
                });
            }

            return interaction.reply({
                content: 'There was an error trying to delete messages!',
                ephemeral: true
            });
        }
    }
};
