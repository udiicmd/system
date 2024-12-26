
/*

#kiuu
github : https://github.com/kiuur
youtube : https://youtube.com/@kyuurzy
rest api : https://shinoa.us.kg

*/

require('../setting/config');

const fs = require('fs');
const axios = require('axios');
const chalk = require("chalk");
const fetch = require("node-fetch")
const os = require('os')
const path = require('path')
const cp = require('child_process');
const { promisify } = require('util');
const util = require("util");
const ms = require("parse-ms");
const sharp = require('sharp');
const yts = require('yt-search')
const moment = require("moment-timezone");
const { spawn, exec, execSync } = require('child_process');
const { color } = require('./lib/color');

const {
    default: baileys,
    proto,
    jidNormalizedUser,
    generateWAMessage,
    generateWAMessageFromContent,
    getContentType,
    prepareWAMessageMedia,
} = require("@whiskeysockets/baileys");

module.exports = conn = async (conn, m, chatUpdate, mek, store) => {
    try {
        if (global.db.data == null) await loadDatabase();
        require('./lib/database/schema')(m);

const chats = global.db.data.chats[m.chat];
const users = global.db.data.users[m.sender];
const settings = global.db.data.settings;
      
const body = (
    m.mtype === "conversation" ? m.message.conversation :
    m.mtype === "imageMessage" ? m.message.imageMessage.caption :
    m.mtype === "videoMessage" ? m.message.videoMessage.caption :
    m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
    m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
    m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
    m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
    m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
    m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
    m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || 
    m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
);

const budy = (typeof m.text === 'string' ? m.text : '');
        
var textmessage = (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || budy) : ""

const content = JSON.stringify(mek.message)
const type = Object.keys(mek.message)[0];
if (m && type == "protocolMessage") conn.ev.emit("message.delete", m.message.protocolMessage.key);
const { sender } = m;
const from = m.key.remoteJid;
const isGroup = from.endsWith("@g.us");

//database 
const kontributor = JSON.parse(fs.readFileSync('./start/lib/database/owner.json'));
const _afk = JSON.parse(fs.readFileSync('./start/lib/database/afk.json'));
const pendaftar = JSON.parse(fs.readFileSync('./start/lib/database/pendaftar.json'));
const orang_spam = JSON.parse(fs.readFileSync('./start/lib/database/spaming.json'));
        
const botNumber = await conn.decodeJid(conn.user.id);
const isUser = pendaftar.includes(m.sender)
const Access = [global.owner, ...kontributor, ...global.owner]
  .map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
  .includes(m.sender) ? true : m.isChecking ? true :false

const prefa = ["", "!", ".", ",", "🐤", "🗿"];
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!™©®Δ^βα¦|/\\©^]/gi) : '.'
const isCmd = body.startsWith(prefix);
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase();
const args = body.trim().split(/ +/).slice(1);
const pushname = m.pushName || "No Name";
const text = q = args.join(" ");

const fatkuns = m.quoted || m;
const quoted = 
  fatkuns.mtype === 'buttonsMessage' ? fatkuns[Object.keys(fatkuns)[1]] :
  fatkuns.mtype === 'templateMessage' ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] :
  fatkuns.mtype === 'product' ? fatkuns[Object.keys(fatkuns)[0]] :
  m.quoted ? m.quoted :
  m;

const qmsg = quoted.msg || quoted;
const mime = qmsg.mimetype || '';
const isImage = type === 'imageMessage';
const isVideo = type === 'videoMessage';
const isAudio = type === 'audioMessage';
const isMedia = /image|video|sticker|audio/.test(mime);

//group
const groupMetadata = isGroup ? await conn.groupMetadata(m.chat).catch(() => {}) : "";
const groupOwner = isGroup ? groupMetadata.owner : "";
const groupName = isGroup ? groupMetadata.subject : "";
const participants = isGroup ? await groupMetadata.participants : "";
const groupAdmins = isGroup ? participants.filter(v => v.admin !== null).map(v => v.id) : "";
const groupMembers = isGroup ? groupMetadata.participants : "";
const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;

//time
const time = moment().tz("Asia/Jakarta").format("HH:mm:ss");
let ucapanWaktu
if (time >= "19:00:00" && time < "23:59:00") {
ucapanWaktu = "𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐌𝐚𝐥𝐚𝐦"
} else if (time >= "15:00:00" && time < "19:00:00") {
    ucapanWaktu = "𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐒𝐨𝐫𝐞"
} else if (time >= "11:00:00" && time < "15:00:00") {
ucapanWaktu = "𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐒𝐢𝐚𝐧𝐠"
} else if (time >= "06:00:00" && time < "11:00:00") {
    ucapanWaktu = "🏙️𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐏𝐚𝐠𝐢"
} else {
    ucapanWaktu = "𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐒𝐮𝐛𝐮𝐡"
};

const peler = fs.readFileSync('./start/lib/media/peler.jpg')
const cina = ["https://files.catbox.moe/wbx4xm.jpeg"]
 
function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * cina.length);
    return cina[randomIndex];
}
const cinahitam = getRandomImage()

async function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

//function
const {
    smsg,
    sendGmail,
    formatSize,
    isUrl,
    generateMessageTag, 
    getBuffer,
    getSizeMedia, 
    runtime, 
    fetchJson, 
    sleep,
    getRandom
} = require('./lib/myfunction');
    
const { 
    imageToWebp, 
    videoToWebp,
    writeExifImg,
    writeExifVid,
    addExif
} = require('./lib/exif')

const {
	jadibot,
	stopjadibot,
	listjadibot
} = require('./jadibot')

const { ytdl } = require('./lib/scrape/scrape-ytdl');   
const { spamngl } = require('./lib/scrape/scrape-ngl');
const { pindl } = require('./lib/scrape/scrape-pindl')
const { tiktok } = require('./lib/scrape/scrape-tiktok')
const { igdl } = require('./lib/scrape/scrape-igdl')
const { luminai } = require('./lib/scrape/scrape-luminai')
const { VocalRemover } = require('./lib/scrape/scrape-tovocal')
const { Telesticker } = require('./lib/scrape/scrape-telesticker')
const { pinterest } = require("./lib/scrape/scrape-pinterest");
const msgFilter = require("./lib/antispam");
const uploadImage = require('./lib/uploadImage');
        
const afk = require("./lib/afk")
const isAfkOn = afk.checkAfkUser(m.sender, _afk)
/* fungsinya, ketika user yang sudah menggunakan command afk, maka tidak bisa lagi menggunakan command tersebut sampai dia kembali dari afk nya */

const _prem = require("./lib/premium");
const isPremium = Access ? true : _prem.checkPremiumUser(m.sender);
const gcounti = global.gcount
const gcount = isPremium ? gcounti.prem : gcounti.user
let limitUser = isPremium ? 10000000 : global.limitCount

const reaction = async (jidss, emoji) => {
    conn.sendMessage(jidss, {
        react: { text: emoji,
                key: m.key 
               } 
            }
        );
    };

      
if (m.isGroup) {
    if (body.includes(`@6287872303819`)) {
        reaction(m.chat, "❓")
    }
 }

        
if (m.message) {
    if (isCmd && !m.isGroup) {
        console.log(chalk.black(chalk.bgHex('#ff5e78').bold(`\n🌟 ${ucapanWaktu} 🌟`)));
        console.log(chalk.white(chalk.bgHex('#4a69bd').bold(`🚀 Ada Pesan, Om! 🚀`)))
        console.log(chalk.black(chalk.bgHex('#fdcb6e')(`📅 DATE: ${new Date().toLocaleString()}
💬 MESSAGE: ${m.body || m.mtype}
🗣️ SENDERNAME: ${pushname}
👤 JIDS: ${m.sender}`
     )
   )
);
    } else if (m.isGroup) {
        console.log(chalk.black(chalk.bgHex('#ff5e78').bold(`\n🌟 ${ucapanWaktu} 🌟`)));
        console.log(chalk.white(chalk.bgHex('#4a69bd').bold(`🚀 Ada Pesan, Om! 🚀`)));
        console.log(chalk.black(chalk.bgHex('#fdcb6e')(`📅 DATE: ${new Date().toLocaleString()}
💬 MESSAGE: ${m.body || m.mtype}
🗣️ SENDERNAME: ${pushname}
👤 JIDS: ${m.sender}
🔍 MESS LOCATION: ${groupName}`
       ))
     );
  }
}

        
if (isCmd && !isUser) {
    pendaftar.push(m.sender)
    fs.writeFileSync('./start/lib/database/pendaftar.json', JSON.stringify(pendaftar, null, 2))
}

 
msgFilter.ResetSpam(orang_spam);
        const spampm = () => {
            msgFilter.addSpam(m.sender, orang_spam);
            m.reply("don`t spam! please give pause for a few seconnds.");
        };

        const spamgr = () => {
            msgFilter.addSpam(m.sender, orang_spam);
            m.reply("don`t spam! please give 10 seconnds.");
    };

    if (isCmd && msgFilter.isFiltered(m.sender) && m.isGroup) return spampm();
    if (isCmd && msgFilter.isFiltered(m.sender) && !m.isGroup) return spamgr();
  //if (isCmd && args.length < 1 && !Access) msgFilter.addFilter(m.sender);
      
if (m.mtype.includes("imageMessage") && m.isGroup) {
    try {
        const isBotAdmin = groupMetadata.participants.some(participant => 
          participant.id === botNumber && participant.admin
        );
        
        const q = m.quoted ? m.quoted : m;
        
if (!q || !q.message.imageMessage) {
    console.error('Pesan tidak memiliki imageMessage');
    return;
}

        const media = await q.download();
        const mime = q.message.imageMessage.mimetype;
        const isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
        const uploadFile = require('./lib/uploadFile');     
        const link = await (isTele ? uploadImage : uploadFile)(media);
  
 if (!link) {
     console.error('Gagal mengunggah media');
     return;
 }

        const response = await fetch(`https://api.tioprm.eu.org/nsfwdetector?url=${link}`);
        const telaso = await response.json();
        const labelName = telaso.result.labelName;
        const labelId = telaso.result.labelId;

if (labelName.toLowerCase() === 'porn') {
        const warningMessage = `*PORN DETECTED*

> Status: ${labelName}
> Label ID: ${labelId}

action: delete the image`;
    await conn.sendMessage(m.chat, { text: warningMessage }, { quoted: m });
    await conn.deleteMessage(m.chat, m.key);
    }
  } catch (error) {
    console.error('Error memproses deteksi gambar:', error);
  }
}
        
      
async function reply(teks) {
    conn.sendMessage(m.chat, {
        text: teks,
        mentions: conn.ments(teks),
        isForwarded: true
    }, {quoted: m})
}

  
async function prM(params) {
    return await prepareWAMessageMedia(params, { upload: conn.waUploadToServer })
}
        
        
async function sendMusic(teks) {
    let img = { url : cinahitam, 
               type : "image/jpeg"
              }
          
    let url = `https://whatsapp.com/channel/0029Vb0rTBG0AgWCjANsxh2d`    
    let contextInfo = {
        externalAdReply: {    
            showAdAttribution: true,    
            title: `ギ Milwa`,      
            body: `tell me why i'm waiting?`,     
            description: 'Now Playing ....',   
            mediaType: 2,     
            thumbnailUrl: img.url,
            mediaUrl: url   
        }
    }
    
    conn.sendMessage(m.chat, { 
        contextInfo,
        mimetype: 'audio/mp4',
        audio: teks
    }, { quoted: m })
 }
        
      
function getRandomFile(ext) {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
}

        
async function makeStickerFromUrl(imageUrl, conn, m) {
    try {
        let buffer;
        if (imageUrl.startsWith("data:")) {
            const base64Data = imageUrl.split(",")[1];
            buffer = Buffer.from(base64Data, 'base64');
        } else {
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            buffer = Buffer.from(response.data, "binary");
        }
        
        const webpBuffer = await sharp(buffer)
            .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
            .webp({ quality: 70 })
            .toBuffer();
        
        const penis = await addExif(webpBuffer, global.packname, global.author)

        const fileName = getRandomFile(".webp");
        fs.writeFileSync(fileName, webpBuffer);

        await conn.sendMessage(m.chat, {
            sticker: penis,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: `ギ Milwa`,
                    body: `tell me why i'm waiting?`,
                    mediaType: 3,
                    renderLargerThumbnail: false,
                    thumbnailUrl: cinahitam, 
                    sourceUrl: ``
                }
            }
        }, { quoted: m });

        fs.unlinkSync(fileName);
    } catch (error) {
        console.error("Error creating sticker:", error);
        reply('Terjadi kesalahan saat membuat stiker. Coba lagi nanti.');
    }
}
        
      
 if (m.isGroup && !m.key.fromMe) {
  let mentionUser = [
    ...new Set([
      ...(m.mentionedJid || []),
      ...(m.quoted ? [m.quoted.sender] : []),
    ]),
  ];

 for (let ment of mentionUser) {
    if (afk.checkAfkUser(ment, _afk)) {
      let getId2 = afk.getAfkId(ment, _afk);
      let getReason2 = afk.getAfkReason(getId2, _afk);
      let getTimee = Date.now() - afk.getAfkTime(getId2, _afk);
      let heheh2 = ms(getTimee);
      reply(`Jangan tag, dia sedang afk\n\n*Reason :* ${getReason2}\n*Sejak :* ${heheh2.hours} jam, ${heheh2.minutes} menit, ${heheh2.seconds} detik yg lalu\n`);
    }
  }

 if (afk.checkAfkUser(m.sender, _afk)) {
    let getId = afk.getAfkId(m.sender, _afk);
    let getReason = afk.getAfkReason(getId, _afk);
    let getTime = Date.now() - afk.getAfkTime(getId, _afk);
    let heheh = ms(getTime);

    _afk.splice(afk.getAfkPosition(m.sender, _afk), 1);
    fs.writeFileSync("./start/lib/database/afk.json", JSON.stringify(_afk));
      reply(`@${m.sender.split("@")[0]} telah kembali dari afk\n\n*Reason :* ${getReason}\n*Selama :* ${heheh.hours} jam ${heheh.minutes} menit ${heheh.seconds} detik\n`);
  }
 }
  
 if (global.db.data.chats[m.chat].antilink) {
     if (budy.includes('chat.whatsapp.com')) {
         if (isAdmins || Access) return;
         reply(`> GROUP LINK DETECTOR\n\nsepertinya kamu mengirimkan link grup, maaf, pesan tersebut saya hapus`);
         if (!isBotAdmins) return reply(`bot bukan admin`);
         let gclink = `https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}`;
         if (budy.includes(gclink)) return;
         await conn.sendMessage(m.chat, {
             delete: m.key
         });	
     }  
 }
        switch (command) {
            
case 'menu': {

function getFolderSize(folderPath) {
    let totalSize = 0;
    function calculateSize(dirPath) {
        const files = fs.readdirSync(dirPath);
        files.forEach((file) => {
            const filePath = path.join(dirPath, file);
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                calculateSize(filePath);
            } else {
                totalSize += stats.size;
            }
        });
    }
    calculateSize(folderPath);
    return totalSize;
}

    const sessionFolderPath = './session'; 
    const sessionSize = getFolderSize(sessionFolderPath);
    const formattedSessionSize = formatSize(sessionSize);
let prefix = "."
    let anj = `Oh hi @${m.sender.split('@')[0]} !⁩ 👋
I am an automated system (WhatsApp Bot) that can help to do something, search and get data / information only through WhatsApp.

> ◎ *Database* : session : ${formattedSessionSize}
> ◎ *Library* : Baileys @whiskeysockets/baileys@latest
> ◎ *Version* : 1.0.0

If you find an error or want to upgrade premium plan contact the owner.
‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
— sticker
 ▢ ${prefix}brat
 ▢ ${prefix}qc
 ▢ ${prefix}sticker
 ▢ ${prefix}telestick

— owner
 ▢ ${prefix}public
 ▢ ${prefix}self
 ▢ ${prefix}addowner 
 ▢ ${prefix}dellowner
 ▢ ${prefix}addprem 
 ▢ ${prefix}delprem
 ▢ ${prefix}upch
 ▢ ${prefix}banchat
 ▢ ${prefix}unbanchat

— group
 ▢ ${prefix}tagall
 ▢ ${prefix}totag
 ▢ ${prefix}tagme
 ▢ ${prefix}quote
 ▢ ${prefix}d
 ▢ ${prefix}promote
 ▢ ${prefix}demote
 ▢ ${prefix}hidetag

— settings group
 ▢ ${prefix}antilink on/off

— tools
 ▢ ${prefix}spam-ngl
 ▢ ${prefix}tovn [ ✘ ]
 ▢ ${prefix}get
 ▢ ${prefix}pinterest
 ▢ ${prefix}tourl
 ▢ ${prefix}toimg

— ai
 ▢ ${prefix}vocal [ ✘ ]
 ▢ ${prefix}remini
 ▢ ${prefix}openai
 ▢ ${prefix}ai
 ▢ ${prefix}gemini
 ▢ ${prefix}chatgpt

— fun
 ▢ ${prefix}cekkhodam
 ▢ ${prefix}apakah
 ▢ ${prefix}bisakah
 ▢ ${prefix}bagaimanakah

— main
 ▢ ${prefix}afk
 ▢ ${prefix}jadian
 ▢ ${prefix}cekpacar
 ▢ ${prefix}werewolf/ww

— jadibot
 ▢ ${prefix}jadibot
 ▢ ${prefix}listjadibot
 ▢ ${prefix}stopjadibot

— information
 ▢ ${prefix}ping
 ▢ ${prefix}disk
 ▢ ${prefix}tqto

— download
 ▢ ${prefix}play [ ✘ ]
 ▢ ${prefix}fbdl
 ▢ ${prefix}pindl
 ▢ ${prefix}igdl
 ▢ ${prefix}tiktok
`;

 conn.sendMessage(m.chat, { 
        text: anj,
        contextInfo: {
            mentionedJid: [m.sender],
            forwardedNewsletterMessageInfo: {
                newsletterName: "© bash Milwa.sh",
                newsletterJid: `120363382099978847@newsletter`
            },
            isForwarded: true,
            externalAdReply: {
                showAdAttribution: false,
                renderLargerThumbnail: true,
                title: `© Milwa`,
               body: `A simple WhatsApp bot uses JavaScript to respond to commands automatically.`,
                mediaType: 1,
                thumbnailUrl: `https://files.catbox.moe/qdkrns.jpeg`,
                thumbnail: ``,
                sourceUrl: ``
            }
        }
    }, { quoted: m });
  };
  break;
  
case 'telestick':
  case 'stickertele':
     case 'stele':{
         if (args.length == 0) return reply(`mana url nya? contoh : ${prefix + command} https://t.me/addstickers/bocchi_ryo_y0ursfunny_akaudon`); 
         if (args[0] && args[0].match(/(https:\/\/t.me\/addstickers\/)/gi)) {              
             let res = await Telesticker(args[0]);              
             await reaction(m.chat, "⚡")              
             if (m.isGroup && res.length > 30) {
                 await reply("sticker terdapat 30+ maka akan dikirim melalui private chat");
                 
                   for (let i = 0; i < res.length; i++) {
                       let encmedia = await conn.sendImageAsSticker(m.sender, res[i].url, m, { 
                           packname: global.packname, 
                           author: global.author });        
                       await fs.unlinkSync(encmedia);
                       await sleep(9000);
                   }
             } else {
                   for (let i = 0; i < res.length; i++) {
                       let encmedia = await conn.sendImageAsSticker(m.chat, res[i].url, m, {
                           packname: global.packname, 
                           author: global.author });
                       await fs.unlinkSync(encmedia)
                       await sleep(9000);           
                   }
               }
           }
       }
       break;
           
case "afk":{
    if (!m.isGroup) return reply(mess.group);
    if (isAfkOn) return reply("lu kan lagi afk bjirr")
    let reason = text ? text : "gada bjirr";
    afk.addAfkUser(m.sender, Date.now(), reason, _afk);
    reply(`@${m.sender.split("@")[0]} AFK\nAlasan: ${reason}`);
}
break;
            
case 'remini':
  case 'hd':
    case 'hdr': {
        if (!quoted || !/image/.test(mime)) return reply(`mana imagenya? reply image dengan caption ${prefix + command}`)          
        const peler = await quoted.download()              
        let getResult;             
        const ImgLarger = require("./lib/scrape/remini")    
        await reaction(m.chat, "⚡")
        const imgLarger = new ImgLarger();
        try {    
            const Logger = await imgLarger.processImage(peler, 4);
            getResult = Logger.data.downloadUrls[0];
            await conn.sendMessage(m.chat, {      
                image: { url: `${getResult}` }, 
                caption: `> *🍿 fetching - unlimited*`
            },{ quoted: m });
        } catch (error) { 
            console.error('Proses gagal total:', error.message);        
        }
    }
    break;
                
case 'banchat':{
    if (!Access) return reply(mess.owner)
    if (global.db.data.chats[m.chat].isBanned = true) return reply("Sudah Active")
    global.db.data.chats[m.chat].isBanned = true
    reply("berhasil banchat")
}
break

case 'unbanchat':{
    if (!Access) return reply(mess.owner)
    if (global.db.data.chats[m.chat].isBanned = false) return reply("Sudah Off")
    global.db.data.chats[m.chat].isBanned = false
    reply("berhasil unbanchat")
}
break
        
case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'squirrel':
    try {
        let set;
        if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20';
        else if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log';
        else if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3';
        else if (/earrape/.test(command)) set = '-af volume=12';
        else if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"';
        else if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"';
        else if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25';
        else if (/reverse/.test(command)) set = '-filter_complex "areverse"';
        else if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"';
        else if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"';
        else if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"';
        else if (/squirrel/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"';
        if (set) {
            if (/audio/.test(mime)) {
                await reply(mess.wait);
                let media = await conn.downloadAndSaveMediaMessage(quoted);
                let ran = getRandom('.mp3');
                console.log(`Running ffmpeg command: ffmpeg -i ${media} ${set} ${ran}`);
                exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                    fs.unlinkSync(media);
                    if (err) {
                        console.error(`ffmpeg error: ${err}`);
                        return reply(err);
                    }
                    
                    let buff = fs.readFileSync(ran);
                    conn.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: m });
                    fs.unlinkSync(ran);
                });
            } else {
                return reply(`Reply to the audio you want to change with a caption *${prefix + command}*`);
            }
        } else {
            return reply('Invalid command');
        }
    } catch (e) {
        return reply(e);
    }
    break;
            
case 'toimage': 
  case 'toimg': {
      if (!/webp/.test(mime)) return reply(`reply sticker dengan caption *${prefix + command}*`)
      let media = await conn.downloadAndSaveMediaMessage(quoted)
      await reaction(m.chat, "⚡")
      let ran = await getRandomFile('.png')  
      exec(`ffmpeg -i ${media} ${ran}`, (err) => {
          fs.unlinkSync(media)
          if (err) return err 
          let buffer = fs.readFileSync(ran)   
          conn.sendMessage(m.chat, {   
              image: buffer     
          }, { quoted: m })
          fs.unlinkSync(ran)
      }
    )
  }
  break
                
  case "pin":
  case "pinterest":{
      if (!text) return reply(`mau nyari apa? contoh ${prefix + command} yaemiko`);
      await reaction(m.chat, "⚡")
      let anu = await pinterest(text);
      let result = anu[Math.floor(Math.random() * anu.length)];
      conn.sendMessage(m.chat, {
          image: { url: result }, 
          caption: "nih kak" }, { quoted: m });
  }
  break;
  
  case "upsaluran":
  case "upch":{
      if (!Access) return reply(mess.owner)
      await reaction(m.chat, "⏳")
      await sleep(3000)
      await reaction(m.chat, "⌛")
      conn.sendMessage(`${global.idch}`,{ 
          audio : await quoted.download(),
          mimetype: 'audio/mp4',
          ptt: true
      })
      await sleep(2000)
      await reaction(m.chat, "✅")
  }
  break
                
  case 'h':
  case 'hidetag': {
      if (!m.isGroup) return reply(mess.group)
      if (!isAdmins && !Access) return reply(mess.admin)
      if (m.quoted) {
          conn.sendMessage(m.chat, {
              forward: m.quoted.fakeObj,
              mentions: participants.map(a => a.id)
          })
      }
      if (!m.quoted) {
          conn.sendMessage(m.chat, {
              text: q ? q : '',
              mentions: participants.map(a => a.id)
          }, { quoted: m })
      }
  }
  break
                
  case 'cekkhodam': {
      if (!text) return reply(`ketik nama lu anjg, contoh ${prefix + command} rido`)
      let who
      if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
      const anunya = [
	  "Kaleng Cat Avian",
	  "Pipa Rucika",
	  "Botol Tupperware",
	  "Badut Mixue",
	  "Sabun GIV",
	  "Sandal Swallow",
	  "Jarjit",
	  "Ijat",
	  "Fizi",
	  "Mail",
	  "Ehsan",
	  "Upin",
	  "Ipin",
	  "sungut lele",
	  "Tok Dalang",
	  "Opah",
	  "Opet",
	  "Alul",
	  "Pak Vinsen",
	  "Maman Resing",
	  "Pak RT",
	  "Admin ETI",
	  "Bung Towel",
	  "Lumpia Basah",
	  "Martabak Manis",
	  "Baso Tahu",
	  "Tahu Gejrot",
	  "Dimsum",
	  "Seblak Ceker",
	  "Telor Gulung",
	  "Tahu Aci",
	  "Tempe Mendoan",
	  "Nasi Kucing",
	  "Kue Cubit",
	  "Tahu Sumedang",
	  "Nasi Uduk",
	  "Wedang Ronde",
	  "Kerupuk Udang",
	  "Cilok",
	  "Cilung",
	  "Kue Sus",
	  "Jasuke",
	  "Seblak Makaroni",
	  "Sate Padang",
	  "Sayur Asem",
	  "Kromboloni",
	  "Marmut Pink",
	  "Belalang Mullet",
	  "Kucing Oren",
	  "Lintah Terbang",
	  "Singa Paddle Pop",
	  "Macan Cisewu",
	  "Vario Mber",
	  "Beat Mber",
	  "Supra Geter",
	  "Oli Samping",
	  "Knalpot Racing",
	  "Jus Stroberi",
	  "Jus Alpukat",
	  "Alpukat Kocok",
	  "Es Kopyor",
	  "Es Jeruk",
	  "Cappucino Cincau",
	  "Jasjus Melon",
	  "Teajus Apel",
	  "Pop ice Mangga",
	  "Teajus Gulabatu",
	  "Air Selokan",
	  "Air Kobokan",
	  "TV Tabung",
	  "Keran Air",
	  "Tutup Panci",
	  "Kotak Amal",
	  "Tutup Termos",
	  "Tutup Botol",
	  "Kresek Item",
	  "Kepala Casan",
	  "Ban Serep",
	  "Kursi Lipat",
	  "Kursi Goyang",
	  "Kulit Pisang",
	  "Warung Madura",
	  "Gorong-gorong",
]
      function getRandomKhodam() {
          const randomKhodam = Math.floor(Math.random() * anunya.length);
    return anunya[randomKhodam];
}
const khodam = getRandomKhodam()
      const response = ` 
> *Nama :* ${text}
> *Khodam :* ${khodam}`
      reply(response)
  }
  break
        
  case 'apakah': {
      if (!q) return reply(`apa njrr? contoh ${prefix + command} saya wibu`)
      const apa = ['Iya', 'Tidak', 'Bisa Jadi', 'Betul']
      const kah = apa[Math.floor(Math.random() * apa.length)]
      reply(`pertanyaan : apakah ${q}\njawaban : ${kah}`)
  }
  break
                
  case 'bisakah': {
      if (!q) return reply(`apaa njrr? contoh ${prefix + command} saya menjadi presiden`)
      const bisa = ['Bisa', 'Gak Bisa', 'Gak Bisa Ajg Aaokawpk', 'TENTU PASTI KAMU BISA!!!!', 'naik anjing aja, naik anjing']
      const ga = bisa[Math.floor(Math.random() * bisa.length)]
      reply(`pertanyaan : apakah ${q}\njawaban : ${ga}`)
  } 
  break

  case 'bagaimanakah': {
      if (!q) return reply(`apaa njrr? contoh ${prefix + command} cara mengatasi sakit hati`)
      const gimana = ['Gak Gimana2', 'Sulit Itu Bro', 'Maaf Bot Tidak Bisa Menjawab', 'Coba Deh Cari Di Gugel', 'astaghfirallah Beneran???', 'Pusing ah', 'Owhh Begitu:(', 'Gimana yeee']
      const ya = gimana[Math.floor(Math.random() * gimana.length)]
      reply(`pertanyaan : apakah ${q}\njawaban : ${ya}`)
  }
  break
                
  case 'antilink': {	
      if (!m.isGroup) return reply(mess.group)
      if (!isAdmins && !Access) return reply(mess.admin)		
      if (!isBotAdmins) return reply(mess.botdmin)
      if (!text) return reply(`silakan pilih opsinya, on/off, contoh ${prefix + command} on/off`)
      if (args[0] === "on") {
          if (global.db.data.chats[m.chat].antilink) return reply(`udaaa aktif`)
          global.db.data.chats[m.chat].antilink = true
          reply('successfully activate antilink in this group')
      } else if (args[0] === "off") {		
          if (!global.db.data[m.chat].antilink) return reply(`udah nonaktif`)
          global.db.data[m.chat].antilink = false
          reply('successfully disabling antilink in this group')
      }
  }
  break
          
 case 'tagme': {
     if (!isGroup) return false;
     let menst = [m.sender];
     conn.sendMessage(m.chat, { 
         text: `@${m.sender.split('@')[0]}`,  
         mentions: menst        
     }
   )   
 }
 break
            
 case 'promote':
 case 'pm': {
     if (!m.isGroup) return reply(mess.group)
     if (!Access && !isAdmins) return reply(mess.admin)
     if (!isBotAdmins) return reply(mess.botadmin)
     if (!m.quoted && !m.mentionedJid[0] && isNaN(parseInt(args[0]))) return reply('tag/reply pesan target yang ingin di jadikan admin!')
     let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
     if (!m.mentionedJid[0] && !m.quoted && !text) return reply(`tag/reply target yang mau di ${command}`)
     await reaction(m.chat, "⚡")
     await conn.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => m.reply('sukses promote member')).catch((err) => reply('terjadi kesalahan'))
 }
 break
                
 case 'demote':
 case 'dm': {
     if (!m.isGroup) return reply(mess.group)
     if (!Access && !isAdmins) return reply(mess.admin)
     if (!isBotAdmins) return reply(mess.botadmin)
     if (!m.quoted && !m.mentionedJid[0] && isNaN(parseInt(args[0]))) return m.warning('tag/reply pesan target yang ingin di un admin!')
     let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
     if (!m.mentionedJid[0] && !m.quoted && !text) return m.warning(`tag/reply target yang mau di ${command}`)
     await reaction(m.chat, "⚡")
     await conn.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => m.reply('sukses demote admin')).catch((err) => reply('terjadi kesalahan'))
 }
 break
                
case 'addprem': {
    if (!Access) return reply(mess.owner)
    const kata = args.join(" ")
    const nomor = kata.split("|")[0];
    const hari = kata.split("|")[1];
    if (!nomor) return reply(`mana nomornya dan mau berapa hari? contoh : ${prefix + command} @tag|30d`)
    if (!hari) return reply(`mau yang berapa hari njrr?`)
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : nomor.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    if (owner.includes(users)) return reply('lol, owner kan bebas')
    const idExists = _prem.checkPremiumUser(users)
    if (idExists) return reply('')
    let data = await conn.onWhatsApp(users)
    if (data[0].exists) {
        await reaction(m.chat, '🕑')
        _prem.addPremiumUser(users, hari)
        await sleep(3000)
        let cekvip = ms(_prem.getPremiumExpired(users) - Date.now())
        let teks = `sukses status premium
- User : @${users.split("@")[0]}
- Expired : ${hari.toUpperCase()}
- Countdown : ${cekvip.days} hari, ${cekvip.hours} jam, ${cekvip.minutes} menit`
        const contentText = {
            text: teks,
            contextInfo: {	
                mentionedJid: conn.ments(teks),
                externalAdReply: {
                    title: `premium user`,
                    previewType: "PHOTO",
                    thumbnailUrl: `https://pomf2.lain.la/f/dynqtljb.jpg`,
                    sourceUrl: ''
                }	
            }	
        };	
        return conn.sendMessage(m.chat, contentText, { quoted: m })
    } else {		
         reply("not found")
    }	
}
break
                
case 'delprem': {
    if (!Access) return reply(mess.owner)
    if (!args[0]) return reply(`siapa yang mau di ${command}? gunakan nomor/tag, contoh : ${prefix}delprem @tag`)
    let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    const idExists = _prem.checkPremiumUser(users)
    if (!idExists) return reply("bukan user premium ini mah")
    let data = await conn.onWhatsApp(users)
    await reaction(m.chat, "⚡")
    if (data[0].exists) {	
        let premium = JSON.parse(fs.readFileSync('./start/lib/database/premium.json'));
        premium.splice(_prem.getPremiumPosition(users), 1)
        fs.writeFileSync('./start/lib/database/premium.json', JSON.stringify(premium))		
        reply('user tersebut telah di hapus')
    } else {	
        reply("not found")
    }
}
break
                
case 'kontol':{
    reply('lu juga kontol')
}
break
                
case 'peler':{
    reply('lu juga peler')
}
break
                
case 'addowner': {
    if (!Access) return reply(mess.owner);
    if (!args[0]) return reply(`mana nomornya? contoh ${prefix + command} 628888`);
    const prem1 = text.split("|")[0].replace(/[^0-9]/g, '');
    const cek1 = await conn.onWhatsApp(`${prem1}@s.whatsapp.net`);
    if (cek1.length == 0) return reply("masukkan nomor yang valid dan terdaftar di WhatsApp!")      
    kontributor.push(prem1);
    await reaction(m.chat, "⚡")
    fs.writeFileSync('./start/lib/database/owner.json', JSON.stringify(kontributor));
    reply(`sukses menjadikan ${prem1} sebagai owner`); 
    conn.sendMessage(`${prem1}@s.whatsapp.net`, { 
        text: `selamat, kamu sekarang bagian dari owner`},{quoted:m}
           );
        }
        break;

case 'delowner': {
    if (!Access) return reply(mess.owner);
    if (!args[0]) return reply(`mana nomornya? contoh ${prefix + command} 628888`);
    const prem2 = text.split("|")[0].replace(/[^0-9]/g, '');
            const unp = kontributor.indexOf(prem2);
            if (unp !== -1) {
                kontributor.splice(unp, 1);
                await reaction(m.chat, "⚡")
                fs.writeFileSync('./start/lib/database/owner.json', JSON.stringify(kontributor));
                reply(`yah ${prem2} sudah bukan lagi bagian dari owner`);
            } else {
                reply(`${prem2} tidak ada dalam list owner.`);
            }
        }
        break;
            
        case 'public': {
            if (!Access) return reply(mess.owner) 
            conn.public = true
            reply(`successfully changed to ${command}`)
        }
        break
            
        case 'self': {
            if (!Access) return reply(mess.owner) 
            conn.public = false
            reply(`successfully changed to ${command}`)
        }
        break

case 'backup': {
    if (!Access) return reply(mess.owner);
    await reaction(m.chat, "⚡")
    const sessionPath = "./session";
    if (fs.existsSync(sessionPath)) {
        const files = fs.readdirSync(sessionPath);
        files.forEach((file) => {
            if (file !== "creds.json") {
                const filePath = path.join(sessionPath, file); 
                if (fs.lstatSync(filePath).isDirectory()) {
                    fs.rmSync(filePath, { recursive: true, force: true });
                } else {  
                    fs.unlinkSync(filePath);
                }
            }
        }
    );
}

    const ls = execSync("ls").toString().split("\n").filter(
        (pe) =>           
        pe != "node_modules" &&   
        pe != "package-lock.json" &&  
        pe != "yarn.lock" &&
        pe != "tmp" &&
        pe != ""
    );

    execSync(`zip -r backup.zip ${ls.join(" ")}`);
    await conn.sendMessage(m.chat, {
        document: fs.readFileSync("./backup.zip"),   
        fileName: "script.zip",
        mimetype: "application/zip",
        caption: "ini adalah file backup mu",
        jpegThumbnail: fs.readFileSync('./start/lib/media/tes.png')
    }, { quoted: m });
    execSync("rm -rf backup.zip");
}
break
            
case "jadibot": {
    if (!Access && !isPremium) return reply('kenapa kak, mau jadi bot?')
    await reaction(m.chat, '✅')
    try {
        await jadibot(conn, m, m.sender)
    } catch (error) {
        await reply(util.format(error), command)
    }
}
break
                
case "stopjadibot": {
    if (!Access && !isPremium) return reply('gmw')
    await reaction(m.chat, '✅')
    if (m.key.fromMe) return
    try {
        await stopjadibot(conn, m, m.sender)
    } catch (error) {
        await reply(util.format(error), command)
    }
}
break
			
case "listjadibot": {
    if (!Access && !isPremium) return reply('khusus user premium')
    if (m.key.fromMe) return
    try {
        listjadibot(conn, m)
    } catch (error) {
        await reply(util.format(error), command)
    }
}
break
                
case 'tqto': {
    let peler = `congratulations to those who have helped me to develop this script

> KyuuRzy (creator)
> ZeroX (bestie)
> Devorsixcore (bestie)
> Dittsans (motivation)
> FadlanXD (my friend)
> Milwa (idk)

— participating teams
> N7

> without them, this script is nothing :)`
    conn.sendMessage(m.chat, { 
        text: peler,
        contextInfo: {
            mentionedJid: [m.sender],
            isForwarded: true,
            externalAdReply: {
                showAdAttribution: false,
                renderLargerThumbnail: true,
                title: `ギ special, for thanks`,
                body: `A simple WhatsApp bot uses JavaScript to respond to commands automatically.`,
                mediaType: 1,
                thumbnailUrl: cinahitam,
                thumbnail: ``,
                sourceUrl: ``
            }
        }
    }, { quoted: m });
};
break;    
        
case 'tourl': {
    let q = m.quoted ? m.quoted : m
    let media = await quoted.download();
    await reaction(m.chat, "⚡")
    let uploadImage = require('./lib/uploadImage');
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
    const uploadFile = require('./lib/uploadFile')
    let link = await (isTele ? uploadImage : uploadFile)(media);  
    conn.sendMessage(m.chat, {
        text : `(no expiration date/unknown)\n ${link}`
    },{quoted:m})
}
break;       
            
case 'ping': {
    const old = performance.now()
    const ram = (os.totalmem() / Math.pow(1024, 3)).toFixed(2) + " GB";
    const free_ram = (os.freemem() / Math.pow(1024, 3)).toFixed(2) + " GB";
    const serverInfo = `server information

> CPU : *${os.cpus().length} Core, ${os.cpus()[0].model}*
> Uptime : *${Math.floor(os.uptime() / 86400)} days*
> Ram : *${free_ram}/${ram}*
> Speed : *${(performance.now() - old).toFixed(5)} ms*`;
    conn.sendMessage(m.chat, {
        text: serverInfo
    },{ quoted:m})
}
break;
        
/*case 'speedtest': {
    await reaction(m.chat, "⚡")
    const exec = promisify(cp.exec).bind(cp);
    let o;
    try {
        o = await exec('python3 speed.py --share --secure');
    } catch (e) {
        o = e;
    } finally {
        const { stdout, stderr } = o;
        if (stdout.trim()) {
            conn.relayMessage(m.chat, {
                extendedTextMessage: {
                    text: stdout,
                    contextInfo: {
                        externalAdReply: {
                            title: "S P E E D  T E S T",
                            mediaType: 1,
                            previewType: 0,
                            renderLargerThumbnail: true,
                            thumbnailUrl: cinahitam,
                            sourceUrl: ``
                        }
                    },
                    mentions: [m.sender]
                }
            }, {quoted:m});
        }
        if (stderr.trim()) reply(stderr);
    }
}
break;*/

case 'disk': {
    exec('cd && du -h --max-depth=1', (err, stdout) => {
        if (err) return reply(`${err}`);
        if (stdout) return reply(stdout);
    });
}
break;
            
case 'sticker':
case 's':
case 'stiker': {
    if (!quoted) return reply(`reply image/video dengan caption ${prefix + command}`);
    try {
        if (/image/.test(mime)) {
            const media = await quoted.download();
            await reaction(m.chat, "⚡")
            const imageUrl = `data:${mime};base64,${media.toString('base64')}`;
            await makeStickerFromUrl(imageUrl, conn, m);
        } else if (/video/.test(mime)) {
            if ((quoted?.msg || quoted)?.seconds > 10) return reply('Durasi video maksimal 10 detik!')
                const media = await quoted.download();
                const videoUrl = `data:${mime};base64,${media.toString('base64')}`;
                await makeStickerFromUrl(videoUrl, conn, m);
            } else {
                return reply('Kirim gambar/video dengan caption .s (video durasi 1-10 detik)');
            }
        } catch (error) {
            console.error(error);
            return reply('Terjadi kesalahan saat memproses media. Coba lagi.');
        }
    }
    break;
            
      case'get':{
        if (!/^https?:\/\//.test(text)) return reply(`mana url nya? contoh ${prefix + command} https://tiktok.com`);
        const ajg = await fetch(text);
          await reaction(m.chat, "⚡")
        if (ajg.headers.get("content-length") > 100 * 1024 * 1024) {
            throw `Content-Length: ${ajg.headers.get("content-length")}`;
        }

        const contentType = ajg.headers.get("content-type");
        if (contentType.startsWith("image/")) {
            return conn.sendMessage(
                m.chat,
                { image: { url: text } },
                { quoted: m }
            );
        }
        if (contentType.startsWith("video/")) {
            return conn.sendMessage(
                m.chat,
                { video: { url: text } },
                { quoted: m }
            );
        }
        if (contentType.startsWith("audio/")) {
            return conn.sendMessage(
                m.chat,
                { audio: { url: text },
                mimetype: 'audio/mpeg', 
                ptt: true
                },
                { quoted: m }
            );
        }
        
        let alak = await ajg.buffer();
        try {
            alak = util.format(JSON.parse(alak + ""));
        } catch (e) {
            alak = alak + "";
        } finally {
            return reply(alak.slice(0, 65536));
        }
      }
      break
            
      case'totag':{
        if (!isAdmins) return reply(mess.admin);
        if (!m.isGroup) return reply(mess.group);
        if (!m.quoted) return reply(`reply pesan dengan caption ${prefix + command}`);
        const groupMetadata = await conn.groupMetadata(m.chat);
        const participants = groupMetadata.participants;

        conn.sendMessage(m.chat, {
            forward: m.quoted.fakeObj,
            mentions: participants.map((a) => a.id)
           }, { quoted: m });
         }
        break
            
      case'igdl':
      case'ig':{
        if (!text) return reply(`mana link Instagram nya? contoh ${prefix + command} https://`);
        let memek = await igdl(text);
          await reaction(m.chat, "⚡")
        let respon = memek.data.url_list;
        if (respon && respon.length > 0) {
            const mediaUrl = respon[0];

            try {
                const headResponse = await axios.head(mediaUrl);
                const mimeType = headResponse.headers['content-type'];

                const isImage = /image\/.*/.test(mimeType);
                const isVideo = /video\/.*/.test(mimeType);

                if (isImage) {
                    await conn.sendMessage(m.chat, {
                        image: { url: mediaUrl },
                        caption: "Successfully downloaded image from that URL"
                    }, { quoted: m });
                } else if (isVideo) {
                    await conn.sendMessage(m.chat, {
                        video: { url: mediaUrl },
                        caption: "Successfully downloaded video from that URL"
                    }, { quoted: m });
                } else {
                    await conn.sendMessage(m.chat, {
                        text: "Unsupported media type received."
                    }, { quoted: m });
                }
            } catch (error) {
                console.error('Error fetching media type:', error);
                await conn.sendMessage(m.chat, {
                    text: "Error occurred while retrieving media type."
                }, { quoted: m });
            }
        } else {
            await conn.sendMessage(m.chat, {
                text: "No media found or an error occurred while retrieving media."
            }, { quoted: m });
        }
      }
      break
      
      case 'fb':
      case 'fbdl':
      case 'facebook':{
          if (!text) return reply(`mana URL Facebook nya? contoh ${prefix + command} https://www.facebook.com/share/r/12BFZAtjpS8/?mibextid=qDwCgo`)
          let woii = await fetchJson(`https://api.siputzx.my.id/api/d/facebook?url=${text}`)
          await reaction(m.chat, "⚡")
          let hitam = woii.data;
          let peler = hitam.video;
          let anunya = hitam.userInfo.name
          conn.sendMessage(m.chat, { 
              video: { url: peler }, 
              caption: `source : ${anunya}` }, 
           { quoted: m }
         );
      }
      break
                
      case'ai':
      case'gemini':
      case'openai':
      case'chatgpt':{
        if (!text) return reply(`mau tanyakan apa saja? contoh ${prefix + command} siapakah presiden Indonesia sekarang?`)
          let cuki = await fetchJson(`https://loco.web.id/wp-content/uploads/api/v1/bingai.php?q=${text}`)
          await reaction(m.chat, "⚡")
          let mamad = cuki.result.ai_response
          conn.sendMessage(m.chat, { text : mamad }, {quoted:m})
      }
      break
            
      case'tiktok':
      case'tt':{
        if (!text) return reply(`mana link tiktok nya? contoh ${prefix + command} https://`);
         let res = await tiktok(text);
          await reaction(m.chat, "⚡")
         if (res && res.data && res.data.data) {
            let images = res.data.data.images || [];
            let play = res.data.data.play;
            let lagu = res.data.data.music

            const getMimeType = async (url) => {
                try {
                    const response = await axios.head(url);
                    return response.headers['content-type'];
                } catch (error) {
                    console.error(error);
                    return
                }
            };

            let mimeType = await getMimeType(play);
            
            if (mimeType && mimeType.startsWith('video/')) {
                await conn.sendMessage(m.chat, {
                    video: { url: play },
                    caption: "Successfully downloaded video from TikTok"
                },{quoted:m});
            } else if (images.length > 0) {
                let totalImages = images.length;
                let estimatedTime = totalImages * 4;
                let message = `Estimasi waktu pengiriman gambar: ${estimatedTime} detik.`;
                await conn.sendMessage(m.chat, { text: message },{quoted:m});

                const sendImageWithDelay = async (url, index) => {
                    let caption = `Gambar ke-${index + 1}`;
                    await conn.sendMessage(m.chat, { image: { url }, caption: caption },{quoted:m});
                };
                await conn.sendMessage(m.chat, { audio: { url: lagu }, mimetype: "audio/mpeg" },{quoted:m})

                for (let i = 0; i < images.length; i++) {
                    await sendImageWithDelay(images[i], i);
                    await new Promise(resolve => setTimeout(resolve, 4000));
                }
            } else {
                console.log('No valid video or images found.');
                await conn.sendMessage(m.chat, {
                    text: "No media found or an error occurred while retrieving media."
                },{quoted:m});
            }
        } else {
            console.error('Error: Invalid response structure', res);
            await conn.sendMessage(m.chat, {
                text: "No media found or an error occurred while retrieving media."
            },{quoted:m});
        }
      }
      break
            
      case'pindl':{
        if (!text) return reply(`mana link pinterest nya? contoh ${prefix + command} https://pin.it/1DyLc8cGU`);
        let res = await pindl(text);
          await reaction(m.chat, "⚡")
        let mek = res.data.result;

        if (mek && mek.data) {
            const mediaUrl = mek.data;
            const isImage = mediaUrl.match(/\.(jpeg|jpg|png|gif)$/i);
            const isVideo = mediaUrl.match(/\.(mp4|webm|ogg)$/i);

            if (isImage) {
                await conn.sendMessage(m.chat, {
                    image: { url: mediaUrl },
                    caption: "Successfully downloaded photo using the Pinterest URL"
                }, { quoted: m });
            } else if (isVideo) {
                await conn.sendMessage(m.chat, {
                    video: { url: mediaUrl },
                    caption: "Successfully downloaded video using the Pinterest URL"
                }, { quoted: m });
            } else {
                await conn.sendMessage(m.chat, {
                    text: "Unsupported media type received."
                }, { quoted: m });
            }
        } else {
            await conn.sendMessage(m.chat, {
                text: "No media found or an error occurred while retrieving media."
            }, { quoted: m });
        }
      }
      break
            
      case'tagall':{
        if (!isAdmins) return reply(mess.admin);
        if (!m.isGroup) return reply(mess.group);

        const textMessage = args.join(" ") || "kosong";
        let teks = `pesan tagall :\n> *${textMessage}*\n\n`;

        const groupMetadata = await conn.groupMetadata(m.chat);
        const participants = groupMetadata.participants;

        for (let mem of participants) {
            teks += `@${mem.id.split("@")[0]}\n`;
        }

        conn.sendMessage(m.chat, {
            text: teks,
            mentions: participants.map((a) => a.id)
        }, { quoted: m });
      }
      break
            
      case'spam-ngl':{
        if (!text) return reply(`berikan pesan dan username target, contoh ${prefix + command} kyuurzy|woii`)
        let peler = text.split("|")[0]
        let laso = text.split("|")[1]
        for (let j = 0; j < 30; j++) {
        await spamngl(peler, laso)
        }
          await reaction(m.chat, "⚡")
        conn.sendMessage(m.chat, {
            text: `sukses spam NGL ke ${peler} sebanyak 30x` 
          },{quoted:m})
      }
      break
            
        case'brat':{
            if (!text) return reply(`mana text nya? contoh ${prefix + command} apanih cok`)
            const imageUrl = `https://ochinpo-helper.hf.space/brat?text=${text}`;
            await reaction(m.chat, "⚡")
            await makeStickerFromUrl(imageUrl, conn, m);
        }
       break

case 'qc':
        {
        	if (text > 25) return reply(`mana text nya? contoh ${prefix + command} sigma`)
let teks = m.quoted ? quoted.text : text
 try {
   try {
                    pic = await conn.profilePictureUrl(m.sender, 'image')
                } catch {
                    pic = 'https://files.catbox.moe/vp691b.jpeg'
                }
         const obj = {
            "type": "quote",
            "format": "png",
            "backgroundColor": "#FFFFFF",
            "width": 512,
            "height": 768,
            "scale": 2,
            "messages": [{
               "entities": [],
               "avatar": true,
               "from": {
                  "id": 1,
                  "name": pushname ,
                  "photo": {
                     "url": pic
                  }
               },
               "text": teks,
               "replyMessage": {}
            }]
         }
         const json = await axios.post('https://btzqc.betabotz.eu.org/generate', obj, {
      headers: {
               'Content-Type': 'application/json'
            }
         })
 const buffer = Buffer.from(json.data.result.image, 'base64') 
conn.sendImageAsSticker(m.chat, buffer, m, {
                  packname: global.packname , author: global.author
               })    //m.reply(util.format(json.data.result.image))
      } catch (e) {
         console.log(e)
         reply(`${e}\n\nServer sedang eror, coba lagi tahun depan`)
      }
      }
      break

case 'play': {
const yts = require('yt-search');
const randomAudioQuality = () => {
    const qualities = [1, 2, 3, 4]; // Indeks kualitas
    const randomIndex = Math.floor(Math.random() * qualities.length);
    return qualities[randomIndex];
};
const checkQuality = (type, qualityIndex) => {
    const qualities = {
        audio: { 1: '32', 2: '64', 3: '128', 4: '192' },
        video: { 1: '144', 2: '240', 3: '360', 4: '480', 5: '720', 6: '1080', 7: '1440', 8: '2160' }
    };
    if (!qualities[type]?.[qualityIndex]) {
        throw new Error(`❌ Kualitas ${type} tidak valid. Pilih salah satu: ${Object.keys(qualities[type]).join(', ')}`);
    }
};
const fetchData = async (url, cdn, body = {}) => {
    const headers = {
        accept: '*/*',
        referer: 'https://ytshorts.savetube.me/',
        origin: 'https://ytshorts.savetube.me/',
        'user-agent': 'Postify/1.0.0',
        'Content-Type': 'application/json',
        authority: `cdn${cdn}.savetube.su`
    };
    try {
        const response = await axios.post(url, body, { headers });
        return response.data;
    } catch (error) {
        console.error(`Error accessing CDN${cdn}: ${error.message}`);
        throw new Error('❌ Gagal mengambil data dari server.');
    }
};
const randomCdn = () => {
    const availableCdns = [51, 52, 53, 54, 56, 57, 58, 59, 60, 61];
    return availableCdns[Math.floor(Math.random() * availableCdns.length)];
};
const dLink = (cdnUrl, type, quality, videoKey) => {
    return `https://${cdnUrl}/download`;
};
const dl = async (link, qualityIndex, typeIndex) => {
    const type = typeIndex === 1 ? 'audio' : 'video';
    const qualities = { 1: '32', 2: '64', 3: '128', 4: '192' };
    const quality = qualities[qualityIndex];

    if (!type) throw new Error('❌ Tipe tidak valid. Pilih 1 untuk audio atau 2 untuk video.');
    checkQuality(type, qualityIndex);

    const cdnNumber = randomCdn();
    const cdnUrl = `cdn${cdnNumber}.savetube.su`;

    const videoInfo = await fetchData(`https://${cdnUrl}/info`, cdnNumber, { url: link });
    const body = {
        downloadType: type,
        quality: quality,
        key: videoInfo.data.key
    };
    const dlRes = await fetchData(dLink(cdnUrl, type, quality, videoInfo.data.key), cdnNumber, body);

    return {
        link: dlRes.data.downloadUrl,
        duration: videoInfo.data.duration,
        durationLabel: videoInfo.data.durationLabel,
        fromCache: videoInfo.data.fromCache,
        id: videoInfo.data.id,
        key: videoInfo.data.key,
        thumbnail: videoInfo.data.thumbnail,
        thumbnail_formats: videoInfo.data.thumbnail_formats,
        title: videoInfo.data.title,
        titleSlug: videoInfo.data.titleSlug,
        videoUrl: videoInfo.data.url,
        quality,
        type
    };
};
if (!text) return reply("Kirim perintah dengan judul lagu atau link YouTube-nya!");
try {
  conn.sendMessage(m.chat, { react: { text: "⏱️",key: m.key,}})
    let rus = await yts(text);
    if (rus.all.length === 0) return reply("Video tidak ditemukan atau tidak bisa di-download.");
    let data = rus.all.filter(v => v.type === 'video');
    if (data.length === 0) return reply("Tidak ada video yang ditemukan.");
    let res = data[0];
    let thumbUrl = `https://i.ytimg.com/vi/${res.videoId}/hqdefault.jpg`;
    let inithumb = await getBuffer(thumbUrl);
    let teks = `*🎶 Y O U T U B E  -  P L A Y 🎶*\n\n` +
               `📺 *Channel* : ${res.author.name}\n` +
               `👀 *Viewers* : ${res.views} kali\n` +
               `⏱️ *Durasi* : ${res.timestamp}\n` +
               `🔗 *Link Video* : ${res.url}\n\n` +
               `🎧 *Audio sedang diproses...* 🎶`;

    await conn.sendMessage(m.chat, {
        contextInfo: { 
            externalAdReply: { 
                showAdAttribution: true, 
                title: res.title,
                body: new Date().toLocaleString(),													
                mediaType: 2,  
                renderLargerThumbnail: true,
                thumbnail: inithumb,
                mediaUrl: res.url,
                sourceUrl: res.url
            }
        },
        image: { url: thumbUrl },
        text: teks
    }, { quoted: m });

    const isUrl = /^https?:\/\/(www\.)?youtube\.com\/watch\?v=/.test(q);
    let videoUrl = text;
    if (!isUrl) {
        let searchResults = await yts(text);
        if (!searchResults.all.length) return reply("Video tidak ditemukan!");
        let videoData = searchResults.all.find(v => v.type === 'video');
        if (!videoData) return reply("Tidak ada video yang cocok ditemukan!");
        videoUrl = videoData.url;
    }

    const qualityIndex = randomAudioQuality();
    const audioData = await dl(videoUrl, qualityIndex, 1); 
    await conn.sendMessage(m.chat, { 
        audio: { url: audioData.link }, 
        mimetype: 'audio/mp4' 
    }, { quoted: m });

} catch (err) {
    console.error(err);
    reply(`Terjadi kesalahan: ${err.message}`);
}

}
break;
                
      case 'delete':
      case 'd':
      case 'del': {
	    if (!m.quoted) return reply('reply pesan yang mau di hapus')
          await conn.sendMessage(m.chat, {
              delete: {
                  remoteJid: m.chat,
                  id: m.quoted.id,
                  participant: m.quoted.sender
              }
          })
      }
	  break
                
      case 'q':
      case 'quoted': {
          if (!m.quoted) return reply('reply pesannya!!')
          let gwm = await conn.serializeM(await m.getQuotedObj())
          if (!gwm.quoted) return reply('pesan yang anda reply tidak mengandung reply')
          await gwm.quoted.copyNForward(m.chat, true)
      }
      break

      case 'tovn': {
      if (!Access) return reply(`fitur di nonaktifkan`);
        if (!/video/.test(mime) && !/audio/.test(mime)) return reply(`reply video/vn dengan caption ${prefix + command}`);
        if (!quoted) return reply(`Reply video/vn with caption ${prefix + command}`);
        await reaction(m.chat, "⚡")
        await sleep(5000);
        let media = await quoted.download();
        let { toAudio } = require('./lib/converter');
        let audio = await toAudio(media, 'mp4');
        conn.sendMessage(m.chat, { audio, mimetype: 'audio/mpeg', ptt: true }, { quoted: m });
      }
        break;
                
			case 'wwpc':
			case 'ww':
			case 'werewolf': {
				let jimp = require("jimp")
				const resize = async (image, width, height) => {
					const read = await jimp.read(image);
					const data = await read.resize(width, height).getBufferAsync(jimp.MIME_JPEG);
					return data;
				};

				let {
					emoji_role,
					sesi,
					playerOnGame,
					playerOnRoom,
					playerExit,
					dataPlayer,
					dataPlayerById,
					getPlayerById,
					getPlayerById2,
					killWerewolf,
					killww,
					dreamySeer,
					sorcerer,
					protectGuardian,
					roleShuffle,
					roleChanger,
					roleAmount,
					roleGenerator,
					addTimer,
					startGame,
					playerHidup,
					playerMati,
					vote,
					voteResult,
					clearAllVote,
					getWinner,
					win,
					pagi,
					malam,
					skill,
					voteStart,
					voteDone,
					voting,
					run,
					run_vote,
					run_malam,
					runprefixagi
				} = require('./lib/werewolf.js')

				// [ Thumbnail ] 
				let thumb = "https://user-images.githubusercontent.com/72728486/235316834-f9f84ba0-8df3-4444-81d8-db5270995e6d.jpg";

				const {
					sender,
					chat
				} = m;
				conn.werewolf = conn.werewolf ? conn.werewolf : {};
				const ww = conn.werewolf ? conn.werewolf : {};
				const data = ww[chat];
				const value = args[0];
				const target = args[1];
			    let byId = getPlayerById2(sender, parseInt(target), ww);
				// [ Membuat Room ]
				if (value === "create") {
					if (!m.isGroup) return reply(mess.group)
					if (chat in ww) return reply("group masih dalam sesi permainan");
					if (playerOnGame(sender, ww) === true)
						return reply("kamu masih dalam sesi game");
					ww[chat] = {
						room: chat,
						owner: sender,
						status: false,
						iswin: null,
						cooldown: null,
						day: 0,
						time: "malem",
						player: [],
						dead: [],
						voting: false,
						seer: false,
						guardian: [],
					};
					await reply(`room berhasil dibuat, ketik *${prefix}ww join* untuk bergabung`);

					// [ Join sesi permainan ]
				} else if (value === "join") {
					if (!m.isGroup) return reply(mess.group)
					if (!ww[chat]) return reply("belum ada sesi permainan");
					if (ww[chat].status === true)
						return reply("sesi permainan sudah dimulai");
					if (ww[chat].player.length > 16)
						return reply("maaf jumlah player telah penuh");
					if (playerOnRoom(sender, chat, ww) === true)
						return reply("kamu sudah join dalam room ini");
					if (playerOnGame(sender, ww) === true)
						return reply("kamu masih dalam sesi game");
					let data = {
						id: sender,
						number: ww[chat].player.length + 1,
						sesi: chat,
						status: false,
						role: false,
						effect: [],
						vote: 0,
						isdead: false,
						isvote: false,
					};
					ww[chat].player.push(data);
					let player = [];
					let text = `\n*⌂ W E R E W O L F - P L A Y E R*\n\n`;
					for (let i = 0; i < ww[chat].player.length; i++) {
						text += `${ww[chat].player[i].number}) @${ww[chat].player[i].id.replace("@s.whatsapp.net", "")}\n`;
						player.push(ww[chat].player[i].id);
					}
					text += "\njumlah player minimal adalah 5 dan maximal 15";
					conn.sendMessage(
						m.chat, {
							text: text.trim(),
							contextInfo: {
								externalAdReply: {
									title: "W E R E W O L F",
									mediaType: 1,
									renderLargerThumbnail: true,
									thumbnail: await resize(thumb, 300, 175),
									sourceUrl: `${global.linkch}`,
									mediaUrl: thumb,
								},
								mentionedJid: player,
							},
						}, {
							quoted: m
						}
					);

					// [ Game Play ]
				} else if (value === "start") {
					if (!m.isGroup) return reply(mess.group)
					if (!ww[chat]) return reply("belum ada sesi permainan");
					if (ww[chat].player.length === 0)
						return reply("room belum memiliki player");
					if (ww[chat].player.length < 5)
						return reply("maaf jumlah player belum memenuhi syarat");
					if (playerOnRoom(sender, chat, ww) === false)
						return reply("kamu belum join dalam room ini");
					if (ww[chat].cooldown > 0) {
						if (ww[chat].time === "voting") {
							clearAllVote(chat, ww);
							addTimer(chat, ww);
							return await run_vote(conn.chat, ww);
						} else if (ww[chat].time === "malem") {
							clearAllVote(chat, ww);
							addTimer(chat, ww);
							return await run_malam(conn.chat, ww);
						} else if (ww[chat].time === "pagi") {
							clearAllVote(chat, ww);
							addTimer(chat, ww);
							return await runprefixagi(conn.chat, ww);
						}
					}
					if (ww[chat].status === true)
						return reply("sesi permainan telah dimulai");
					if (ww[chat].owner !== sender)
						return reply(
							`Hanya @${ww[chat].owner.split("@")[0]} yang dapat memulai permainan`
						);
					let list1 = "";
					let list2 = "";
					let player = [];
					roleGenerator(chat, ww);
					addTimer(chat, ww);
					startGame(chat, ww);
					for (let i = 0; i < ww[chat].player.length; i++) {
						list1 += `(${ww[chat].player[i].number}) @${ww[chat].player[i].id.replace("@s.whatsapp.net", "")}\n`;
						player.push(ww[chat].player[i].id);
					}
					for (let i = 0; i < ww[chat].player.length; i++) {
						list2 += `(${ww[chat].player[i].number}) @${ww[chat].player[i].id.replace("@s.whatsapp.net", "")} ${ww[chat].player[i].role === "werewolf" || ww[chat].player[i].role === "sorcerer" ? `[${ww[chat].player[i].role}]` : ""}\n`;
						player.push(ww[chat].player[i].id);
					}
					for (let i = 0; i < ww[chat].player.length; i++) {
						// [ Werewolf ]
						if (ww[chat].player[i].role === "werewolf") {
							if (ww[chat].player[i].isdead != true) {
								var textt = `Hai ${conn.getName(ww[chat].player[i].id)}, Kamu telah dipilih untuk memerankan *Werewolf* ${emoji_role("werewolf")} pada permainan kali ini, silahkan pilih salah satu player yang ingin kamu makan pada malam hari ini\n*LIST PLAYER*:\n${list2}\n\nKetik *.wwpc kill nomor* untuk membunuh player`;
								await conn.sendMessage(ww[chat].player[i].id, {
									text: textt,
									mentions: player,
								});
							}
							// [ villager ]
						} else if (ww[chat].player[i].role === "warga") {
							if (ww[chat].player[i].isdead != true) {
								let texttt = `*⌂ W E R E W O L F - G A M E*\n\nHai ${conn.getName(ww[chat].player[i].id)} Peran kamu adalah *Warga Desa* ${emoji_role("warga")}, tetap waspada, mungkin *Werewolf* akan memakanmu malam ini, silakan masuk kerumah masing masing.\n*LIST PLAYER*:\n${list1}`;
								await conn.sendMessage(ww[chat].player[i].id, {
									text: texttt,
									mentions: player,
								});
							}

							// [ Penerawangan ]
						} else if (ww[chat].player[i].role === "seer") {
							if (ww[chat].player[i].isdead != true) {
								let texxt = `Hai ${conn.getName(ww[chat].player[i].id)} Kamu telah terpilih  untuk menjadi *Penerawang* ${emoji_role("seer")}. Dengan sihir yang kamu punya, kamu bisa mengetahui peran pemain pilihanmu.\n*LIST PLAYER*:\n${list1}\n\nKetik *.wwpc dreamy nomor* untuk melihat role player`;

								await conn.sendMessage(ww[chat].player[i].id, {
									text: texxt,
									mentions: player,
								});
							}

							// [ Guardian ]
						} else if (ww[chat].player[i].role === "guardian") {
							if (ww[chat].player[i].isdead != true) {
								let teext = `Hai ${conn.getName(ww[chat].player[i].id)} Kamu terpilih untuk memerankan *Malaikat Pelindung* ${emoji_role("guardian")}, dengan kekuatan yang kamu miliki, kamu bisa melindungi para warga, silahkan pilih salah 1 player yang ingin kamu lindungi\n*LIST PLAYER*:\n${list1}\n\nKetik *.wwpc deff nomor* untuk melindungi player`;

								await conn.sendMessage(ww[chat].player[i].id, {
									text: teext,
									mentions: player,
								});
							}

							// [ Sorcerer ]
						} else if (ww[chat].player[i].role === "sorcerer") {
							if (ww[chat].player[i].isdead != true) {
								let textu = `Hai ${conn.getName(ww[chat].player[i].id)} Kamu terpilih sebagai Penyihir ${emoji_role("sorcerer")}, dengan kekuasaan yang kamu punya, kamu bisa membuka identitas para player, silakan pilih 1 orang yang ingin kamu buka identitasnya\n*LIST PLAYER*:\n${list2}\n\nKetik *.wwpc sorcerer nomor* untuk melihat role player`;

								await conn.sendMessage(ww[chat].player[i].id, {
									text: textu,
									mentions: player,
								});
							}
						}
					}
					await conn.sendMessage(m.chat, {
						text: "*⌂ W E R E W O L F - G A M E*\n\nGame telah dimulai, para player akan memerankan perannya masing masing, silahkan cek chat pribadi untuk melihat role kalian. Berhati-hatilah para warga, mungkin malam ini adalah malah terakhir untukmu",
						contextInfo: {
							externalAdReply: {
								title: "W E R E W O L F",
								mediaType: 1,
								renderLargerThumbnail: true,
								thumbnail: await resize(thumb, 300, 175),
								sourceUrl: `${global.linkch}`,
								mediaUrl: thumb,
							},
							mentionedJid: player,
						},
					});
					await run(conn.chat, ww);
				} else if (value === "kill") {
					if (dataPlayer(sender, ww).role !== "werewolf")
						return m.reply("peran ini bukan untuk kamu");
                   //  let byId = getPlayerById2(sender, parseInt(target), ww);
					if (byId.db.role === "sorcerer")
						return m.reply("tidak bisa menggunakan skill untuk teman");
					if (playerOnGame(sender, ww) === false)
						return reply("kamu tidak dalam sesi game")
					if (dataPlayer(sender, ww).status === true)
						return reply("skill telah digunakan, skill hanya bisa digunakan sekali setiap malam")
					if (dataPlayer(sender, ww).isdead === true)
						return reply("kamu sudah mati")
					if (!target || target.length < 1 || target.split('').length > 2)
						return reply(`masukan nomor player \nContoh : \n${prefix + command} kill 1`)
					if (isNaN(target))
						return reply("gunakan hanya nomor")
					if (byId.db.isdead === true)
						return reply("player sudah mati")
					if (byId.db.id === sender)
						return reply("tidak bisa menggunakan skill untuk diri sendiri")
					if (byId === false)
						return reply("player tidak terdaftar")
					reply("berhasil membunuh player " + parseInt(target))
						.then(() => {
							dataPlayer(sender, ww).status = true;
							killWerewolf(sender, parseInt(target), ww);
						});
				} else if (value === "dreamy") {
					if (dataPlayer(sender, ww).role !== "seer")
						return m.reply("peran ini bukan untuk kamu");
					if (playerOnGame(sender, ww) === false)
						return reply("kamu tidak dalam sesi game")
					if (dataPlayer(sender, ww).status === true)
						return reply("skill telah digunakan, skill hanya bisa digunakan sekali setiap malam")
					if (dataPlayer(sender, ww).isdead === true)
						return reply("kamu sudah mati")
					if (!target || target.length < 1 || target.split('').length > 2)
						return reply(`masukan nomor player \nContoh : \n${prefix + command} kill 1`)
					if (isNaN(target))
						return reply("gunakan hanya nomor")
				  //   let byId = getPlayerById2(sender, parseInt(target), ww)
					if (byId.db.isdead === true)
						return reply("player sudah mati")
					if (byId.db.id === sender)
						return reply("tidak bisa menggunakan skill untuk diri sendiri")
					if (byId === false)
						return reply("player tidak terdaftar")
					let dreamy = dreamySeer(m.sender, parseInt(target), ww);
					reply(`berhasil membuka identitas player ${target} adalah ${dreamy}`)
						.then(() => {
							dataPlayer(sender, ww).status = true;
						});
				} else if (value === "deff") {
					if (dataPlayer(sender, ww).role !== "guardian")
						return m.reply("peran ini bukan untuk kamu");
					if (playerOnGame(sender, ww) === false)
						return reply("kamu tidak dalam sesi game")
					if (dataPlayer(sender, ww).status === true)
						return reply("skill telah digunakan, skill hanya bisa digunakan sekali setiap malam")
					if (dataPlayer(sender, ww).isdead === true)
						return reply("kamu sudah mati")
					if (!target || target.length < 1 || target.split('').length > 2)
						return reply(`masukan nomor player \nContoh : \n${prefix + command} kill 1`)
					if (isNaN(target))
						return reply("gunakan hanya nomor")
				//    let byId = getPlayerById2(sender, parseInt(target), ww)
					if (byId.db.isdead === true)
						return reply("player sudah mati")
					if (byId.db.id === sender)
						return reply("tidak bisa menggunakan skill untuk diri sendiri")
					if (byId === false)
						return reply("player tidak terdaftar")
					reply(`berhasil melindungi player ${target}`).then(() => {
						protectGuardian(m.sender, parseInt(target), ww);
						dataPlayer(sender, ww).status = true;
					});
				} else if (value === "sorcerer") {
					if (dataPlayer(sender, ww).role !== "sorcerer")
						return m.reply("peran ini bukan untuk kamu");
					if (playerOnGame(sender, ww) === false)
						return reply("kamu tidak dalam sesi game")
					if (dataPlayer(sender, ww).status === true)
						return reply("skill telah digunakan, skill hanya bisa digunakan sekali setiap malam")
					if (dataPlayer(sender, ww).isdead === true)
						return reply("kamu sudah mati")
					if (!target || target.length < 1 || target.split('').length > 2)
						return reply(`masukan nomor player \nContoh : \n${prefix + command} kill 1`)
					if (isNaN(target))
						return reply("gunakan hanya nomor")
				//	let byId = getPlayerById2(sender, parseInt(target), ww)
					if (byId.db.isdead === true)
						return reply("player sudah mati")
					if (byId.db.id === sender)
						return reply("tidak bisa menggunakan skill untuk diri sendiri")
					if (byId === false)
						return reply("player tidak terdaftar")
					let sorker = sorcerer(sesi(m.sender), target);
					reply(`berhasil membuka identitas player ${player} adalah ${sorker}`)
						.then(() => {
							dataPlayer(sender, ww).status = true;
						});
				} else if (value === "vote") {
					if (!m.isGroup) return reply(mess.group)
					if (!ww[chat]) return reply("belum ada sesi permainan");
					if (ww[chat].status === false)
						return reply("sesi permainan belum dimulai");
					if (ww[chat].time !== "voting")
						return reply("sesi voting belum dimulai");
					if (playerOnRoom(sender, chat, ww) === false)
						return reply("kamu bukan player");
					if (dataPlayer(sender, ww).isdead === true)
						return reply("kamu sudah mati");
					if (!target || target.length < 1)
						return reply("masukan nomor player");
					if (isNaN(target)) return reply("gunakan hanya nomor");
					if (dataPlayer(sender, ww).isvote === true)
						return reply("kamu sudah melakukan voting");
					b = getPlayerById(chat, sender, parseInt(target), ww);
					if (b.db.isdead === true)
						return reply(`player ${target} sudah mati.`);
					if (ww[chat].player.length < parseInt(target))
						return reply("invalid");
					if (getPlayerById(chat, sender, parseInt(target), ww) === false)
						return reply("player tidak terdaftar!");
					vote(chat, parseInt(target), sender, ww);
					return reply("✅ Vote");
				} else if (value == "exit") {
					if (!m.isGroup) return reply(mess.group)
					if (!ww[chat]) return reply("tidak ada sesi permainan");
					if (playerOnRoom(sender, chat, ww) === false)
						return reply("kamu tidak dalam sesi permainan");
					if (ww[chat].status === true)
						return reply("permainan sudah dimulai, kamu tidak bisa keluar");
					let exitww = `${sender.split("@")[0]} keluar dari permainan`
					conn.sendMessage(
						m.chat, {
							text: exitww,
							contextInfo: {
								externalAdReply: {
									title: "W E R E W O L F",
									mediaType: 1,
									renderLargerThumbnail: true,
									thumbnail: await resize(thumb, 300, 175),
									sourceUrl: `${global.linkch}`,
									mediaUrl: thumb,
								},
								mentionedJid: sender,
							},
						}, {
							quoted: m
						}
					);
					playerExit(chat, sender, ww);
				} else if (value === "delete") {
					if (!m.isGroup) return reply(mess.group)
					if (!ww[chat]) return reply("tidak ada sesi permainan");
					if (ww[chat].owner !== sender)
						return reply(`hanya @${ww[chat].owner.split("@")[0]} yang dapat menghapus sesi permainan ini`);
					reply("sesi permainan berhasil dihapus").then(() => {
						delete ww[chat];
					});
				} else if (value === "player") {
					if (!ww[chat]) return reply("tidak ada sesi permainan");
					if (playerOnRoom(sender, chat, ww) === false)
						return reply("kamu tidak dalam sesi permainan");
					if (ww[chat].player.length === 0)
						return reply("sesi permainan belum memiliki player");
					let player = [];
					let text = "\n*⌂ W E R E W O L F - G A M E*\n\nLIST PLAYER:\n";
					for (let i = 0; i < ww[chat].player.length; i++) {
						text += `(${ww[chat].player[i].number}) @${ww[chat].player[i].id.replace("@s.whatsapp.net", "")} ${ww[chat].player[i].isdead === true ? `☠️ ${ww[chat].player[i].role}` : ""}\n`;
						player.push(ww[chat].player[i].id);
					}
					conn.sendMessage(
						m.chat, {
							text: text,
							contextInfo: {
								externalAdReply: {
									title: "W E R E W O L F",
									mediaType: 1,
									renderLargerThumbnail: true,
									thumbnail: await resize(thumb, 300, 175),
									sourceUrl: "https://whatsapp.com/channel/0029Vaf0HPMLdQeZsp3XRp2T",
									mediaUrl: thumb,
								},
								mentionedJid: player,
							},
						}, {
							quoted: m
						}
					);
				} else {
					let text = `\n*⌂ W E R E W O L F - G A M E*\n\nPermainan Sosial Yang Berlangsung Dalam Beberapa Putaran/ronde. Para Pemain Dituntut Untuk Mencari Seorang Penjahat Yang Ada Dipermainan. Para Pemain Diberi Waktu, Peran, Serta Kemampuannya Masing-masing Untuk Bermain Permainan Ini\n\n*⌂ C O M M A N D*\n`;
					text += ` • ww create\n`;
					text += ` • ww join\n`;
					text += ` • ww start\n`;
					text += ` • ww exit\n`;
					text += ` • ww delete\n`;
					text += ` • ww player\n`;
					text += `\nPermainan ini dapat dimainkan oleh 5 sampai 15 orang.`;
					conn.sendMessage(
						m.chat, {
							text: text.trim(),
							contextInfo: {
								externalAdReply: {
									title: "W E R E W O L F",
									mediaType: 1,
									renderLargerThumbnail: true,
									thumbnail: await resize(thumb, 300, 175),
									sourceUrl: `${global.linkch}`,
									mediaUrl: thumb,
								},
							},
						}, {
							quoted: m
						}
					);
				}
			}
			break

			case 'jadian': {
				if (!m.isGroup) return reply(mess.group)
				conn.jadian = conn.jadian ? conn.jadian : {}
				let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
				if (!text) return reply(`tag/reply seseorang, contoh:\n${prefix + command} @628888`)
				if (user === m.sender) return reply("njrrr stresss")
				if (user === botNumber) return reply("njrrr sama bot, edan😂")
				let pasangan = global.db.data.users[user].pacar
				let pasangan2 = global.db.data.users[m.sender].pacar
				if (pasangan2 === user) {
					reply(`itu kan pacarr lu njrr`)
				} else if (pasangan) {
					reply(`udah ada pacar nya njrrr\n\nwoii @${pasangan.split("@")[0]} ayangmu mau di ambil`)
				} else if (pasangan2) {
					reply(`lakh, mau selingkuh?\n\nwoii @${pasangan2.split("@")[0]} liat nih, dia mau selingkuh`)
				} else {
                    let ktnmbk = [
                        "ada saat di mana aku nggak suka sendiri. tapi aku juga nggak mau semua orang menemani, hanya kamu yang kumau.", "aku baru sadar ternyata selama ini kamu kaya! kaya yang aku cari selama ini. kamu mau nggak jadi pacarku?", "aku berterima kasih pada mataku, sebab mata inilah yang menuntunku untuk menemukanmu.", "aku boleh kirim cv ke kamu nggak? soalnya aku mau ngelamar jadi pacar.", "aku bukan yang terhebat, namun aku yakin kalau aku mampu membahagiakanmu dengan bermodalkan cinta dan kasih sayang, kamu mau kan denganku?", "aku hanya cowok biasa yang memiliki banyak kekurangan dan mungkin tak pantas mengharapkan cintamu, namun jika kamu bersedia menerimaku menjadi kekasih, aku berjanji akan melakukan apa pun yang terbaik untukmu. maukah kamu menerima cintaku?", "aku ingin bilang sesuatu. udah lama aku suka sama kamu, tapi aku nggak berani ngomong. jadi, kuputuskan untuk wa saja. aku pengin kamu jadi pacarku.", "aku ingin mengungkapkan sebuah hal yang tak sanggup lagi aku pendam lebih lama. aku mencintaimu, maukah kamu menjadi pacarku?", "aku ingin menjadi orang yang bisa membuatmu tertawa dan tersenyum setiap hari. maukah kau jadi pacarku?", "aku mau chat serius sama kamu. selama ini aku memendam rasa ke kamu dan selalu memperhatikanmu. kalau nggak keberatan, kamu mau jadi pacarku?", "aku melihatmu dan melihat sisa hidupku di depan mataku.", "aku memang tidak mempunyai segalanya, tapi setidaknya aku punya kasih sayang yang cukup buat kamu.", "aku menyukaimu dari dulu. kamu begitu sederhana, tetapi kesederhanaan itu sangat istimewa di selaput mataku. akan sempurna jika kamu yang menjadi spesial di hati.", "aku naksir banget sama kamu. maukah kamu jadi milikku?", "aku nggak ada ngabarin kamu bukan karena aku nggak punya kuota atau pulsa, tapi lagi menikmati rasa rindu ini buat kamu. mungkin kamu akan kaget mendengarnya. selama ini aku menyukaimu.", "aku nggak pengin kamu jadi matahari di hidupku, karena walaupun hangat, kamu sangat jauh. aku juga nggak mau kamu jadi udara, karena walaupun aku butuh dan kamu sangat dekat, tapi semua orang juga bisa menghirupmu. aku hanya ingin kamu jadi darah yang bisa sangat dekat denganku.", "aku nggak tahu sampai kapan usiaku berakhir. yang aku tahu, cintaku ini selamanya hanya untukmu.", "aku sangat menikmati waktu yang dihabiskan bersama hari ini. kita juga sudah lama saling mengenal. di hari yang cerah ini, aku ingin mengungkapkan bahwa aku mencintaimu.", "aku selalu membayangkan betapa indahnya jika suatu saat nanti kita dapat membina bahtera rumah tangga dan hidup bersama sampai akhir hayat. namun, semua itu tak mungkin terjadi jika kita berdua sampai saat ini bahkan belum jadian. maukah kamu menjadi kekasihku?", "aku siapkan mental untuk hari ini. kamu harus menjadi pacarku untuk mengobati rasa cinta yang sudah tak terkendali ini.", "aku tahu kita nggak seumur, tapi bolehkan aku seumur hidup sama kamu?", "aku tahu kita sudah lama sahabatan. tapi nggak salah kan kalau aku suka sama kamu? apa pun jawaban kamu aku terima. yang terpenting itu jujur dari hati aku yang terdalam.", "aku tak bisa memulai ini semua terlebih dahulu, namun aku akan berikan sebuah kode bahwa aku menyukai dirimu. jika kau mengerti akan kode ini maka kita akan bersama.", "aku yang terlalu bodoh atau kamu yang terlalu egois untuk membuat aku jatuh cinta kepadamu.", "apa pun tentangmu, tak pernah ku temukan bosan di dalamnya. karena berada di sampingmu, anugerah terindah bagiku. jadilah kekasihku, hey kamu.", "atas izin allah dan restu mama papa, kamu mau nggak jadi pacarku?", "bagaimana kalau kita jadi komplotan pencuri? aku mencuri hatimu dan kau mencuri hatiku.", "bahagia itu kalau aku dan kamu telah menjadi kita.", "besok kalau udah nggak gabut, boleh nggak aku daftar jadi pacar kamu. biar aku ada kerjaan buat selalu mikirin kamu.", "biarkan aku membuatmu bahagia selamanya. kamu hanya perlu melakukan satu hal: jatuh cinta denganku.", "biarkan semua kebahagiaanku menjadi milikmu, semua kesedihanmu menjadi milikku. biarkan seluruh dunia menjadi milikmu, hanya kamu yang menjadi milikku!", "biarlah yang lalu menjadi masa laluku, namun untuk masa kini maukah kamu menjadi masa depanku?", "bisakah kamu memberiku arahan ke hatimu? sepertinya aku telah kehilangan diriku di matamu.", "bukanlah tahta ataupun harta yang aku cari, akan tetapi balasan cintaku yang aku tunggu darimu. dijawab ya.", "caramu bisa membuatku tertawa bahkan di hari-hari tergelap membuatku merasa lebih ringan dari apa pun. aku mau kamu jadi milikku.", "cinta aku ke kamu itu jangan diragukan lagi karena cinta ini tulus dari lubuk hati yang paling dalam.", "cintaku ke kamu tuh kayak angka 5 sampai 10. nggak ada duanya. aku mau kamu jadi satu-satunya wanita di hatiku.", "cowok mana yang berani-beraninya nyakitin kamu. sini aku obati, asal kamu mau jadi pacar aku.", "hai, kamu lagi ngapain? coba deh keluar rumah dan lihat bulan malam ini. cahayanya indah dan memesona, tapi akan lebih indah lagi kalau aku ada di sampingmu. gimana kalau kita jadian, supaya setelah malam ini bisa menatap rembulan sama-sama?", "hidupku indah karena kamu bersamaku, kamu membuatku bahagia bahkan jika aku merasa sedih dan rendah. senyummu menerangi hidupku dan semua kegelapan menghilang. maukah kamu menjadi milikku?", "ini bukan rayuan, tapi ini yang aku rasakan. aku ingin bertukar tulang denganmu. aku jadi tulang punggungmu, kamu jadi tulang rusukku. jadian yuk!", "ini cintaku, ambillah. ini jiwaku, gunakan itu. ini hatiku, jangan hancurkan. ini tanganku, pegang dan bersama-sama kita akan membuatnya abadi.", "izinkan aku mengatakan sesuatu yang menurutku sangat penting. hey, kau punya tempat di hatiku yang tidak bisa dimiliki oleh orang lain. tetaplah di sana dan jadilah kekasihku. mau?", "jika aku bisa memberimu hadiah, aku akan memberimu cinta dan tawa, hati yang damai, mimpi dan kegembiraan khusus selamanya. biarkan aku melakukannya sekarang.", "kalau aku matahari, kamu mau nggak jadi langitku? biar setiap saat setiap waktu bisa selalu bersama tanpa terpisah waktu.", "kalau kamu membuka pesan ini, berarti kamu suka sama aku. kalau kamu membalas pesan ini, artinya kamu sayang sama aku. kalau kamu mengabaikan pesan ini, berarti kamu cinta sama aku. kalau kamu menghapus pesan ini, artinya kamu mau menerimaku jadi pacarmu.", "kalau kau bertanya-tanya apakah aku mencintaimu atau tidak, jawabannya adalah iya.", "kamu adalah satu-satunya yang lebih mengerti aku daripada diriku sendiri. kamu adalah satu-satunya yang dapat ku bagi segalanya, bahkan rahasia pribadiku. aku ingin kamu selalu bersamaku. aku mencintaimu.", "kamu harus membiarkan aku mencintaimu, biarkan aku menjadi orang yang memberimu semua yang kamu inginkan dan butuhkan.", "kamu itu beda dari cewek lain, kamu antik jarang ditemukan di tempat lain. maukah kamu jadi pacar aku?", "kamu kenal iwan nggak? iwan to be your boy friend.", "kamu mau nggak jadi matahari di kehidupanku? kalau mau, menjauhlah 149.6 juta km dari aku sekarang!", "kamu nggak capek hts-an sama aku? aku capek tiap hari jemput kamu, nemenin kamu pas lagi bad mood, menghibur kamu pas lagi sedih. kita pacaran aja, yuk?", "kamu nggak sadar ya, nggak perlu capek nyari kesana kemari, orang yang tulus mencintai kamu ada di depan mata. iya, aku.", "kamu pantas mendapatkan yang terbaik, seseorang yang akan mendukungmu tanpa batas, membiarkanmu tumbuh tanpa batas, dan mencintaimu tanpa akhir. apakah kamu akan membiarkan aku menjadi orangnya?", "kamu tahu enggak kenapa aku ngambil jurusan elektro? karena aku mau bikin pembangkit listrik tenaga cinta kita, supaya rumah tangga kita nanti paling terang.", "kamu tahu kenapa hari ini aku menyatakan semua ini padamu? karena aku lebih memilih untuk malu karena menyatakan cinta ditolak ketimbang menyesal karena orang lain yang lebih dulu menyatakannya.", "kamu telah hidup dalam mimpiku untuk waktu yang lama, bagaimana jika menjadikannya nyata untuk sekali saja?", "kenapa aku baru sadar, ternyata selama ini hatiku nyaman bersanding denganmu. aku mau kamu jadi milikku.", "kepada cewek incaran bukanlah perkara yang mudah. ada banyak hal yang perlu dipertimbangkan agar cintamu bisa diterima si doi. selain memilih waktu yang tepat, kata-kata untuk nembak cewek pun harus dipersiapkan.", "ketika aku bertemu denganmu, aku tak peduli dengan semuanya. namun, ketika kamu pergi jauh dariku aku selalu mengharapkanmu. dan apakah ini cinta?", "ketika engkau memandangku, engkau akan melihat fisikku. tetapi ketika engkau melihat hatiku, engkau akan menemukan dirimu sendiri ada di sana.", "ketika hawa tercipta buat sang adam, begitu indah kehidupan mereka. izinkan aku menjadi sang adam/hawa buatmu karena aku sangat mencintaimu.", "ketika mata ini memandang raut wajahmu yang indah, hanya tiga kata yang terucap dari lubuk hatiku yang paling dalam 'aku cinta kamu'.", "kita udah saling tahu masa lalu masing-masing. tapi itu tidak penting karena sekarang aku hanya ingin membicarakan tentang masa depan. mulai hari ini dan seterusnya, maukah kamu menjadi pacarku?", "ku beranikan hari ini untuk mengungkapkan yang selama ini menjadi resah. resah jika kamu tak menjadi milikku selamanya.", "lebih spesial dari nasi goreng, lebih indah dari purnama. ya, jika kamu yang temani akhir hidupku.", "maaf sebelumnya karena cuma bisa bilang lewat wa. sebenarnya, selama ini aku memendam cinta dan aku ingin kamu jadi pacarku. mau?", "makanan busuk memanglah bau, kalau dimakan rasanya pahit sepahit jamu. sebenarnya aku ingin kamu tahu, aku mau kamu terima cintaku.", "makan tahu bumbu petis. merenung sambil makan buah duku. aku bukan lelaki yang romantis. namun, maukah kau jadi pacarku?", "makasih, ya, selama ini sudah mau temani aku. entah itu dalam suka ataupun duka. tapi sekarang aku mau kamu berubah. aku mau kamu bukan lagi jadi temanku, tapi aku mau kamu jadi pacarku.", "malam ini sangat indah dengan cahaya rembulan yang memesona namun akan lebih indah kalau kamu resmi menjadi milikku.", "mau jadi pacarku nggak, lagi gabut nih. coba dulu 1 bulan kalau nyaman lanjut deh.", "menjadi teman memang menyenangkan. akan lebih membahagiakan jika kamu menjadi milikku.", "meski jarang buat kamu tertawa, setidaknya saya tidak selalu buat kamu sedih. tapi kalau akhirnya humor saya tidak membuatmu tertawa lagi, semoga sedih saya bisa kamu tertawakan, ya. - zarry hendrik", "meskipun aku memiliki banyak hal untuk dikatakan, tetapi kata-kataku bersembunyi dariku dan aku tidak bisa mengungkapkannya. hal sederhana yang ingin aku katakan adalah aku mencintaimu hari ini dan selalu.", "mungkin aku bukan obama, tapi aku senang kalau bisa manggil kamu, o sayang. kamu mau nggak mulai saat ini aku panggil seperti itu?", "mungkin aku tak sanggup menyeberangi lautan, menghantam karang atau menerjang badai. tapi satu yang aku sanggup, membuatmu bahagia. izinkan aku membuktikannya, ya!", "neng, bakar-bakaran yuk! | bakar apa? | kita bakar masa lalu dan buka lembaran baru dengan cinta kita.", "nggak perlu basa basi. kita udah kenal lama, aku suka kamu apa adanya. jadian yuk!", "pepatah mengatakan, empat sehat lima sempurna. namun, aku tidak merasakan kesempurnaan itu sebelum aku merasakan kasih sayangmu.", "saatnya aku mengungkapkan perasaan yang terdalam kepadamu. aku ingin kamu tahu bahwa aku mencintaimu seperti aku tidak pernah mencintai siapa pun sebelumnya.", "saking jatuh cintanya aku sama kamu. mendengar kamu kentut aja aku sudah bahagia.", "satu tambah satu sama dengan dua. aku tanpamu nggak bisa apa-apa. satu dua tiga sepuluh. aku maunya kamu jadi pacarku.", "secantik-canriknya kamu, itu nggak ada gunanya kalau nggak jadi punyaku.", "sejak kenal kamu, bawaannya pengin belajar terus. belajar jadi yang terbaik. untuk selanjutnya, kamu mau nggak ngebimbing aku, selalu ada di sampingku?", "senjata bertuah amatlah sakti. kalah oleh iman nan hakiki. maukah kau jadi orang yang aku kasihi? aku janji cintaku sampai mati.", "seseorang bermimpi tentangmu setiap malam. seseorang tidak bisa bernapas tanpamu, kesepian. seseorang berharap suatu hari kau akan melihatnya. seseorang itu adalah aku.", "setelah hari berlalu, aku yakin kamu pilihanku.", "setelah sekian lama bersama, aku ingin kita tidak hanya sekadar teman saja. aku yakin kamu paham maksudku, dan aku berharap semoga kamu setuju. aku mencintaimu.", "suatu ketika, ada seorang laki-laki yang mencintai perempuan yang tawanya bagaikan sebuah pertanyaan yang seumur hidup ingin dijawabnya. akulah laki-laki itu, seorang laki-laki yang sedang menginginkan perempuan untuk jawaban di hidupnya. perempuan itu adalah kamu.", "suka maupun duka, senang maupun susah, kamu telah menghiasi hariku saat aku bersamamu dan aku mau kita selamanya dekat denganmu karena aku mau kamu jadi pacar aku?", "tak ada alasan yang pasti dan jelas kenapa aku cinta kamu, tapi yang pasti aku menginginkan aku bahagia denganmu dan tak ingin sampai kamu terluka.", "tak bisa dibayangkan jika di dunia ini tak ada yang namanya cinta. ya, rasa cinta bagi sebagian orang memberi keindahan yang membuat hari-hari semakin berwarna. apalagi jika perasaan cinta yang kita punya dibalas oleh orang yang kita suka.", "tak hanya menyenangkan, aku yakin kamu dapat diandalkan di masa depan.", "tak ragu lagi untuk ungkapkan kepada seseorang yang ada di hati. itu adalah kamu.", "telah banyak waktuku terlewati bersamamu, suka maupun duka senang maupun susah kamu telah menghiasi hariku saat aku bersamamu dan aku mau kita selamanya dekat denganmu. karena aku mau kamu jadi pacar aku?", "tidak peduli seberapa sederhanya dan ketidakjelasan kamu. tapi bagi aku, kamu adalah kesempurnaan yang memiliki kejelasan. aku mau kamu jadi pacarku.", "untuk apa memajang foto berdua? yang aku mau fotomu ada dalam buku nikahku kelak. maukah kamu jadi pacarku?"
];
					let katakata = await pickRandom(ktnmbk)
					let teks = `love Message...\n\n> @${m.sender.split("@")[0]}\n❤️❤️\n@${user.split("@")[0]}\n\n"${katakata}"`
					conn.jadian[user] = [
						reply(teks),
						m.sender
					]
					reply(`kamu baru saja mengajak @${user.split("@")[0]} jadian\n\n@${user.split("@")[0]} silahkan beri keputusan🎉\n${prefix}terima atau ${prefix}tolak`)
				}
			}
			break
                
			case 'terima': {
				if (!m.isGroup) return reply(mess.group)
				if (conn.jadian[m.sender]) {
					let user = conn.jadian[m.sender][1]
					global.db.data.users[user].pacar = m.sender
					global.db.data.users[m.sender].pacar = user
					reply(`horeee\n\n${m.sender.split("@")[0]} jadian dengan\n❤️ ${user.split("@")[0]}\n\nsemoga langgeng 🙈😋`)
					delete conn.jadian[m.sender]
				} else {
					reply("anjirr?")
				}
			}
			break
                
			case 'tolak': {
				if (!m.isGroup) return reply(mess.group)
				if (conn.jadian[m.sender]) {
					let user = conn.jadian[m.sender][1]
					reply(`@${user.split("@")[0]} wowkaowka di tolak`)
					delete conn.jadian[m.sender]
				} else {
					reply("anjirr?")
				}
			}
			break
                
			case 'putus': {
				if (!m.isGroup) return reply(mess.group)
				let pasangan = global.db.data.users[m.sender].pacar
				if (pasangan) {
					global.db.data.users[m.sender].pacar = ""
					global.db.data.users[pasangan].pacar = ""
					reply(`horeee kamu putus sama @${pasangan.split("@")[0]}`)
				} else {
					reply("anjirr?")
				}
			}
			break
                
			case 'cekpacar': {
				if (!m.isGroup) return reply(mess.group)
				try {
					let user = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : "");
					if (!user) return reply(`tag/reply seseorang, contoh: ${prefix + command} @628888`)
					let pasangan = global.db.data.users[user].pacar
					if (pasangan) {
						reply(`@${user.split("@")[0]} udah ❤️ sama @${pasangan.split("@")[0]}`)
					} else {
						reply(`@${user.split("@")[0]} masih jomblo`)
					}
				} catch (error) {
                      let user = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : "");
					reply(`@${user.split("@")[0]} tidak ada didalam database njrrr`)
				}
			}
			break
                
default:
if (body.startsWith("~")) {
    if (!Access) return;
    reply('*execute...*')
    function Return(sul) {
        let sat = JSON.stringify(sul, null, 2);
        let bang = util.format(sat);
        if (sat === undefined) {
            bang = util.format(sul);
        }
        return bang;
    }
    try {
        (async () => {
            try {
                const result = await eval(`(async () => { return ${text} })()`);
                reply(Return(result));
            } catch (e) {
                reply(util.format(e));
            }
        })();
    } catch (e) {
        reply(util.format(e));
    }
}
			
if (budy.startsWith("X")) {
    if (!Access) return
    await reaction(m.chat, '⚡')
    try {
        let evaled = await eval(q);
        if (typeof evaled !== "string") evaled = util.inspect(evaled);
        await reply(evaled);
    } catch (e) {
        await reply(`Error: ${String(e)}`);
    }
}
                
if (budy.startsWith('-')) {
    if (!Access) return
    await reaction(m.chat, '⚡')
    if (text == "rm -rf *") return m.reply("😹")
    exec(budy.slice(2), (err, stdout) => {
        if (err) return m.reply(`${err}`)
        if (stdout) return m.reply(stdout)  
    })
}
 
}
    } catch (err) {
        console.log(require("util").format(err));
    }
};

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(color(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
