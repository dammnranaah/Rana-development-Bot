const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const db = require('quick.db');

module.exports = {
    // Message command properties
    name: "verify",
    description: "Verify yourself in the verification channel",
    
    // Slash command properties
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verify yourself in the verification channel'),
    
    // Message command handler
    async run(client, message, args) {
        // Delete the command message if possible
        try {
            await message.delete();
        } catch (error) {
            console.error('Could not delete verify command message:', error);
        }

        return this.handleVerification(message.member, message.channel, message.guild);
    },

    // Slash command handler
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        return this.handleVerification(interaction.member, interaction.channel, interaction.guild, interaction);
    },

    // Shared verification logic
    async handleVerification(member, channel, guild, interaction = null) {
        // Get verification channel
        const verifyChannel = await db.get(`verifyChannel_${guild.id}`);
        if (!verifyChannel || channel.id !== verifyChannel) {
            const errorMessage = 'This command can only be used in the verification channel!';
            if (interaction) {
                await interaction.editReply({ content: errorMessage });
            } else {
                const reply = await channel.send(errorMessage);
                setTimeout(() => reply.delete().catch(() => {}), 5000);
            }
            return;
        }

        // Get roles
        const giveRole = await db.get(`giveRole_${guild.id}`);
        const removeRole = await db.get(`removeRole_${guild.id}`);

        if (!giveRole) {
            const errorMessage = 'Verification role has not been set up!';
            if (interaction) {
                await interaction.editReply({ content: errorMessage });
            } else {
                const reply = await channel.send(errorMessage);
                setTimeout(() => reply.delete().catch(() => {}), 5000);
            }
            return;
        }

        try {
            // Add the verification role
            if (giveRole) {
                await member.roles.add(giveRole);
            }

            // Remove the initial role if set
            if (removeRole) {
                await member.roles.remove(removeRole);
            }

            // Create success embed
            const embed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('✅ Verification Successful')
                .setDescription(`${member.user.tag} has been verified!`)
                .setTimestamp();

            // Send success message
            if (interaction) {
                await interaction.editReply({ embeds: [embed] });
            } else {
                const reply = await channel.send({ embeds: [embed] });
                setTimeout(() => reply.delete().catch(() => {}), 5000);
            }

        } catch (error) {
            console.error('Verification error:', error);
            const errorMessage = 'There was an error during verification. Please contact a staff member.';
            
            if (interaction) {
                await interaction.editReply({ content: errorMessage });
            } else {
                const reply = await channel.send(errorMessage);
                setTimeout(() => reply.delete().catch(() => {}), 5000);
            }
        }
    }
}; 