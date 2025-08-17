const { ActivityType } = require("discord.js");

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`${client.user.tag} is ready!`);
        
        
        client.user.setPresence({
            activities: [{
                name: "Support System",
                type: 3 
            }],
            status: 'online'
        });
    }
};
