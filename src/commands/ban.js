const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user from the server')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The user to ban')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for the ban')
                .setRequired(false)),

    run: async (client, interaction) => {
        
        if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
            return interaction.reply({
                content: "You don't have permission to ban members!",
                ephemeral: true
            });
        }

        const targetUser = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const member = await interaction.guild.members.fetch(targetUser.id).catch(() => null);

        
        if (!member) {
            return interaction.reply({
                content: "That user doesn't exist in this server!",
                ephemeral: true
            });
        }

        if (!member.bannable) {
            return interaction.reply({
                content: "I cannot ban this user! They may have a higher role than me.",
                ephemeral: true
            });
        }

        try {
            await member.ban({ reason });
            await interaction.reply({
                content: `Successfully banned ${targetUser.tag}\nReason: ${reason}`,
                ephemeral: true
            });
        } catch (error) {
            console.error('Ban error:', error);
            await interaction.reply({
                content: 'There was an error trying to ban this user!',
                ephemeral: true
            });
        }
    }
};
