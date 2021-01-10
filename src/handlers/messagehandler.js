const noPermission = (message) => {
    console.log('Message noPermission called');
    message.reply('You do not have permissions to use that command.');
};

const noID = (message) => {
    console.log('Message noID called');
    message.reply('Please provide an ID.');
};

const noMentionUser = (message, action) => {
    console.log('Message noMentionUser called');
    message.channel.send(`Please mention user to ${action}`);
}

const handleError = (mesesage, err) => {
    const msg = `An error occured. Check bot permissions.\nError message:\n ${err}`;
    console.log(msg);
    message.channel.send(msg);
}

exports.noPermission = noPermission;
exports.noID = noID;
exports.noMentionUser = noMentionUser;
exports.handleError = handleError;