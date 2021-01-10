module.exports = {
	name: 'avatar',
    description: 'Show user avatar.',
    usage: 'optional<@memberName>',
	execute(message, args) {
        console.log(`${this.name} command executed.`);
        if (args.length != 0) {
            const target = message.mentions.users.first();

            if (!target) {
                return message.reply('Please use a proper mention if you want to see someone elses avatar.');
            }
    
            return message.channel.send(`${target.username}'s avatar: ${target.displayAvatarURL({ dynamic: true, size: 256})}`);
        }
    
        return message.channel.send(`${message.author.username}, your avatar: ${message.author.displayAvatarURL({ dynamic: true, size:256 })}`);
	},
};