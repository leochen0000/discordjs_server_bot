module.exports = {
	name: 'status',
	description: 'log bot status',
	execute(message, args) {
        console.log('status command executed');
        message.channel.send('Bot is up.');
	},
};