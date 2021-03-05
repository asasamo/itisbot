const Discord = require('discord.js')
const config = require('./../database/config.json')
const db = require('./../dbHandler')
const errorTemplates = require('./../templates/error')

module.exports.run = async (client, message, args) => {
    message.channel.send('Soooos')
}

module.exports.config = {
    name: 'test',
    aliases: ['osos', 'osas']
}