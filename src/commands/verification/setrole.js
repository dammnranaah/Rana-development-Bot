const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const db = require('quick.db');

module.exports = {
    // Message command properties
    name: "setrole",
    description: "Set the role to give upon verification",
    
    // Slash command properties
    data: new SlashCommandBuilder()
        .setName('setrole')
        .setDescription('Set the role to give upon verification')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The role to give upon verification')
                .setRequired(true)),
    
    // Message command handler
    async run(client, message, args) {
        const role = message.mentions.roles.first();
        return this.handleSetRole(message.member, message.channel, message.guild, role);
    },

    // Slash command handler
    async execute(interaction) {
        await interaction.deferReply();
        const role = interaction.options.getRole('role');
        return this.handleSetRole(interaction.member, interaction.channel, interaction.guild, role, interaction);
    },

    // Shared verification logic
    async handleSetRole(member, channel, guild, role, interaction = null) {
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

        // Check if role was provided
        if (!role) {
            const errorMessage = 'Please mention a role to set as the verification role!';
            if (interaction) {
                await interaction.editReply({ content: errorMessage });
            } else {
                await channel.send(errorMessage);
            }
            return;
        }

        // Check if the role is manageable
        if (!role.editable) {
            const errorMessage = 'I cannot manage that role! Please choose a role below my highest role.';
            if (interaction) {
                await interaction.editReply({ content: errorMessage });
            } else {
                await channel.send(errorMessage);
            }
            return;
        }

        try {
            // Set the verification role
            await db.set(`giveRole_${guild.id}`, role.id);

            // Create success embed
            const embed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('✅ Verification Role Set')
                .setDescription(`The role ${role.toString()} will now be given to members upon verification.`)
                .setTimestamp();

            // Send confirmation
            if (interaction) {
                await interaction.editReply({ embeds: [embed] });
            } else {
                await channel.send({ embeds: [embed] });
            }

        } catch (error) {
            console.error('SetRole error:', error);
            const errorMessage = 'There was an error setting up the verification role.';
            
            if (interaction) {
                await interaction.editReply({ content: errorMessage });
            } else {
                await channel.send(errorMessage);
            }
        }
    }
}; 