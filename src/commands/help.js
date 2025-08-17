const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config.js');

module.exports = {
    name: "help",
    aliases: ["info"],
    
    
    run: async (client, message, args) => {
        const embed = new EmbedBuilder()
            .setTitle(`Verification Help`)
            .setDescription(`**Here are all the commands:**
> \`${config.ticket.prefix}setverify\`: Set verification channel, autodelete channel.
> \`${config.ticket.prefix}setrole\`: Gives role when they use ${config.ticket.prefix}verify command in verification channel.
> \`${config.ticket.prefix}setrrole\`: Removes role when they use ${config.ticket.prefix}verify command in verification channel.
> \`${config.ticket.prefix}verify\`: It gives or remove role it works only in verification channel.
> \`${config.ticket.prefix}rvrole\`: Reset **Give Role** 
> \`${config.ticket.prefix}rvchannel\`: Reset **Verification Channel**
> \`${config.ticket.prefix}rrvrole\`: Reset **Remove Role**`)
            .setColor("#87CEEB")
            .setTimestamp()
            .setFooter({ text: 'Verification System' });

        await message.channel.send({ embeds: [embed] });
    },

    
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows all available verification commands'),

    
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle(`Verification Help`)
            .setDescription(`**Here are all the commands:**
> \`${config.ticket.prefix}setverify\`: Set verification channel, autodelete channel.
> \`${config.ticket.prefix}setrole\`: Gives role when they use ${config.ticket.prefix}verify command in verification channel.
> \`${config.ticket.prefix}setrrole\`: Removes role when they use ${config.ticket.prefix}verify command in verification channel.
> \`${config.ticket.prefix}verify\`: It gives or remove role it works only in verification channel.
> \`${config.ticket.prefix}rvrole\`: Reset **Give Role** 
> \`${config.ticket.prefix}rvchannel\`: Reset **Verification Channel**
> \`${config.ticket.prefix}rrvrole\`: Reset **Remove Role**`)
            .setColor("#87CEEB")
            .setTimestamp()
            .setFooter({ text: 'Verification System' });

        await interaction.reply({ embeds: [embed] });
    }
};
