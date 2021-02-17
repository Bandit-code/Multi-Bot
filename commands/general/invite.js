const { MessageEmbed } = require('discord.js');
const discord = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'sends a invite to ur discord',
    usage: 'Invite',
    aliases: ['discord', 'discord-invite'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}
module.exports.execute = async(client, msg, args, data) => {
    msg.delete()
    const sayembed = new discord.MessageEmbed()
        .setTitle('Discord Server Invite!')
        .setDescription('(Click the above URL)')
        .setFooter(`${msg.guild.name} |  Made by The Lost Bandits#6999`, msg.guild.iconURL({ dynamic: true }))
        .setColor(client.config.color)
        .setTimestamp()
        .setURL(client.config.DiscordInvite)
    await msg.channel.send(sayembed)
}