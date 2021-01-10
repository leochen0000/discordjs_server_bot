const messageHandler = require('../handlers/messagehandler');

module.exports = {
	name: 'kick',
    description: 'Kick member. They can rejoin.',
    usage: '@memberName',
	execute(message, args) {
        console.log(`${this.name} command executed.`);
        if (!(message.member.hasPermission('KICK_MEMBERS') || message.member.hasPermission('ADMINISTRATOR'))) {
            return messageHandler.noPermission(message);
        }
        if (args.length === 0) return messageHandler.noID(message);
        const target = message.mentions.members.first();
        if (!target) return messageHandler.noMentionUser(message, 'kick');
        const targetMember = message.guild.members.cache.get(target.id);
        targetMember
            .kick() // kick returns a "Promise" we must handle it in case of errors
            .then((member) => message.channel.send (`User ${member} kicked.`))
            .catch((err) => messageHandler.handleError(message, err));
	},
};