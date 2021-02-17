/* includes */
const Discord = require('discord.js');
const fs = require('fs');
const util = require('util');
const mongoose = require('mongoose');


/* defines & config */
const client = new Discord.Client();
const readdir = util.promisify(fs.readdir);

client.events = new Discord.Collection();
client.commands = new Discord.Collection();
client.data = require('./database/MongoDB.js');
client.logger = require('./helpers/logger.js');
client.tools = require('./helpers/tools.js');
client.config = require('./config.json');

async function initialize() {
    // load events
    let events = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
    for (let e of events) {
        let eventFile = require('./events/' + e);
        let eventName = e.split('.')[0];
        client.logger.event(eventName + ' loaded.');
        client.on(eventName, eventFile.bind(null, client));
    }
    client.on("ready", () => {
            console.log('Bandit Multi Bot Has Loaded!')
            client.user.setActivity(client.config.status, { type: client.config.type })
        })
        // load commands
    let categories = await readdir('./commands/');
    categories.forEach(c => {
        let commands = fs.readdirSync('./commands/' + c + '/').filter(file => (file.endsWith('.js')));
        for (const file of commands) {
            let commandFile = require('./commands/' + c + '/' + file);
            client.commands.set(commandFile.name, commandFile);
        }
        client.logger.cmd(c + ' - ' + commands.length + ' commands loaded.');
    });

    // init database
    mongoose.connect(client.config.mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        client.logger.log('MongoDB connected.');
    }).catch((err) => {
        client.logger.error('MongoDB error - ' + err);
    });


    // EVENTS I HAVE OUT SIDE OF THE FOLDER OOF IF YOU TOUCH AND BREAK IT DO NOT CRY AT ME DMS

    //welcome
    client.on('guildMemberAdd', (newuser) => {
        console.log(newuser)
        const channelId = client.config.WelcomeID; // welcome channel
        const message = `Welome <@${newuser.id}> to the server 👋`

        const channel = newuser.guild.channels.cache.get(channelId);
        channel.send(message)

    });
    //leave
    const channelId1 = client.config.LeaveID // leave channel
    client.on('guildMemberRemove', (member) => {
        const message1 = `<@${member.id}> just left! we hope he comes back`

        const channel1 = member.guild.channels.cache.get(channelId1)
        channel1.send(message1)
    })


    client.on('messageDelete', (deletedMessage, messageBulkDelete) => {
        const deletelog = client.config.deletedMessage //delete channel
        if (deletedMessage.author.bot) return // it dont log bot messages
        if (messageBulkDelete) return // No bulk deletes for avoid the spam but you can change it
        const Discord = require('discord.js')
        const { member } = deletedMessage
        let user = deletedMessage.author
        let embed = new Discord.MessageEmbed()
            .setTitle(`Message deleted by ${user.tag}`) //user that deleted the message
            .setDescription(deletedMessage) //The deleted message
            .addField(`Message deleted in`, ` ${member.guild.channels.cache.get(deletedMessage.channel.id)}`) //The channel where the message was deleted
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setColor(client.config.color)
            .setTimestamp();
        const ch = deletedMessage.guild.channels.cache.get(deletelog) //Search the channel called "in config json"
        if (ch) return ch.send(embed) //send the log
    });
    // login bot
    client.login(client.config.token)
}

initialize();