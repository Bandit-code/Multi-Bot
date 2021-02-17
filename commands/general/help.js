const Discord = require('discord.js');
const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);

module.exports = {
    name: 'help',
    description: 'Lists bot commands.',
    usage: 'Help <Command>',
    aliases: ['commands', 'cmds'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(client, msg, args, data) => {
    msg.delete()
    let prefix = !data.guild.prefix ? client.config.prefix : data.guild.prefix;
    let embed = new Discord.MessageEmbed()
        .setTitle(`Hello! Multi Bot`)
        .setDescription(`These our the commands with Bandit Multi Bot! Also My prefix is ${client.config.prefix}`)
        .setFooter(`${msg.guild.name} |  Made by The Lost Bandits#6999`, msg.guild.iconURL({ dynamic: true }))
        .setColor(client.config.color);


    let categories = await readdir('./commands/');
    categories.forEach(c => {
        let commands = fs.readdirSync('./commands/' + c + '/').filter(file => file.endsWith('.js'))
        if (commands.length > 0) {
            let files = commands.map(cmd => '`' + cmd.replace('.js', '') + '`').join(', ');
            embed.addField(c.toUpperCase(), files);
        }
    });

    return msg.channel.send(embed);
}