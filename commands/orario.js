const Discord = require('discord.js')
const fetch = require('node-fetch')
const _ = require('lodash')
const config = require('./../database/config.json')
const db = require('./../dbHandler')
const errorTemplates = require('./../templates/error')

// http://fermibassano.edu.it/OrarioAlunni/classi/edc0000002p00001s3fffffffffffffff_1_aele_ac.png
// http://fermibassano.edu.it/OrarioAlunni/classi/edc0000005p00001s3fffffffffffffff_1_dinf_ac.png

const classi = {

    // CLASSI PRIME
    '1a': {
        class: '1_aele',
        p: '0000002'
    },
    '1d': {
        class: '1_dinf',
        p: '0000005'
    },
    '1e': {
        class: '1_einf',
        p: '0000006'
    },
    '1f': {
        class: '1_finf',
        p: '0000007'
    },
    '1h': {
        class: '1_hmec',
        p: '0000027'
    },
    '1i': {
        class: '1_imec',
        p: '0000032'
    },
    'il': {
        class: '1_lmec',
        p: '0000037'
    },
    '1m': {
        class: '1_mmec',
        p: '0000038'
    },
    '1p': {
        class: '1_pchi',
        p: '0000039'
    },

    // CLASSI SECONDE
    '2a': {
        class: '2_aele',
        p: '0000008'
    },
    '2d': {
        class: '2_dinf',
        p: '0000011'
    },
    '2e': {
        class: '2_einf',
        p: '0000012'
    },
    '2f': {
        class: '2_finf',
        p: '0000013'
    },
    '2h': {
        class: '2_hmec',
        p: '0000029'
    },
    '2i': {
        class: '2_imec',
        p: '0000035'
    },
    '2l': {
        class: '2_lmec',
        p: '0000026'
    },
    '2m': {
        class: '2_mmec',
        p: '0000030'
    },
    '2n': {
        class: '2_nmec',
        p: '0000061'
    },
    '2p': {
        class: '2_pchi',
        p: '0000045'
    }
}

const base_url = 'http://fermibassano.edu.it/OrarioAlunni/classi/edc{{p}}p00001s3fffffffffffffff_{{classe}}_ac.png'

module.exports.run = async (client, message, args) => {
    var classe = args[0].toLowerCase()
    if (_.has(classi, classe)) {
        // Non funziona
        // message.channel.send('Orario', { files: [toString(base_url.replace('{{p}}', classi[classe].p).replace('{{classe}}', classi[classe].class))] })
        message.channel.send(base_url.replace('{{p}}', classi[classe].p).replace('{{classe}}', classi[classe].class))
    } else {
        message.reply('la classe specificata non è disponibile.')
    }
}

module.exports.config = {
    name: 'orario',
    aliases: []
}