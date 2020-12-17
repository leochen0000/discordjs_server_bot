// Tutorial: https://www.youtube.com/watch?v=BmKXBVdEV0g

require('dotenv').config(); // import .env environment variables.

//console.log(process.env.SERVERSIMP_BOT_TOKEN); // print environment variable to console

const { Client } = require('discord.js'); // Import Client class, this is a subclass of EventEmitter so it inherits all its calls too
const client = new Client({
    partials: ['MESSAGE', 'REACTION'] // Allow bot to get info without cache
});
const PREFIX = "="; // prefix for commands

client.login(process.env.SERVERSIMP_BOT_TOKEN); // Login on discord server

// Event: any action on discord triggers an event.

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`); // Print message to console when bot logins to server
});

/*
client.on('message', (message) => {
    if (message.author.bot) return; // Ignore bot messages
    //console.log(message.content); // output any message to console
    console.log(`[${message.author.tag}]: ${message.content}`);
    if (message.content === 'hello') {
        //message.reply('hello there'); This will reply to user and tag them in the current channel
        message.channel.send('hello');
    }
});
*/

client.on('message', async (message) => {
    if (message.author.bot) return; // Ignore bot messages
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content // ... is spreader operator will capture all arguments
            .trim() // .trim() will get rid of whitespace before and after
            .substring(PREFIX.length)
            .split(/\s+/); // regex to find string

        if (CMD_NAME === 'kick') {
            console.log('kick command ran.');
            if (!(message.member.hasPermission('KICK_MEMBERS') || message.member.hasPermission('ADMINISTRATOR'))) {
                return message.reply('You do not have permissions to use that command.');
            }
            if (args.length === 0) return message.reply('Please provide an ID');
            //const member = message.guild.members.cache.get(args[0]);  // This expects Arg[0] to be user ID
            const target = message.mentions.members.first();
            if (!target) return message.channel.send('Please mention user to kick');
            const targetMember = message.guild.members.cache.get(target.id);
            targetMember
                .kick() // kick returns a "Promise" we must handle it in case of errors
                .then((member) => message.channel.send ('User kicked.'))
                .catch((err) => message.channel.send('An error occured. Check bot permissions.'));

        } else if (CMD_NAME === 'ban') {
            console.log('ban command ran.');
            if (!(message.member.hasPermission('BAN_MEMBERS') || message.member.hasPermission('ADMINISTRATOR'))) {
                return message.reply('You do not have permissions to use that command.');
            }
            if (args.length === 0) return message.reply('Please provide an ID');
            const target = message.mentions.members.first();
            if (!target) return message.channel.send('Please mention user to ban');
            const targetMember = message.guild.members.cache.get(target.id);
            try {
                //const user = await message.guild.members.ban(args[0]);  // await related to async. Wait for promise
                const user = await targetMember.ban();
                message.channel.send('User banned');
            } catch (err) {
                console.log(err);
                message.channel.send('An error occured. Check bot permissions.');
            }
        } else {
            message.channel.send('Unknown command. Current commands are =kick, =ban');
        }
    }
});

client.on('messageReactionAdd', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    console.log('adding role');
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
    }
});

client.on('messageReactionRemove', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    console.log('removing role');
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
    }
});
