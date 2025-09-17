const { Sequelize } = require('sequelize')
const { existsSync } = require('fs')
const path = require('path')
const configPath = path.join(__dirname, './config.env')
const databasePath = path.join(__dirname, './database.db')
if (existsSync(configPath)) require('dotenv').config({ path: configPath })
const toBool = (x) => x == 'true'
const DATABASE_URL =
  process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL
module.exports = {
  VERSION: require('./package.json').version,
  SESSION_ID: (process.env.SESSION_ID || '').trim(),
  DATABASE:
    DATABASE_URL === databasePath
      ? new Sequelize({
          dialect: 'sqlite',
          storage: DATABASE_URL,
          logging: false,
        })
      : new Sequelize(DATABASE_URL, {
          dialect: 'postgres',
          ssl: true,
          protocol: 'postgres',
          dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
          },
          logging: false,
        }),
  PREFIX: (process.env.PREFIX || '^[.,!]').trim(),
  SUDO: process.env.SUDO || '',
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
  HEROKU_API_KEY: process.env.HEROKU_API_KEY,
  BRANCH: 'master',
  STICKER_PACKNAME: process.env.STICKER_PACKNAME || '👑,SHUBHAM-X-MD',
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE,
  LOG_MSG: process.env.LOG_MSG || 'false',
  RMBG_KEY: process.env.RMBG_KEY || 'null',
  BAILEYS_LOG_LVL: process.env.BAILEYS_LOG_LVL || 'silent',
  LANG: (process.env.LANGUAG || 'en').toLowerCase(),
  WARN_LIMIT: process.env.WARN_LIMIT || 3,
  FORCE_LOGOUT: process.env.FORCE_LOGOUT || 'false',
  BRAINSHOP: process.env.BRAINSHOP || '159501,6pq8dPiYt7PdqHz3',
  DISABLE_BOT: process.env.DISABLE_BOT || 'null',
  ANTILINK_MSG: process.env.ANTILINK_MSG || '_Antilink Detected &mention kicked_',
  ANTISPAM_MSG: process.env.ANTISPAM_MSG || '_Antispam Detected &mention kicked_',
  ANTIWORDS_MSG: process.env.ANTIWORDS_MSG || '_AntiWord Detected &mention kicked_',
  ANTIWORDS: process.env.ANTIWORDS || 'badword',
  MENTION: process.env.MENTION || '',
  MAX_UPLOAD: process.env.MAX_UPLOAD || 230,
  REJECT_CALL: process.env.REJECT_CALL,
  VPS: toBool(process.env.VPS),
  AUTO_STATUS_VIEW: (process.env.AUTO_STATUS_VIEW || 'no-dl').trim(),
  STATUS_VIEW_EMOJI: (process.env.STATUS_VIEW_EMOJI || '🩷,🩵,💛'
  SEND_READ: process.env.SEND_READ,
  KOYEB: toBool(process.env.KOYEB),
  KOYEB_NAME: (process.env.KOYEB_NAME || '').trim(),
  KOYEB_API: (process.env.KOYEB_API || '').trim(),
  AJOIN: process.env.AJOIN || 'false',
  GPT: (process.env.GPT || 'free').trim(),
  MODEL: (process.env.MODEL || 'gpt-3.5-turbo').trim(),
  APPROVE: (process.env.APPROVE || '').trim(),
  ANTI_DELETE: (process.env.ANTI_DELETE || 'p').trim(),
  PERSONAL_MESSAGE: (process.env.PERSONAL_MESSAGE || '*My owner is busy, will reply when he will be online*').trim(),
  DISABLE_START_MESSAGE: process.env.DISABLE_START_MESSAGE || 'false',
  ANTI_BOT: (process.env.ANTI_BOT || 'off').trim(),
  ANTI_BOT_MESSAGE: process.env.ANTI_BOT_MESSAGE || '&mention removed',
  WARN_MESSAGE:
    process.env.WARN_MESSAGE ||
    '⚠️WARNING⚠️\n*User :* &mention\n*Warn :* &warn\n*Remaining :* &remaining',
  WARN_RESET_MESSAGE:
    process.env.WARN_RESET_MESSAGE || `WARN RESET\nUser : &mention\nRemaining : &remaining`,
  WARN_KICK_MESSAGE: process.env.WARN_KICK_MESSAGE || '&mention kicked',
  TRUECALLER: process.env.TRUECALLER,
  DELETE_TYPE: (process.env.DELETE_TYPE || 'all').trim(),
  LIST_TYPE: (process.env.LIST_TYPE || 'poll').trim(),
  BING_COOKIE: (process.env.BING_COOKIE || '').trim(),
  GEMINI_API_KEY: (process.env.GEMINI_API_KEY || '').trim(),
  GROUP_ADMINS: process.env.GROUP_ADMINS || '',
  RENDER_NAME: (process.env.RENDER_NAME || '').trim(),
  RENDER_API_KEY: (process.env.RENDER_API_KEY || '').trim(),
  TIMEZONE: process.env.TIMEZONE,
  CMD_REACTION: process.env.CMD_REACTION || 'true',
  AUTO_UPDATE: process.env.AUTO_UPDATE || 'true',
  WHITE_LIST: process.env.WHITE_LIST || '',
  BOT_LANG: process.env.BOT_LANG || 'english',
  YT_COOKIE: process.env.YT_COOKIE || 'VISITOR_PRIVACY_METADATA=CgJJThIEGgAgZw%3D%3D;__Secure-3PSID=g.a0000QhMVJKG1AobVlrDFlGA_2rIAkAqE4fLNAxknyd6wdcx5kI7PZYBHh1hLv1fbUBpIE12tQACgYKAfQSARISFQHGX2Mie05xst59tOcx4ITUKJBBsxoVAUF8yKriHgxkwZplgtZa2RKXPwU30076;GPS=1;SIDCC=AKEyXzWhUt4IvSZRuWALsIoRlI4fUkWgUcUGbxCklp4gZVWM7kNxeHWo88exm72N1eRk6Lyj;YSC=5h_9cvEfaCw;SID=g.a0000QhMVJKG1AobVlrDFlGA_2rIAkAqE4fLNAxknyd6wdcx5kI7j6kliDHHLOtmQoglwI-qSAACgYKAcASARISFQHGX2Mi8Ceky_WNCpeZhO2TWmOIhRoVAUF8yKqgpDf03tWOqNCs9o-ulRWI0076;__Secure-1PSIDTS=sidts-CjQB5H03P0RgffCfZOlTsuX2eb1ovUZRCK25hLK4RkmxLUFZsqvphNF0MqzoKTbs06JHLnMoEAA;SAPISID=h-XldJFlKFEReKqO/AGzzazbBmO7OeRGNE;__Secure-1PSIDCC=AKEyXzUie0yPzqpnHo2ycVGw96OhY4byAXruuqN_5jmbAz3rxyKclGDBeQ5OrdO--nB1ZTXNMg;SSID=AmdK2CsM0EPjx3rls;__Secure-1PAPISID=h-XldJFlKFEReKqO/AGzzazbBmO7OeRGNE;__Secure-1PSID=g.a0000QhMVJKG1AobVlrDFlGA_2rIAkAqE4fLNAxknyd6wdcx5kI74pYTugf7PJde1myjH_k8pwACgYKAW0SARISFQHGX2MihHzluZZ-LtW6drRH3GTVyRoVAUF8yKpKQSxTlwb0kbwesxnA3n6b0076;__Secure-3PAPISID=h-XldJFlKFEReKqO/AGzzazbBmO7OeRGNE;__Secure-3PSIDCC=AKEyXzWV4_Bxdqb9W7hiAqUK7Nf8KgD6rBifx6PApV652B3GivnxvZQRmKKA1Q8pkETaNVWr;__Secure-3PSIDTS=sidts-CjQB5H03P0RgffCfZOlTsuX2eb1ovUZRCK25hLK4RkmxLUFZsqvphNF0MqzoKTbs06JHLnMoEAA;APISID=4xMtx77UnXBwl0Cg/AJ5D1ReUYEb7sW35j;HSID=Ac4J_DMOvujxRWB-g;LOGIN_INFO=AFmmF2swRQIgDDKXiSHfmizsP4Qeyn0B16yl0_m-4iSdECiqTu8RBrACIQDyuqNFRzNKlaO9rSkSP030XXQDn9zUpgYNUU4a9k8SAw:QUQ3MjNmdzFNZkRmY2pKSkxwcDNsQ19VdXRiMlJRWVZsNTZUZTFoNDRRb1RzSnNsa0NMZkFOS3VGY3JnWFBXZzlyOFpfaWFPUUw1TkZGRjB2N09jT2d0elVzTl9kOEtFZEdHenNLSWo5M0xjUmJ2TV9qZV9yckIwMDRwUHdGSk5vMFlZWTg1WWFHQ1RtUk40V0Ytby1FWkpUdmxnQVZuTkZ3;PREF=f6=40000000&tz=Asia.Kolkata;VISITOR_INFO1_LIVE=0Bmh_RhoM7o'
}
