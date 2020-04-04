const { Client, MessageEmbed } = require('discord.js')
const bot = new Client()
bot.login(process.env.DLMToken)
bot.on('ready', () => { bot.user.setActivity('DiscLists', { type: 'WATCHING' }) })
bot.on('message', (msg) => {
  if (!msg.author.bot && msg.channel.id === '695904480490946610' && msg.content === '?start') {
    msg.channel.send('<:_task:695918989813219348> **Wait for task is done...**').then((m) => { start(m, msg.member) })
  }
})

/**
 * @param {import('discord.js').Message} msg
 * @param {import('discord.js').GuildMember} member
 */
function start (msg, member) {
  const { channel, guild } = msg
  const { user } = member

  let embed = new MessageEmbed()
    .setColor(0x000000)
    .setTitle('**DiscLists.** - List Manager')
    .setThumbnail(guild.iconURL())
    .setDescription('Plz choose one of the menu below <:_stopwatch20:695945085950361621>')
    .addFields([
      { name: '<:_create:695920237530578974>', value: 'Create', inline: true },
      { name: '<:_update:695918214194003988>', value: 'Update', inline: true },
      { name: '<:_delete:695917878154887229>', value: 'Delete', inline: true },
      { name: '<:_infos:695923641291898952>', value: 'User Infos', inline: true },
      { name: '<:_credits:695925110179102751>', value: 'Bot Credits', inline: true }
    ])

  msg.edit(null, embed)

  let validReactions = ['695920237530578974', '695918214194003988', '695917878154887229', '695923641291898952', '695925110179102751']

  msg.createReactionCollector((r, u) => validReactions.includes(r.emoji.id) && u.id === user.id, { max: 1, time: 20000 })
    .on('end', (c) => {
      msg.reactions.removeAll()
      if (!c.first()) {
        msg.react('695945085950361621')
        msg.react('🇹')
        msg.react('🇮')
        msg.react('🇲')
        msg.react('🇪')
        msg.react('🇴')
        msg.react('🇺')
        msg.react('695953317636866128')
        return
      }

      switch (validReactions.indexOf(c.first().emoji.id)) {
        case 0: {
          embed = new MessageEmbed()
            .setColor(0x000000)
            .setTitle('**DiscLists.** - Create Channel')
            .setThumbnail(guild.iconURL())
            .setDescription('Plz choose one of the category below <:_stopwatch20:695945085950361621>')
            .addFields([
              { name: '<:_bots:695946394715815976>', value: 'Bots', inline: true },
              { name: '<:_server:695947468348719124>', value: 'Server', inline: true },
              { name: '<:_general:695947856841801759>', value: 'General', inline: true },
              { name: '<:_broadcasting:695948961361559562>', value: 'Broadcasting', inline: true }
            ])

          msg.edit(embed)

          validReactions = ['695946394715815976', '695947468348719124', '695947856841801759', '695948961361559562']
          const names = ['bot', 'server', 'something', 'broadcasting']
          const categorys = ['695879447815127061', '695888549156749312', '695943330416033833', '695943427631874090']
          msg.createReactionCollector((r, u) => validReactions.includes(r.emoji.id) && u.id === user.id, { max: 1, time: 20000 })
            .on('end', (c2) => {
              msg.reactions.removeAll()
              if (!c2.first()) {
                msg.react('695945085950361621')
                msg.react('🇹')
                msg.react('🇮')
                msg.react('🇲')
                msg.react('🇪')
                msg.react('🇴')
                msg.react('🇺')
                msg.react('695953317636866128')
                return
              }

              embed = new MessageEmbed()
                .setColor(0x000000)
                .setTitle('**DiscLists.** - Create Channel about ' + names[validReactions.indexOf(c2.first().emoji.id)])
                .setThumbnail(guild.iconURL())
                .setDescription('**Please enter your channel name** <:_stopwatch20:695945085950361621>')

              msg.edit(embed)

              channel.createMessageCollector((m) => m.author.id === user.id, { max: 1, time: 20000 })
                .on('end', (c3) => {
                  if (!c3.first()) {
                    msg.react('695945085950361621')
                    msg.react('🇹')
                    msg.react('🇮')
                    msg.react('🇲')
                    msg.react('🇪')
                    msg.react('🇴')
                    msg.react('🇺')
                    msg.react('695953317636866128')
                    return
                  }

                  c3.first().delete()
                  const name = c3.first().content

                  embed = new MessageEmbed()
                    .setColor(0x000000)
                    .setTitle('**DiscLists.** - Created Channel')
                    .setThumbnail(guild.iconURL())
                    .setDescription('I\'ll create channel "' + name + '" about ' + names[validReactions.indexOf(c2.first().emoji.id)] + ' for you!\n- This Bot Created By [PMH](https://github.com/pmh-only)')

                  msg.edit(embed)

                  guild.channels.create(name, {
                    parent: categorys[validReactions.indexOf(c2.first().emoji.id)],
                    permissionOverwrites: validReactions.indexOf(c2.first().emoji.id) !== 2 ? [
                      { id: guild.roles.everyone, deny: ['SEND_MESSAGES'] },
                      { id: user.id, allow: ['SEND_MESSAGES'] }
                    ] : [{ id: user.id, allow: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'] }]
                  }).then((ch) => ch.send('Here we go! <@' + user.id + '>').then((m) => m.delete({ timeout: 20000 })))
                })
            })

          msg.react('695946394715815976')
          msg.react('695947468348719124')
          msg.react('695947856841801759')
          msg.react('695948961361559562')
          break
        }
      }
    })

  msg.react('695920237530578974')
  msg.react('695918214194003988')
  msg.react('695917878154887229')
  msg.react('695923641291898952')
  msg.react('695925110179102751')
}