const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Make the bot say something')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to say')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to send the message in (optional)')
                .setRequired(false)),

    run: async (client, interaction) => {
        // Check if user is bot owner
        if (!config.owners.includes(interaction.user.id)) {
            return interaction.reply({
                content: 'Only the bot owner can use this command!',
                ephemeral: true
            });
        }

        const message = interaction.options.getString('message');
        const channel = interaction.options.getChannel('channel') || interaction.channel;

        try {
            // Send the message
            await channel.send({
                content: message,
                allowedMentions: { parse: [] } // Prevent the bot from pinging anyone
            });

            // Send confirmation
            await interaction.reply({
                content: `Message sent successfully in ${channel}!`,
                ephemeral: true
            });
        } catch (error) {
            console.error('Say command error:', error);
            await interaction.reply({
                content: 'There was an error trying to send the message!',
                ephemeral: true
            });
        }
    }
};
