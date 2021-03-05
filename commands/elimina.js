const Discord = require('discord.js')
const config = require('./../database/config.json')
const db = require('./../dbHandler')
const errorTemplates = require('./../templates/error')

module.exports.run = async (client, message, args) => {
    if (message.member.roles.cache.some(role => role.id === config.permittedRoleId)) {

        var n = parseInt(args[0], 10)
        if (n == undefined || n == null || n > 80 || n < 1) {
            message.reply(config.error.elimina.replace('{{min}}', '1').replace('{{max}}', '80'))
            return
        }

        message.react(config.reaction.gotIt)

        message.channel.messages.fetch({ limit: n + 1 })
            .then(listMessages => message.channel.bulkDelete(listMessages))
            .catch(err => {
                message.reply(errorTemplates.genericError('elimina', '', { name: 'Errore', value: err }))
                return
            })
    } else {
        message.channel.send(errorTemplates.insufficientPermissions())
        return
    }
}

module.exports.config = {
    name: 'elimina',
    aliases: ['delete', 'cancella', 'clear']
}