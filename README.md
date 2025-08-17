---

# 🤖 Rana Development Bot

A powerful and lightweight Discord bot built for **server management, moderation, utility, and fun features**. Designed with modular commands and event handlers for easy scalability.

---

## ✨ Features

* 🛡️ **Moderation** → Ban, kick, warn, mute, blacklist, and slowmode controls.
* 🎫 **Ticket System** → Built-in ticket management with reassignment support.
* ✅ **Verification** → Customizable verification system to secure your community.
* 🛠️ **Utility Commands** → Ping, purge, IP lookup, Minecraft UUID fetch, role management, etc.
* 🎮 **Fun Commands** → Jokes, rock-paper-scissors, say command.
* 📊 **Staff Tools** → Staff ranking, message points tracker.
* ⚡ **Dynamic Event System** → Command handler, ticket handler, join/leave logs.

---

## 📜 Command List

### 🔹 Moderation

* `ban` → Ban a user.
* `unban` → (planned) Unban a user.
* `kick` → Kick a user.
* `warn` → Warn a user.
* `unwarn` → Remove a warning.
* `warnlist` → Show a user’s warnings.
* `mute` / `unmute` → (planned) Control user mutes.
* `blacklist` → Blacklist users from using bot features.
* `lock` / `unlock` → Lock or unlock a channel.
* `slowmode` → Enable slowmode in a channel.

### 🔹 Utility

* `ping` → Check bot latency.
* `purge` → Delete multiple messages quickly.
* `say` → Make the bot say something.
* `setstatus` → Update bot’s status.
* `iplookup` → Lookup an IP address.
* `mcuuid` → Get a Minecraft UUID.

### 🔹 Roles & Permissions

* `setrole` → Assign a role to a user.
* `rvrole` / `rrvrole` / `setrrole` → Manage role removal and reassignment.
* `setverify` → Configure verification role.

### 🔹 Fun & Social

* `joke` → Get a random joke.
* `rps` → Play Rock-Paper-Scissors.
* `staff-ranking` → Show staff leaderboard.

### 🔹 System

* `help` → Show all available commands.
* `shutdown` → Safely shut down the bot.
* `verify` → Manual verification trigger.
* `reassign-ticket` → Reassign a ticket to another staff member.

---

## 🎯 Event Handlers

Your bot listens to multiple Discord events to provide automation and logging:

### 🔹 Core Events

* **ready.js** → Runs when the bot comes online and is ready.
* **commandHandler.js** → Handles commands dynamically.
* **interactionCreate.js** → Handles slash commands, buttons, and select menus.
* **messageCreate.js** → Listens to new messages (prefix commands, logging, etc.).

### 🔹 Guild Events

* **guildMemberAdd.js** → New member joins (welcome + verification).
* **guildMemberRemove.js** → Member leaves (leave logs).

### 🔹 Custom Systems

* **ticketHandler.js** → Ticket creation & management.
* **staffMessagePoint.js** → Tracks staff activity for rankings.

---

## 📂 Project Structure

```bash
📦 rana-development-bot
 ┣ 📂 commands
 ┃ ┣ ban.js
 ┃ ┣ blacklist.js
 ┃ ┣ help.js
 ┃ ┣ iplookup.js
 ┃ ┣ joke.js
 ┃ ┣ lock.js
 ┃ ┣ mcuuid.js
 ┃ ┣ ping.js
 ┃ ┣ purge.js
 ┃ ┣ reassign-ticket.js
 ┃ ┣ rps.js
 ┃ ┣ rrvrole.js
 ┃ ┣ rvchannel.js
 ┃ ┣ rvrole.js
 ┃ ┣ say.js
 ┃ ┣ setrole.js
 ┃ ┣ setrrole.js
 ┃ ┣ setstatus.js
 ┃ ┣ setverify.js
 ┃ ┣ shutdown.js
 ┃ ┣ slowmode.js
 ┃ ┣ staff-ranking.js
 ┃ ┣ unlock.js
 ┃ ┣ unmute.js
 ┃ ┣ unwarn.js
 ┃ ┣ verify.js
 ┃ ┣ warn.js
 ┃ ┗ warnlist.js
 ┣ 📂 events
 ┃ ┣ commandHandler.js
 ┃ ┣ guildMemberAdd.js
 ┃ ┣ guildMemberRemove.js
 ┃ ┣ interactionCreate.js
 ┃ ┣ messageCreate.js
 ┃ ┣ ready.js
 ┃ ┣ staffMessagePoint.js
 ┃ ┗ ticketHandler.js
 ┣ 📜 package.json
 ┣ 📜 config.json
 ┗ 📜 index.js
```

---

## ⚡ Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/yourname/rana-development-bot.git
   cd rana-development-bot
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure `config.json` with your bot token and prefix.

4. Start the bot:

   ```bash
   node index.js
   ```

---

## 📜 License

MIT License © 2025 Rana Development
