const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Play Rock, Paper, Scissors with the bot'),

    run: async (client, interaction) => {
        const options = [
            "rock 🐚",
            "paper 📰",
            "scissors ✂️"
        ];
        const option = options[Math.floor(Math.random() * options.length)];
        await interaction.reply(`You got ${option}`);
    }
};
