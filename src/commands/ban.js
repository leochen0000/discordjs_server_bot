module.exports = {
	name: 'ban',
	description: 'Ban member. Revok ban in Discord server settings.',
    usage: '@memberName',
	execute(message, args) {
        console.log(`${this.name} command executed.`);
        if (!(message.member.hasPermission('BAN_MEMBERS') || message.member.hasPermission('ADMINISTRATOR'))) {
            return message.reply('You do not have permissions to use that command.');
        }
        if (args.length === 0) return message.reply('Please provide an ID');
        const target = message.mentions.members.first();
        if (!target) return message.channel.send('Please mention user to ban');
        const targetMember = message.guild.members.cache.get(target.id);
        try {
			targetMember.ban();
            message.channel.send('User sent to the shadow realm.');
        } catch (err) {
            console.log(err);
            message.channel.send('An error occured. Check bot permissions.');
        }
	},
};