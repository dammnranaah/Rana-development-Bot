const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('Lock the current channel')
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for locking the channel')
                .setRequired(false)),

    run: async (client, interaction) => {
        try {
            // Defer reply to prevent timeout
            await interaction.deferReply();

            // Check if user has permission to manage channels
            if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
                return interaction.editReply({
                    content: "You don't have permission to lock channels!"
                });
            }

            const reason = interaction.options.getString('reason') || 'No reason provided';
            const channel = interaction.channel;

            // Check if channel exists and is text-based
            if (!channel || !channel.isTextBased()) {
                return interaction.editReply({
                    content: "❌ This command can only be used in text channels!"
                });
            }

            // Check if bot has permission to manage channel
            if (!channel.guild.members.me.permissions.has(PermissionFlagsBits.ManageChannels)) {
                return interaction.editReply({
                    content: "❌ I don't have permission to manage this channel!"
                });
            }

            // Check if channel type is valid for locking
            const unmanageableTypes = [
                ChannelType.GuildRules,
                ChannelType.GuildOnboarding,
                ChannelType.DM,
                ChannelType.GroupDM,
                ChannelType.GuildCategory
            ];

            if (unmanageableTypes.includes(channel.type)) {
                return interaction.editReply({
                    content: "❌ This type of channel cannot be locked."
                });
            }

            // Get current permissions
            const everyoneRole = interaction.guild.roles.everyone;
            const currentPerms = channel.permissionOverwrites.cache.get(everyoneRole.id);
            
            // Check if already locked
            if (currentPerms?.deny.has(PermissionFlagsBits.SendMessages)) {
                return interaction.editReply({
                    content: "❌ This channel is already locked!"
                });
            }

            // Create new permissions object
            const newPermissions = {
                SendMessages: false,
                SendMessagesInThreads: false,
                CreatePublicThreads: false,
                CreatePrivateThreads: false,
                AddReactions: false
            };

            // Preserve existing VIEW_CHANNEL permission
            if (currentPerms) {
                newPermissions.ViewChannel = currentPerms.allow.has(PermissionFlagsBits.ViewChannel);
            }

            // Update permissions
            await channel.permissionOverwrites.edit(everyoneRole, newPermissions, {
                reason: `Channel locked by ${interaction.user.tag}: ${reason}`
            });

            // Send success message
            await interaction.editReply({
                content: `🔒 Channel locked successfully!\nReason: ${reason}`
            });

            // Send channel notification
            try {
                await channel.send({
                    content: `🔒 This channel has been locked by ${interaction.user.toString()}.\nReason: ${reason}`
                });
            } catch (err) {
                console.error('Failed to send lock notification:', err);
            }

        } catch (error) {
            console.error('Lock error:', error);
            
            // Handle specific error cases
            if (error.code === 350003) {
                return interaction.editReply({
                    content: "❌ Cannot modify this channel's permissions as it must remain accessible."
                });
            }

            if (error.code === 50013) {
                return interaction.editReply({
                    content: "❌ I don't have sufficient permissions to modify this channel!"
                });
            }

            // Handle other errors
            try {
                await interaction.editReply({
                    content: 'There was an error trying to lock this channel!'
                });
            } catch {
                // If editing fails, try to send a new reply
                await interaction.followUp({
                    content: 'There was an error trying to lock this channel!',
                    ephemeral: true
                }).catch(console.error);
            }
        }
    }
};
