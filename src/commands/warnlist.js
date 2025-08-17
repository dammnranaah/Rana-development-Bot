const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const config = require('../../config.js');
const db = require('quick.db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warnlist')
        .setDescription('View warnings for a user or all warnings')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to check warnings for (optional)')
                .setRequired(false)),

    run: async (client, interaction) => {
        try {
            
            if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
                return interaction.reply({
                    content: "You don't have permission to view warnings!",
                    ephemeral: true
                });
            }

            const targetUser = interaction.options.getUser('user');

            
            if (targetUser) {
                const member = await interaction.guild.members.fetch(targetUser.id).catch(() => null);

                if (!member) {
                    return interaction.reply({
                        content: "That user is not in this server!",
                        ephemeral: true
                    });
                }

                
                const warnings = await db.get(`warnings_${member.id}`) || [];

                if (warnings.length === 0) {
                    const embed = new EmbedBuilder()
                        .setColor('Green')
                        .setTitle('Member is Clean 👀')
                        .setDescription(`${member.user.tag} has no warnings.`)
                        .setFooter({ text: 'Ranas Development' })
                        .setTimestamp();

                    return interaction.reply({ embeds: [embed] });
                }

                const embed = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle(`Warnings for ${member.user.tag}`)
                    .setDescription(`Total Warnings: ${warnings.length}`)
                    .setFooter({ text: 'Ranas Development' })
                    .setTimestamp();

                
                warnings.forEach((warning, index) => {
                    const moderator = interaction.guild.members.cache.get(warning.moderator);
                    const warningDate = new Date(warning.timestamp).toLocaleString();
                    embed.addFields({
                        name: `Warning #${index + 1}`,
                        value: `**Reason:** ${warning.reason}\n**By:** ${moderator ? moderator.user.tag : 'Unknown Moderator'}\n**Date:** ${warningDate}`
                    });
                });

                return interaction.reply({ embeds: [embed] });
            }

            
            const allMembers = await interaction.guild.members.fetch();
            const warningsList = [];

            
            for (const [memberId, member] of allMembers) {
                const warnings = await db.get(`warnings_${memberId}`);
                if (warnings && warnings.length > 0) {
                    warningsList.push({
                        member: member,
                        count: warnings.length
                    });
                }
            }

            if (warningsList.length === 0) {
                const embed = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle('Server Warnings')
                    .setDescription('No warnings found in the server.')
                    .setFooter({ text: 'Ranas Development' })
                    .setTimestamp();

                return interaction.reply({ embeds: [embed] });
            }

            const embed = new EmbedBuilder()
                .setColor('Green')
                .setTitle('Server Warnings')
                .setDescription(`Total Members with Warnings: ${warningsList.length}`)
                .setFooter({ text: 'Ranas Development' })
                .setTimestamp();

            
            warningsList
                .sort((a, b) => b.count - a.count)
                .forEach(({ member, count }) => {
                    embed.addFields({
                        name: member.user.tag,
                        value: `Warnings: ${count}`
                    });
                });

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error('Warnlist error:', error);
            await interaction.reply({
                content: 'There was an error trying to view warnings!',
                ephemeral: true
            });
        }
    }
};
