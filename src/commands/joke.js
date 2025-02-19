const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Get a random joke'),

    run: async (client, interaction) => {
        try {
            // Defer reply since we're making an API call
            await interaction.deferReply();

            // Fetch a random joke
            const response = await fetch('https://official-joke-api.appspot.com/random_joke');
            
            if (!response.ok) {
                throw new Error('Joke API response was not ok');
            }

            const joke = await response.json();

            // Create embed with the joke
            const jokeEmbed = new EmbedBuilder()
                .setColor('Green')
                .setTitle(joke.setup)
                .setDescription(`> ${joke.punchline}`)
                .setFooter({ text: 'Ranas Development' })
                .setTimestamp();

            // Send the joke
            await interaction.editReply({ embeds: [jokeEmbed] });

        } catch (error) {
            console.error('Joke command error:', error);
            
            // Handle failed API calls or other errors
            await interaction.editReply({
                content: '😢 Sorry, the joke service is currently unavailable. Try again later!',
                ephemeral: true
            });
        }
    }
};
