const MockDiscord = require('../src/resources/mock.js').MockDiscord;

// Retrieve command
const avatarCommand = require('../src/commands/avatar.js')

// Basic Test Function for reference
describe('console.log example', () => {
    it('console.log text "hello"', () => {
        console.log = jest.fn();
        console.log('hello');
        // The first argument of the first call to the function was 'hello'
        expect(console.log).toHaveBeenCalledWith('hello');
    });
});

// Create Mock fixtures
let mock = new MockDiscord();
let message = mock.getMessage();
let user = mock.getUser();

// Test =avatar command
describe('Test avatar command: show self', () => {
    it('should return the calling user\'s avatar url', () => {
        message.channel.send = jest.fn();
        avatarCommand.execute(message, '');
        expect(message.channel.send).toHaveBeenCalledWith(`${message.author.username}, your avatar: ${message.author.displayAvatarURL({ dynamic: true, size:256 })}`);
    });
});

let mock2 = new MockDiscord('user-id2', 'user username2', 'user#0002', 'user avatar url2');
let user2 = mock2.getUser();
let message2 = mock2.getMessage();
console.log(user2)

/*
describe('Test avatar command: mention other user', () => {
    it('should return the mentioned user\'s avatar url', () => {
        message2.channel.send = jest.fn();
        avatarCommand.execute(message2, '@mentionedUser');
        expect(message2.channel.send).toHaveBeenCalledWith(`${message2.author.username}, your avatar: ${message2.author.displayAvatarURL({ dynamic: true, size:256 })}`);
    });
});
*/

describe('Test avatar command: improper mention', () => {
    it('should return message reply asking for proper mention', () => {
        message.reply = jest.fn();
        avatarCommand.execute(message, 'bad mention');
        expect(message.reply).toHaveBeenCalledWith('Please use a proper mention if you want to see someone elses avatar.');
    });
});