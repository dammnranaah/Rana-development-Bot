const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const config = require('../../config.js');
const db = require('quick.db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warn a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to warn')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for the warning')
                .setRequired(true)),

    run: async (client, interaction) => {
        // Check if user has permission to warn members
        if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
            return interaction.reply({
                content: "You don't have permission to warn members!",
                ephemeral: true
            });
        }

        const targetUser = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const member = await interaction.guild.members.fetch(targetUser.id).catch(() => null);

        if (!member) {
            return interaction.reply({
                content: "That user is not in this server!",
                ephemeral: true
            });
        }

        // Don't allow warning yourself
        if (member.id === interaction.user.id) {
            return interaction.reply({
                content: "You cannot warn yourself!",
                ephemeral: true
            });
        }

        // Don't allow warning users with higher roles
        if (member.roles.highest.position >= interaction.member.roles.highest.position) {
            return interaction.reply({
                content: "You cannot warn this user as they have an equal or higher role!",
                ephemeral: true
            });
        }

        try {
            // Get current warnings
            let warnings = await db.get(`warnings_${member.id}`) || [];
            
            // Add new warning
            warnings.push({
                reason: reason,
                moderator: interaction.user.id,
                timestamp: Date.now()
            });

            // Save updated warnings
            await db.set(`warnings_${member.id}`, warnings);

            // Create embed for warning
            const embed = new EmbedBuilder()
                .setColor('Green')
                .setTitle(`Warning Issued`)
                .addFields(
                    { name: 'User Warned', value: `${member.user.tag}`, inline: true },
                    { name: 'Warned By', value: `${interaction.user.tag}`, inline: true },
                    { name: 'Warning Count', value: `${warnings.length}`, inline: true },
                    { name: 'Reason', value: reason }
                )
                .setTimestamp()
                .setFooter({ text: 'Ranas Development' });

            // Send warning embed to moderation channel if configured
            if (config.ticket?.moderation_channel) {
                const modChannel = await interaction.guild.channels.fetch(config.ticket.moderation_channel).catch(() => null);
                if (modChannel) {
                    await modChannel.send({ embeds: [embed] });
                }
            }

            // Reply to the command
            await interaction.reply({
                embeds: [embed],
                ephemeral: false // Make warning visible to everyone
            });

            // Try to DM the warned user
            try {
                await member.send({
                    content: `You have been warned in ${interaction.guild.name}\nReason: ${reason}\nThis is warning #${warnings.length}`,
                    ephemeral: true
                });
            } catch (error) {
                // If DM fails, add a note to the reply
                await interaction.followUp({
                    content: "Note: Could not send DM to the user.",
                    ephemeral: true
                });
            }

        } catch (error) {
            console.error('Warning error:', error);
            await interaction.reply({
                content: 'There was an error trying to warn this user!',
                ephemeral: true
            });
        }
    }
};
