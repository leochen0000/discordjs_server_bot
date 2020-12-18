module.exports = {
	name: 'kick',
    description: 'Kick member, but they can rejoin.',
    usage: '@memberName',
	execute(message, args) {
        console.log('kick command executed.');
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
	},
};