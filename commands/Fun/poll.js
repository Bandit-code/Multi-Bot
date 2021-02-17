const discord = require('discord.js')
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'poll',
    description: 'Makes a poll based off of reaction',
    usage: '<text>',
    aliases: ['suggestion'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}
module.exports.execute = async(client, msg, args, data) => {
    msg.delete()
    const poll = args.join(" ")
    const pollembed = new discord.MessageEmbed()
        .setTitle('__Poll System__')
        .setDescription(`${poll}`)
        .setColor(client.config.color)
        .setFooter(`${msg.guild.name} |  Made by The Lost Bandits#6999`, msg.guild.iconURL({ dynamic: true }));
    const m = await msg.channel.send(pollembed)
    m.react('✅')
    m.react('❎')
}