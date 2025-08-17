const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Get a random joke'),

    run: async (client, interaction) => {
        try {
            
            await interaction.deferReply();

            
            const response = await fetch('https:
            
            if (!response.ok) {
                throw new Error('Joke API response was not ok');
            }

            const joke = await response.json();

            
            const jokeEmbed = new EmbedBuilder()
                .setColor('Green')
                .setTitle(joke.setup)
                .setDescription(`> ${joke.punchline}`)
                .setFooter({ text: 'Ranas Development' })
                .setTimestamp();

            
            await interaction.editReply({ embeds: [jokeEmbed] });

        } catch (error) {
            console.error('Joke command error:', error);
            
            
            await interaction.editReply({
                content: '😢 Sorry, the joke service is currently unavailable. Try again later!',
                ephemeral: true
            });
        }
    }
};
