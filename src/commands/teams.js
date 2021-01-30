module.exports = {
	name: 'teams',
    description: 'Get n random teams. Default: n = 2',
    usage: 'optional<@numberOfTeams>',
	execute(message, args) {
        console.log(`${this.name} command executed.`);
        let numTeams = 2

        if (args.length == 1 && Number.isInteger(parseInt(args[0]))) {
            numTeams = parseInt(args[0])
        } else if (args.length != 0) {
            return message.reply('Improper parameters. Please enter command in format =teams optional<number of teams>.');
        }

        const target = message.mentions.users.first();
        const channelID = '697372307613810711'; // Games N Friends Voice Channel, NOTE: put in file and parse in future
        let userList = []
        message.guild.channels.cache.get(channelID).members.forEach((member) => {
            userList.push(member.user.username);
        });

        if (userList.length == 0) {
            return message.reply('No users in channel.');
        }
        // Scramble users
        shuffleUserList = (array) => {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        shuffleUserList(userList)

        console.log('Users in channel:');
        console.log(userList);

        let teams = [];
        while (numTeams > 0) {
            teams.push(userList.splice(0, Math.floor(userList.length/numTeams)))
            numTeams--;
        }

        console.log('Teams:');
        console.log(teams);

        let teamsMsg = 'TEAMS:\n'
        for (let i = 0; i < teams.length; i++) {
            teamsMsg += `\`\`\`${i+1}: ${teams[i]}\n\`\`\``;
        }

        return message.channel.send(teamsMsg);
	},
};