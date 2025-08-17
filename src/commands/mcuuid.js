const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mcuuid')
        .setDescription('Get Minecraft UUID for a username')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('The Minecraft username to look up')
                .setRequired(true)),

    run: async (client, interaction) => {
        await interaction.deferReply();
        const username = interaction.options.getString('username');

        try {
            const response = await fetch(`https:
            
            if (!response.ok) {
                return interaction.editReply({
                    content: 'Could not find a Minecraft account with that username!',
                    ephemeral: true
                });
            }

            const { name, id } = await response.json();

            const embed = new EmbedBuilder()
                .setColor('Green')
                .setTitle('Minecraft UUID Lookup')
                .setDescription('Data returned from Mojang API')
                .addFields(
                    { name: 'Username', value: name, inline: true },
                    { name: 'UUID', value: id, inline: true }
                )
                .setTimestamp()
                .setFooter({ text: 'Minecraft UUID Lookup Service' });

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error('MCUUID error:', error);
            await interaction.editReply({
                content: 'There was an error fetching the UUID. Please try again later.',
                ephemeral: true
            });
        }
    }
};
