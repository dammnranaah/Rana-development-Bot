const { ActivityType } = require("discord.js");

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`${client.user.tag} is ready!`);
        
        // Set default presence
        client.user.setPresence({
            activities: [{
                name: "Support System",
                type: 3 // ActivityType.Watching
            }],
            status: 'online'
        });
    }
};