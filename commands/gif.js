const Discord = require('discord.js')
const config = require('./../database/config.json')
const db = require('./../dbHandler')
const errorTemplates = require('./../templates/error')

module.exports.run = async (client, message, args) => {
    if (message.member.roles.cache.some(role => role.id === config.permittedRoleId)) {
        let newGifStatus = args[0]
        if (newGifStatus == undefined || newGifStatus == null) {
            return message.reply('nessuno stato specificato')
        }
        db.get('gifBlacklistChannels')
            .catch((err) => {
                return console.error(err)
            })
            .then((blackList) => {
                if (newGifStatus == 'on') {
                    if (blackList.includes(message.channel.id)) {
                        db.set('gifBlacklistChannels', message.channel.id, 'array', 'remove')
                            .catch((err) => {
                                return console.error(err)
                            })
                        message.channel.send(config.gif.on.replace('{{channel}}', message.channel.id))
                    } else {
                        message.reply(config.gif.inBlacklist.false.replace('{{channel}}', message.channel.id))
                    }
                } else if (newGifStatus == 'off') {
                    if (!blackList.includes(message.channel.id)) {
                        db.set('gifBlacklistChannels', message.channel.id, 'array', 'add')
                            .catch((err) => {
                                return console.error(err)
                            })
                        message.channel.send(config.gif.off.replace('{{channel}}', message.channel.id))
                    } else {
                        message.reply(config.gif.inBlacklist.true.replace('{{channel}}', message.channel.id))
                    }

                } else {
                    return console.error(err)
                }
            })

    } else {
        message.reply(config.permissions.insufficient.replace('{{roleId}}', config.permittedRoleId))
        return
    }
}

module.exports.config = {
    name: 'gif',
    aliases: ['controllogif']
}