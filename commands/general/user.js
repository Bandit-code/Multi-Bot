const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const discord = require('discord.js');

module.exports = {
    name: 'user',
    description: 'Shows a user info',
    usage: 'user [mention/ID]',
    aliases: ['userinfo', 'user-info', 'profile', 'whois'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}
module.exports.execute = async(client, msg, args, data) => {
    msg.delete()
    const member = msg.mentions.members.first() || msg.guild.member(args[0]) || msg.member;

    let status = msg.member.presence.status;

    switch (status) {
        case 'online':
            status = 'Online';
            break;

        case 'invisible':
            status = 'Invisible';
            break;

        case 'оffline':
            status = 'Offline';
            break;

        case 'idle':
            status = 'Idle';
            break;

        case 'dnd':
            status = 'Do Not Disturb';
            break;
    }

    const embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .addField(
            '**User:**',
            `${member.user} [${member.id}]`
        )
        .addField(
            '**Creation Date:**',
            `${moment(member.user.createdAt).format('MMMM Do YYYY')}`
        )
        .addField(
            ' **Date Joined:**',
            `${moment(member.joinedAt).format('MMMM Do YYYY')}`
        )
        .setThumbnail(member.user.displayAvatarURL())
        .addField('**Current Status:**', `${status}`)
        .addField('**Roles:**', `${member.roles.cache.map(role => role.toString()).slice(0, 10).join(' \n** ** ')}`)
        .setColor(client.config.color)
        .setFooter(`Made By The Lost Bandits#6999 ${msg.author.tag}`, msg.guild.iconURL({ dynamic: true }))
        .setTimestamp();
    msg.channel.send(embed);
}