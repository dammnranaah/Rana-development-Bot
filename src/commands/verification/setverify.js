const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const db = require('quick.db');

module.exports = {
    // Message command properties
    name: "setverify",
    description: "Set the verification channel",
    
    // Slash command properties
    data: new SlashCommandBuilder()
        .setName('setverify')
        .setDescription('Set the current channel as the verification channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
    // Message command handler
    async run(client, message, args) {
        return this.handleSetVerify(message.member, message.channel, message.guild);
    },

    // Slash command handler
    async execute(interaction) {
        await interaction.deferReply();
        return this.handleSetVerify(interaction.member, interaction.channel, interaction.guild, interaction);
    },

    // Shared verification logic
    async handleSetVerify(member, channel, guild, interaction = null) {
        // Check if user has admin permissions
        if (!member.permissions.has(PermissionFlagsBits.Administrator)) {
            const errorMessage = 'You need Administrator permissions to use this command!';
            if (interaction) {
                await interaction.editReply({ content: errorMessage });
            } else {
                await channel.send(errorMessage);
            }
            return;
        }

        try {
            // Set the verification channel
            await db.set(`verifyChannel_${guild.id}`, channel.id);

            // Create success embed
            const embed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('✅ Verification Channel Set')
                .setDescription(`This channel has been set as the verification channel.\nMembers can now use \`!verify\` in this channel.`)
                .setTimestamp();

            // Send confirmation
            if (interaction) {
                await interaction.editReply({ embeds: [embed] });
            } else {
                await channel.send({ embeds: [embed] });
            }

        } catch (error) {
            console.error('SetVerify error:', error);
            const errorMessage = 'There was an error setting up the verification channel.';
            
            if (interaction) {
                await interaction.editReply({ content: errorMessage });
            } else {
                await channel.send(errorMessage);
            }
        }
    }
}; 