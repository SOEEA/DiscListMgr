module.exports = (msg, query, locale) => {
  if (!msg.member.roles.cache.has('695879877890670622')) return

  const { users } = msg.client.data
  const user = msg.mentions.users.first()
  const args = query.args
  const cmd = args.shift()

  const { t } = msg.client.locale

  if (!user) return
  if (!users[user.id]) return msg.channel.send(t('quota.notRegistered:Not registered', locale))

  switch (cmd) {
    case 'edit': {
      const d = parseInt(args[args.length - 1])
      if (isNaN(d)) return
      users[user.id].quota += d
      console.log('[Quota] Edited ' + user.tag + (d >= 0 ? ' + ' : ' - ') + d + ' = ' + users[user.id].quota)
      msg.channel.send(t('quota.edit:Modified channel limit for %1$s (%2$s, Total %3$s)', locale, '<@' + user.id + '>', d, users[user.id].quota))
      break
    }

    case 'set': {
      const d = parseInt(args[args.length - 1])
      if (isNaN(d)) return
      users[user.id].quota = d
      console.log('[Quota] Set ' + user.tag + ' = ' + users[user.id].quota)
      msg.channel.send(t('quota.set:Set channel limit for %1$s (Total %2$s)', locale, '<@' + user.id + '>', users[user.id].quota))
    }
  }
}
