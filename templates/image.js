const Discord = require('discord.js')
const config = require('./../database/config.json')


module.exports.genericImage = (title, imageUrl, color = config.embed.error.generic.defaultColor) => {
    return new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setThumbnail(imageUrl)
}