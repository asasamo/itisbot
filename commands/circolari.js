const Discord = require('discord.js')
const config = require('./../database/config.json')
const db = require('./../dbHandler')
const moment = require('moment')
const errorTemplates = require('./../templates/error')

const api = require('../classeviva/api')

module.exports.run = async (client, message, args) => {
    circolari = await api.getNoticeboard(args[0] || 5)
    let embedCircolari = []
    circolari.forEach(circolare => {
        embedCircolari.push({ name: `${circolare.cntCategory} | ${moment(circolare.pubDT).format('DD/MM/YY HH:mm')}`, value: circolare.cntTitle })
    })
    message.channel.send(new Discord.MessageEmbed()
        .setTitle(`Ultime ${args[0] || 5} circolari`)
        .addFields(embedCircolari)
    )
}

module.exports.config = {
    name: 'circolari',
    aliases: ['ultimecircolari', 'avvisi', 'circolare']
}