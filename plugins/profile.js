const canvacord = require('canvacord')
let PhoneNumber = require('awesome-phonenumber')
let levelling = require('../lib/levelling')
  let pp = './src/avatar_contact.png'
  let fetch = require('node-fetch')
  let handler = async (m, { conn, usedPrefix }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  try {
    pp = await conn.getProfilePicture(who)
  } catch (e) {

  } finally {
    let about = (await conn.getStatus(who).catch(console.error) || {}).status || ''
    let { name, limit, exp, lastclaim, registered, regTime, age, level, role, rank } = global.db.data.users[who]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let username = conn.getName(who)
    let math = max - xp
    let prem = global.prems.includes(who.split`@`[0])
    let str = `
❐ ɴᴀᴍᴡ : ${username} ${registered ? '(' + name + ') ': ''}(@${who.replace(/@.+/, '')})${about ? '\nAbout: ' + about : ''}
❐ ɴᴜᴍʙᴇʀ : ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
❐ ʟɪɴᴋ : https://wa.me/${who.split`@`[0]}${registered ? '\nAge: ' + age : ''}
❐ xᴘ : TOTAL ${exp} (${exp - min} / ${xp}) [${math <= 0 ? `Ready to ${usedPrefix}levelup` : `${math} XP left to levelup`}]
❐ ʟᴇᴠᴇʟ : ${level}
❐ ʀᴏʟᴇ : ${role}
❐ ʟɪᴍɪᴛ : ${limit}
❐ ʀᴇɢɪsᴛᴇʀᴇᴅ : ${registered ? 'Yes (' + new Date(regTime) + ')': 'No'}
❐ ᴘʀᴇᴍɪᴜᴍ : ${prem ? 'Yes' : `No \nᴅᴏ ʏᴏᴜ ᴡᴀɴᴛ ᴘʀᴇᴍɪᴜᴍ? ᴛʏᴘᴇ #getprem`}${lastclaim > 0 ? '\nLast Claim: ' + new Date(lastclaim) : ''}
`.trim()
    let mentionedJid = [who]
const ranko = new canvacord.Rank()
    .setAvatar(pp)
    .setCurrentXP(xp)
    .setRequiredXP(math)
    .setStatus("dnd")
    .setLevel(level)
    .setRank(rank)
    .setProgressBar("#FFFFFF", "COLOR")
    .setUsername(username)
    .setDiscriminator(Math.floor(Math.random() * 9999));

ranko.build()
    .then(data => {
conn.send2ButtonImg(m.chat, data, 'YOUR PROFILE!!', str, 'LEVEL UP🎊', '#levelup', 'CLAIM💰', '#claim', m, { contextInfo: { mentionedJid }})
 })
}
}
handler.command = /^profile$/i
module.exports = handler
