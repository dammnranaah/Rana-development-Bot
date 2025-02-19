const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Unmute a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to unmute')
                .setRequired(true)),

    run: async (client, interaction) => {
        try {
            // Check if user has permission to manage messages
            if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
                return interaction.reply({
                    content: "You don't have permission to unmute members!",
                    ephemeral: true
                });
            }

            const targetUser = interaction.options.getUser('user');
            const member = await interaction.guild.members.fetch(targetUser.id).catch(() => null);

            if (!member) {
                return interaction.reply({
                    content: "That user is not in this server!",
                    ephemeral: true
                });
            }

            // Check for muted role
            const mutedRole = interaction.guild.roles.cache.find(role => role.name === config.roles?.muted);
            if (!mutedRole) {
                return interaction.reply({
                    content: "The muted role doesn't exist! Please set up the muted role first.",
                    ephemeral: true
                });
            }

            // Check if user is actually muted
            if (!member.roles.cache.has(mutedRole.id)) {
                return interaction.reply({
                    content: "This user is not muted!",
                    ephemeral: true
                });
            }

            try {
                // Remove muted role
                await member.roles.remove(mutedRole);

                // Try to unmute in voice channel if they're in one
                if (member.voice.channel) {
                    await member.voice.setMute(false).catch(() => null);
                }

                // Send success message
                await interaction.reply({
                    content: `✅ Successfully unmuted ${member.toString()}!`,
                    ephemeral: false
                });

                // Try to DM the user
                try {
                    await member.send(`You have been unmuted in ${interaction.guild.name}`);
                } catch (error) {
                    // If DM fails, add a note to the reply
                    await interaction.followUp({
                        content: "Note: Could not send DM to the user.",
                        ephemeral: true
                    });
                }

            } catch (error) {
                console.error('Unmute error:', error);
                
                if (error.code === 50013) {
                    return interaction.reply({
                        content: "I don't have permission to unmute this user! They might have a higher role than me.",
                        ephemeral: true
                    });
                }

                await interaction.reply({
                    content: 'There was an error trying to unmute this user!',
                    ephemeral: true
                });
            }

        } catch (error) {
            console.error('Unmute command error:', error);
            await interaction.reply({
                content: 'There was an error executing the unmute command!',
                ephemeral: true
            });
        }
    }
};