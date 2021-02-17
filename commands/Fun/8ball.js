module.exports = {
    name: '8ball',
    description: '8ball command',
    usage: '8ball',
    aliases: ['8balls', 'eight-ball'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}
module.exports.execute = async(client, msg, args, data) => {
    const responses = [
        "Yesss",
        "No",
        "Un-sure",
        "Nope",
        "Soruces say this is true",
        "Most Likely",
        "Signs point to yes"
    ];
    const ball = Math.floor(Math.random() * responses.length);
    msg.reply(responses[ball]);
};