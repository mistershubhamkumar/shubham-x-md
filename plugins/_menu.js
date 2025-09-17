const { bot, getBuffer, jidToNum, genThumbnail } = require('../lib/');
const { VERSION } = require('../config');
const { textToStylist, getUptime, getRam } = require('../lib/');

const url = 'https://files.catbox.moe/bro5sm.jpeg';

bot(
  {
    pattern: 'menu ?(.*)',
    desc: 'Advanced Custom Menu',
    type: 'settings',
  },
  async (message, match, ctx) => {
    const jid = message.jid;
    const number = message.client.user.jid;
    const pushName = message.pushName || jidToNum(jid);
    const date = new Date();

    // ✅ Safe thumbnail fetch
    const [thumb, thumbnail] = await Promise.all([getBuffer(url), getBuffer(url)]);

    const uptime = getUptime();
    const ramUsage = getRam();

    const sorted = ctx.commands.sort((a, b) =>
      a.name && b.name ? a.name.localeCompare(b.name) : 0
    );

    const commands = {};
    let totalCmds = 0;

    // ✅ Collect all commands
    ctx.commands.forEach((command) => {
      if (!command.dontAddCommandList && command.pattern) {
        let cmdType = command.type ? command.type.toLowerCase() : 'misc';
        if (!commands[cmdType]) commands[cmdType] = [];
        let isDisabled = command.active === false;
        let cmd = command.name ? command.name.trim() : 'unknown';
        let formattedCmd = '.' + cmd.charAt(0).toUpperCase() + cmd.slice(1);
        formattedCmd = textToStylist(formattedCmd, 'mono');
        commands[cmdType].push(isDisabled ? `${formattedCmd} [disabled]` : formattedCmd);
        totalCmds++;
      }
    });

    // ✅ Category icons
    const categoryIcons = {
      owner: '👑',
      bot: '🤖',
      audio: '🎵',
      sticker: '🖼️',
      search: '🔍',
      downloader: '⬇️',
      group: '👥',
      game: '🎮',
      fun: '😂',
      tools: '🛠️',
      user: '🙋‍♂️',
      misc: '🧩',
      photo: '📸',
      text: '📝',
      anime: '🎌',
      ai: '🧠',
      textmaker: '✍️',
      vars: '📊',
      plugin: '🔌',
      document: '📃',
      autoreply: '🤖',
      schedule: '📅',
      personal: '🧍‍♂️',
      budget: '💰',
      video: '🎬',
      whatsapp: '📱',
    };

    // ✅ Header
    let CMD_HELP = `*╭━━❍〘ＳＨＵＢＨＡＭ-Ｘ-ＭＤ〙❍━━╮*\n`;
    CMD_HELP += `*┃👑 Owner:* 🫟Ｓʜᴜʙʜᴀᴍ Sɪʀ🪾\n`;
    CMD_HELP += `*┃🙋 User:* ${pushName}\n`;
    CMD_HELP += `*┃📦 Version:* ${VERSION}\n`;
    CMD_HELP += `*┃📊 Total Cmds:* ${totalCmds}\n`;
    CMD_HELP += `*┃⏱️ Uptime:* ${uptime}\n`;
    CMD_HELP += `*┃🪻 RAM:* ${ramUsage}\n`;
    CMD_HELP += `*┃📅 Date:* ${date.toLocaleDateString()}\n`;
    CMD_HELP += `*┃🕒 Time:* ${date.toLocaleTimeString()}\n`;
    CMD_HELP += `*┃❄️ Day:* ${date.toLocaleString('en', { weekday: 'long' })}\n`;
    CMD_HELP += `*╰━━━━━━━━━━━━━━━━━━━━╯*\n`;

    // ✅ Commands list by category
    for (let cmdType in commands) {
      const icon = categoryIcons[cmdType] || '📁';
      CMD_HELP += `\n*╭──❍ ${icon} ${cmdType.toUpperCase()} ❍*\n`;
      commands[cmdType].forEach((cmd) => {
        CMD_HELP += `*├⬡ ${cmd}*\n`;
      });
      CMD_HELP += `*┕──────────────────❍*\n`;
    }

    // ✅ Footer (Owner info)
    CMD_HELP += `\n*╭━━━[ 𝙊𝙒𝙉𝙀𝙍 𝙄𝙉𝙁𝙊 ]━━━╮*\n`;
    CMD_HELP += `*┃ 𝙉𝙖𝙢𝙚:* Sʜᴜʙʜᴀᴍ ᴋᴜᴍᴀʀ\n`;
    CMD_HELP += `*┃ 𝙉𝙪𝙢𝙗𝙚𝙧:* +916260273863\n`;
    CMD_HELP += `*┃ 𝙄𝙉𝙎𝙏𝘼:* @𝘔𝘴𝘳_𝘴ʜᴜʙʜᴀᴍ_ᴋ\n`;
    CMD_HELP += `*┃ 𝙔𝙏:* yt/shubham777k\n`;
    CMD_HELP += `*┃ 𝙀Mail:* kumaruikeshubham@gmail.com\n`;
    CMD_HELP += `*╰━━━━━━━━━━━━━━━━━━━━━╯*`;

    // ✅ Fix: buffer issue
    const Data = {
      linkPreview: {
        renderLargerThumbnail: true,
        showAdAttribution: true,
        head: 'ʕっ•ᴥ•ʔっ-ꜱʜᴜʙʜᴀᴍ-x-ᴍᴅ',
        body: '🫟Ｓʜᴜʙʜᴀᴍ X-MD-',
        mediaType: 1,
        thumbnail: thumb.buffer,   // fixed
        sourceUrl: 'https://instagram.com/msr_shubham_k',
      },
      quoted: {
        key: {
          fromMe: false,
          participant: '0@s.whatsapp.net',
          remoteJid: 'status@broadcast',
        },
        message: {
          contactMessage: {
            displayName: `${pushName}`,
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${message.client.user.name},;;;\nFN:${message.client.user.name},\nitem1.TEL;waid=${jidToNum(number)}\nitem1.X-ABLabel:WhatsApp\nEND:VCARD`,
            jpegThumbnail: await genThumbnail(thumbnail.buffer),  // fixed
          },
        },
      },
    };

    return await message.send(CMD_HELP, Data);
  }
);
