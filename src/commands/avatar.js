module.exports = {
	name: 'avatar',
    description: 'Show user avatar.',
    usage: 'optional<@memberName>',
	execute(message, args) {
        console.log(`${this.name} command executed.`);
        if (args.length != 0) {
            const user = message.mentions.users.first();

            if (!user) {
                return message.reply('Please use a proper mention if you want to see someone elses avatar.');
            }
    
            return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true, size: 256})}`);
        }
    
        return message.channel.send(`${message.author.username}, your avatar: ${message.author.displayAvatarURL({ dynamic: true, size:256 })}`);
	},
};