const { SlashCommandBuilder, PermissionFlagsBits, ActivityType } = require('discord.js');
const config = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setstatus')
        .setDescription('Set the bot\'s status and activity')
        .addStringOption(option =>
            option.setName('status')
                .setDescription('The status to set')
                .setRequired(true)
                .addChoices(
                    { name: 'Online', value: 'online' },
                    { name: 'Idle', value: 'idle' },
                    { name: 'Do Not Disturb', value: 'dnd' },
                    { name: 'Invisible', value: 'invisible' }
                ))
        .addStringOption(option =>
            option.setName('activity_type')
                .setDescription('The type of activity')
                .setRequired(true)
                .addChoices(
                    { name: 'Playing', value: '0' },
                    { name: 'Streaming', value: '1' },
                    { name: 'Listening', value: '2' },
                    { name: 'Watching', value: '3' },
                    { name: 'Competing', value: '5' }
                ))
        .addStringOption(option =>
            option.setName('activity_text')
                .setDescription('The activity text to display')
                .setRequired(true)),

    run: async (client, interaction) => {
        
        if (!config.owners.includes(interaction.user.id)) {
            return await interaction.reply({ 
                content: 'Only the bot owner can use this command!', 
                ephemeral: true 
            });
        }

        const status = interaction.options.getString('status');
        const activityType = parseInt(interaction.options.getString('activity_type'));
        const activityText = interaction.options.getString('activity_text');
        
        try {
            await client.user.setPresence({
                activities: [{
                    name: activityText,
                    type: activityType
                }],
                status: status
            });

            const activityNames = ['Playing', 'Streaming', 'Listening', 'Watching', '', 'Competing'];
            await interaction.reply({ 
                content: `✅ Status updated successfully!\n• Status: ${status}\n• Activity: ${activityNames[activityType]} ${activityText}`, 
                ephemeral: true 
            });
        } catch (error) {
            console.error('Status update error:', error);
            await interaction.reply({ 
                content: '❌ Failed to update status. Please try again later.', 
                ephemeral: true 
            });
        }
    }
};
