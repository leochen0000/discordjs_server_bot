// Tutorial: https://www.youtube.com/watch?v=BmKXBVdEV0g

const fs = require('fs'); // Node's native file system module.
const Discord = require('discord.js'); // Import Client class, this is a subclass of EventEmitter so it inherits all its calls too
const Schedule = require('node-schedule');
const { prefix, token } = require('./config.json');
const announcements = require('./announcements.js');
const { get } = require('https');
const client = new Discord.Client();
client.commands = new Discord.Collection(); // class that extend JS's native Map class and include more extensive, useful functionality. 

// Retrieve commands
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// Login on discord server
client.login(token);

// Event: any action on discord triggers an event.
client.on('ready', () => {
    // Print message to console when bot logins to server
    console.log(`${client.user.tag} has logged in.`);

    // Custom games night announcement
    Schedule.scheduleJob({hour: 12, minute: 0, dayOfWeek: 5}, function() { 
        console.log('Games Night announcement');
        const channelID = '736493027383705640'; // #games-night
        const roleID = '751567770159939715'; // @fridayfam
        const channel = client.channels.cache.get(channelID);

        const randomAnnouncement = announcements.announcementList[Math.floor(Math.random() * announcements.announcementList.length)];
        const randomGif = announcements.gifsDir + announcements.gifList[Math.floor(Math.random() * announcements.gifList.length)];

        channel.send(`<@&${roleID}> ` + randomAnnouncement, {
            files: [randomGif]
        })
        .catch(console.error);

    });
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return; // Ignore non-prefix and bot messages

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.log('INVALID COMMAND');
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

});

client.on('messageReactionAdd', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id == '766866637093208085') {
        switch (name) {
            case '🎮':
                member.roles.add('751567770159939715');
                break;
            case '👺':
                member.roles.add('697526237605920790');
                break;
            case '🔪':
                member.roles.add('758190977214316595');
                break;
            case '✨':
                member.roles.add('766861147822358549');
                break;
            case '⛏️':
                member.roles.add('766861386726244352');
                break;
            case '🎬':
                member.roles.add('766862861162643467');
                break;
            case '⌨️':
                member.roles.add('766863007082348574');
                console.log('keyboard');
                break;
            case '🐉':
                member.roles.add('766869142740402206');
                console.log('dragon');
                break;
        }
        console.log('adding role');
    }
});

client.on('messageReactionRemove', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id == '766866637093208085') {
        switch (name) {
            case '🎮':
                member.roles.remove('751567770159939715');
                break;
            case '👺':
                member.roles.remove('697526237605920790');
                break;
            case '🔪':
                member.roles.remove('758190977214316595');
                break;
            case '✨':
                member.roles.remove('766861147822358549');
                break;
            case '⛏️':
                member.roles.remove('766861386726244352');
                break;
            case '🎬':
                member.roles.remove('766862861162643467');
                break;
            case '⌨️':
                member.roles.remove('766863007082348574');
                break;
            case '🐉':
                member.roles.remove('766869142740402206');
                break;
        }
        console.log('removing role');
    }
});
