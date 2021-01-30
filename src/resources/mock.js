const { Client, Guild, Channel, GuildChannel, TextChannel, User, GuildMember, Message, Collection, } = require('discord.js');

class MockDiscord {
    constructor(userId = 'user-id', userName = 'user username', discrim = 'user#0000', avatarUrl = 'user avatar url') {
        this.mockClient();
        this.mockGuild();
        this.mockChannel();
        this.mockGuildChannel();
        this.mockTextChannel();
        this.mockUser(userId, userName, discrim, avatarUrl);
        this.mockGuildMember();
        this.guild.addMember(this.user, { accessToken: 'mockAccessToken' });
        this.mockMessage();
    }
    getClient() {
        return this.client;
    }
    getGuild() {
        return this.guild;
    }
    getChannel() {
        return this.channel;
    }
    getGuildChannel() {
        return this.guildChannel;
    }
    getTextChannel() {
        return this.textChannel;
    }
    getUser() {
        return this.user;
    }
    getGuildMember() {
        return this.guildMember;
    }
    getMessage() {
        return this.message;
    }
    mockClient() {
        this.client = new Client();
    }
    mockGuild() {
        this.guild = new Guild(this.client, {
            unavailable: false,
            id: 'guild-id',
            name: 'mocked js guild',
            icon: 'mocked guild icon url',
            splash: 'mocked guild splash url',
            region: 'eu-west',
            member_count: 42,
            large: false,
            features: [],
            application_id: 'application-id',
            afkTimeout: 1000,
            afk_channel_id: 'afk-channel-id',
            system_channel_id: 'system-channel-id',
            embed_enabled: true,
            verification_level: 2,
            explicit_content_filter: 3,
            mfa_level: 8,
            joined_at: new Date('2018-01-01').getTime(),
            owner_id: 'owner-id',
            channels: [],
            roles: [],
            presences: [],
            voice_states: [],
            emojis: [],
        });
    }
    mockChannel() {
        this.channel = new Channel(this.client, {
            id: 'channel-id',
        });
    }
    mockGuildChannel() {
        this.guildChannel = new GuildChannel(this.guild, Object.assign(Object.assign({}, this.channel), { name: 'guild-channel', position: 1, parent_id: '123456789', permission_overwrites: [] }));
    }
    mockTextChannel() {
        this.textChannel = new TextChannel(this.guild, Object.assign(Object.assign({}, this.guildChannel), { topic: 'topic', nsfw: false, last_message_id: '123456789', lastPinTimestamp: new Date('2019-01-01').getTime(), rate_limit_per_user: 0 }));
    }
    mockUser(userId, userName, discrim, avatarUrl) {
        this.user = new User(this.client, {
            id: userId,
            username: userName,
            discriminator: discrim,
            avatar: avatarUrl,
            bot: false,
        });
    }
    mockGuildMember() {
        this.guildMember = new GuildMember(this.client, {
            deaf: false,
            mute: false,
            self_mute: false,
            self_deaf: false,
            session_id: 'session-id',
            channel_id: 'channel-id',
            nick: 'nick',
            joined_at: new Date('2020-01-01').getTime(),
            user: this.user,
            roles: [],
        }, this.guild);
    }
    mockMessage() {
        this.message = new Message(this.client, {
            id: 'message-id',
            type: 'DEFAULT',
            content: 'hello',
            author: this.user,
            webhook_id: null,
            member: this.guildMember,
            pinned: false,
            tts: false,
            nonce: 'nonce',
            embeds: [],
            attachments: [],
            edited_timestamp: null,
            reactions: [],
            mentions: [],
            //mentions: {
            //    users: new Collection([['user', this.user]]),
            //},
            mention_roles: [],
            mention_everyone: [],
            hit: false,
        }, this.textChannel);
    }
}

exports.MockDiscord = MockDiscord;