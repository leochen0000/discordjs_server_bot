'use strict';

const fs = require('fs'); // Node's native file system module.
const Discord = require('discord.js'); // Import the discord.js module
const Schedule = require('node-schedule');
const { prefix, token } = require('./config.json');
const { announcementList, gifList, gifsDir } = require('./announcements.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }); // enable partials to help find uncached data + Create an instance of a Discord client
client.commands = new Discord.Collection(); // class that extend JS's native Map class and include more extensive, useful functionality. 

// Retrieve commands
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// Event: any action on discord triggers an event.
client.on('ready', () => {
    // Print message to console when bot logins to server
    console.log(`${client.user.tag} has logged in.`);

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    // Custom games night announcement
    Schedule.scheduleJob({hour: 12, minute: 30, dayOfWeek: 5}, function() { 
        console.log('Games Night announcement');
        const channelID = '736493027383705640'; // #games-night
        const roleID = '751567770159939715'; // @fridayfam
        const channel = client.channels.cache.get(channelID);

        const randomAnnouncement = announcementList[getRandomInt(0, announcementList.length)];
        const randomGif = gifsDir + gifList[getRandomInt(0, gifList.length)];

        channel.send(`<@&${roleID}> ` + randomAnnouncement, {
            files: [randomGif]
        })
        .catch(console.error);

    });

});

client.on('guildMemberAdd', async member => {
    console.log(`New member ${member.user.username} joined`);
    member.send(`:star2: WELCOME TO SIMP CITY! :star2:\n
    Please remember to:
    1. Identify yourself as either an \`egirl\` (greetings m\'lady :smiling_face_with_3_hearts: ) or \`simp\` (howdy fellow king :crown: )
    2. Mute spam channels (#bot-commands, #voice-chat-spam, #cure-for-depression, #nsfw)! 
    3. Check out #roles if you are interested in any specific games/topics. We play online games every Friday night too! Come out and say hi!
    If you have any questions, feel free to message any of the admins for help.`);
    member.roles.add('721266023138983955'); // Add 'DJ' role so user can use Rythm bot
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
        message.reply('there was an error trying to execute that command! Type `=help` to check the command list');
    }

});

client.on('messageReactionAdd', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === '766866637093208085') {
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
                break;
            case '🐉':
                member.roles.add('766869142740402206');
                break;
        }
        console.log(`adding role to ${member.user.username}`);
    }
});

client.on('messageReactionRemove', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === '766866637093208085') {
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
        console.log(`removing role from ${member.user.username}`);
    }
});

// Login on discord server using secret token
client.login(token);