const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const config = require('../../config.js');
const db = require('quick.db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unwarn')
        .setDescription('Remove all warnings from a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to remove warnings from')
                .setRequired(true)),

    run: async (client, interaction) => {
        try {
            // Check if user has permission to manage members
            if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
                return interaction.reply({
                    content: "You don't have permission to remove warnings!",
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

            // Get current warnings
            const warnings = await db.get(`warnings_${member.id}`) || [];
            
            if (warnings.length === 0) {
                const embed = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle(`No Warnings Found`)
                    .setDescription(`${member.user.tag} has no warnings to remove.`)
                    .setFooter({ text: 'Ranas Development' })
                    .setTimestamp();

                return interaction.reply({ embeds: [embed] });
            }

            // Remove all warnings
            await db.delete(`warnings_${member.id}`);

            // Create success embed
            const embed = new EmbedBuilder()
                .setColor('Green')
                .setTitle(`Warnings Removed`)
                .setDescription(`Successfully removed ${warnings.length} warning${warnings.length > 1 ? 's' : ''} from ${member.user.tag}`)
                .setFooter({ text: 'Ranas Development' })
                .setTimestamp();

            // Send to moderation channel if configured
            if (config.ticket?.moderation_channel) {
                const modChannel = await interaction.guild.channels.fetch(config.ticket.moderation_channel).catch(() => null);
                if (modChannel) {
                    await modChannel.send({ embeds: [embed] });
                }
            }

            // Reply with success message
            await interaction.reply({ embeds: [embed] });

            // Try to DM the user
            try {
                await member.send({
                    content: `Your warnings have been removed in ${interaction.guild.name}`
                });
            } catch (error) {
                // If DM fails, add a note to the reply
                await interaction.followUp({
                    content: "Note: Could not send DM to the user.",
                    ephemeral: true
                });
            }

        } catch (error) {
            console.error('Unwarn error:', error);
            await interaction.reply({
                content: 'There was an error trying to remove warnings!',
                ephemeral: true
            });
        }
    }
};
