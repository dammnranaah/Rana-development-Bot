const { InteractionType } = require("discord.js");
const { readdirSync } = require("fs");
const config = require("../../config");
const commandFiles = readdirSync('./src/commands').filter(file => file.endsWith('.js'));

module.exports = {
    name: 'interactionCreate',
    execute: async (interaction) => {
        let client = interaction.client;
        
        if (interaction.isCommand() && interaction.type == InteractionType.ApplicationCommand && !interaction.user.bot && interaction.guild.id === config.guildId) {
            for (const file of commandFiles) {
                const command = require(`../../src/commands/${file}`);
                if (interaction.commandName.toLowerCase() === command.data?.name.toLowerCase()) {
                    try {
                        
                        if (typeof command.execute === 'function') {
                            await command.execute(interaction);
                        } else if (typeof command.run === 'function') {
                            await command.run(client, interaction);
                        } else {
                            console.error(`Command ${interaction.commandName} has no execute or run method`);
                            await interaction.reply({ 
                                content: 'This command is not properly configured!', 
                                ephemeral: true 
                            });
                        }
                    } catch (error) {
                        console.error(`Error executing command ${interaction.commandName}:`, error);
                        if (!interaction.replied && !interaction.deferred) {
                            await interaction.reply({ 
                                content: 'There was an error executing this command!', 
                                ephemeral: true 
                            });
                        }
                    }
                }
            }
        }
    }
}
