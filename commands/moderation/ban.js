const { MessageEmbed } = require('discord.js');
const discord = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bans A User',
    usage: 'Ban <Mention/ID> [reason]',
    aliases: ['hack-ban', 'barn', 'b'],
    permissions: ['BAN_MEMBERS'],
    botPermissions: ['BAN_MEMBERS'],
    nsfw: false,
    cooldown: 25,
    ownerOnly: false
}
module.exports.execute = async(client, msg, args, data) => {
    const member = msg.mentions.members.first()
    const reason = args.slice(1).join(" ")

    if (!msg.member.hasPermission('BAN_MEMBERS')) {
        const no = new MessageEmbed()
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true})}`)
            .setDescription(`You dont have any permissions to execute this command!`)
            .setColor(client.config.color)
        msg.channel.send(no)
    } else {
        if (!msg.guild.me.hasPermission("BAN_MEMBERS")) {
            const no2 = new MessageEmbed()
                .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true})}`)
                .setDescription(`I dont have permissions to ban!`)
                .setColor(client.config.color)
            msg.channel.send(no2)
        } else {

            if (!member) {
                const members = new MessageEmbed()
                    .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true})}`)
                    .setDescription(`Please mention someone to ban!`)
                    .setColor(client.config.color)
                msg.channel.send(members)
            } else {
                if (!reason) {
                    const r = new MessageEmbed()
                        .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
                        .setDescription(`Please specify a reason!`)
                        .setColor(client.config.color)
                    msg.channel.send(r)
                } else {
                    if (member.bannable) {
                        member.ban({ reason: reason })
                        const done = new MessageEmbed()
                            .setTitle('Success!')
                            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true})}`)
                            .setDescription(`Banned ${member} for ${reason}.`)
                            .setFooter(`Requested by: ${msg.author.username}`)
                            .setColor(client.config.color)
                        msg.channel.send(done)
                    } else {
                        const ripbotperms = new MessageEmbed()
                            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
                            .setDescription("This user is either a **Moderator**, **Administrator** or has **some** sort of role higher than mine!")
                            .setColor(client.config.color)
                        msg.channel.send(ripbotperms)
                    }
                }
            }
        }

    }
}