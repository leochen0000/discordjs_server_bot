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
let guild = mock.getGuild();
let message = mock.getMessage();

// Test =avatar command
describe('Test =avatar command', () => {
    it('should return the calling user\'s avatar url', () => {
        message.channel.send = jest.fn();
        avatarCommand.execute(message, '');
        expect(message.channel.send).toHaveBeenCalledWith(`${message.author.username}, your avatar: ${message.author.displayAvatarURL({ dynamic: true, size:256 })}`);
    });
});