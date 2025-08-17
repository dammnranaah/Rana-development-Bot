const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const db = require('quick.db');

module.exports = {
    
    name: "setverify",
    description: "Set the verification channel",
    
    
    data: new SlashCommandBuilder()
        .setName('setverify')
        .setDescription('Set the current channel as the verification channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
    
    async run(client, message, args) {
        return this.handleSetVerify(message.member, message.channel, message.guild);
    },

    
    async execute(interaction) {
        await interaction.deferReply();
        return this.handleSetVerify(interaction.member, interaction.channel, interaction.guild, interaction);
    },

    
    async handleSetVerify(member, channel, guild, interaction = null) {
        
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
            
            await db.set(`verifyChannel_${guild.id}`, channel.id);

            
            const embed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('✅ Verification Channel Set')
                .setDescription(`This channel has been set as the verification channel.\nMembers can now use \`!verify\` in this channel.`)
                .setTimestamp();

            
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
