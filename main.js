// DISCORD
const Discord = require('discord.js')
const client = new Discord.Client()

client.queue = new Map()
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

// TESTING
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// CONFIGURAZIONE ESTERNA
const config = require('./database/config.json')

// MODULES
const fs = require('fs')

// DB
const db = require('./dbHandler')

// AVVIO BOT
client.on('ready', () => {
    client.user.setActivity(config.botActivity.text, { type: config.botActivity.type })
    console.log('BOT PRONTO')
})


// NUOVO MEMBRO
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.id === config.welcome.channelId)
    if (!channel) return
    channel.send(config.welcome.text.replace('{{memberName}}', member))
})

// CARICA I MODULI

fs.readdir("./commands/", (err, files) => {
    let jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0)
        return console.log(" \"./commands\" does not contain any valid commands.")
    jsFiles.forEach((f) => {
        let pull = require(`./commands/${f}`)
        console.log(`	- Searching ${f} \x1b[36m [Pending] \x1b[0m`)
        if (pull.config) {
            client.commands.set(pull.config.name, pull)
            pull.config.aliases.forEach(alias => {
                client.aliases.set(alias, pull.config.name)
            })
            console.log(`	- Fetched command ${pull.config.name} from ${f} \x1b[32m [Resolved]\x1b[0m\n`)
        } else {
            console.log(`	- Does ${f} have no command? \x1b[31m[Rejected]\x1b[0m\n`)
        }
    })
    console.log("\n\n\x1b[1mCommands Loaded\x1b[22m\n\n")
})

client.on('message', async message => {
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0].toLowerCase()
    let args = messageArray.slice(1)

    if (message.author.bot) return

    if (message.content.includes('tenor')) {
        db.get('gifBlacklistChannels')
            .catch((err) => {
                return console.error(err)
            })
            .then((blackList) => {
                if (blackList.includes(message.channel.id)) {
                    message.delete()
                }
            })

    }

    if (message.content.startsWith(config.prefix)) {
        let commandFile = client.commands.get(cmd.slice(config.prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(config.prefix.length)))
        if (commandFile) commandFile.run(client, message, args)
    }

})

client.login(process.env.BOT_TOKEN)
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })