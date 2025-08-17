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

            
            const mutedRole = interaction.guild.roles.cache.find(role => role.name === config.roles?.muted);
            if (!mutedRole) {
                return interaction.reply({
                    content: "The muted role doesn't exist! Please set up the muted role first.",
                    ephemeral: true
                });
            }

            
            if (!member.roles.cache.has(mutedRole.id)) {
                return interaction.reply({
                    content: "This user is not muted!",
                    ephemeral: true
                });
            }

            try {
                
                await member.roles.remove(mutedRole);

                
                if (member.voice.channel) {
                    await member.voice.setMute(false).catch(() => null);
                }

                
                await interaction.reply({
                    content: `✅ Successfully unmuted ${member.toString()}!`,
                    ephemeral: false
                });

                
                try {
                    await member.send(`You have been unmuted in ${interaction.guild.name}`);
                } catch (error) {
                    
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
