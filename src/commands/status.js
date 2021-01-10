module.exports = {
	name: 'status',
	description: 'Show bot status.',
	usage: ' ',
	execute(message) {
        console.log(`${this.name} command executed.`);
        message.channel.send('Server Simp is at your service.');
	},
};