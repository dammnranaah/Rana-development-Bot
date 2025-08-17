const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('iplookup')
        .setDescription('Look up information about an IP address')
        .addStringOption(option =>
            option.setName('ip')
                .setDescription('The IP address to look up')
                .setRequired(true)),

    run: async (client, interaction) => {
        await interaction.deferReply();
        const ip = interaction.options.getString('ip');

        try {
            if (!(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip))) {
                return await interaction.editReply('Please provide a valid IP address.');
            }

            const response = await fetch(`https:
            const {
                city,
                country_name,
                region_name,
                time_zone,
            } = await response.json();

            const helpEmbed = new EmbedBuilder()
                .setColor('Green')
                .setTitle('IP Lookup Service')
                .setDescription(`Public information about ${ip}`)
                .addFields(
                    { name: 'Country', value: country_name || 'N/A' },
                    { name: 'City', value: city || 'N/A' },
                    { name: 'Region Name', value: region_name || 'N/A' },
                    { name: 'Time Zone', value: time_zone || 'N/A' }
                )
                .setFooter({ text: 'Ranas Development' });

            await interaction.editReply({ embeds: [helpEmbed] });
        } catch (e) {
            console.error(e);
            await interaction.editReply('IP Lookup Service is currently unavailable.');
        }
    }
};
