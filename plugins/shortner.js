const { bot, getJson } = require('../lib')

bot(
  {
    pattern: 'shortner ?(.*)',
    desc: 'Shorten a given URL',
    type: 'utility',
  },
  async (message, match) => {
    if (!match)
      return await message.send(
        '> *Example :*\n- .shortner https://mantrikaflow.blogspot.com\n- .shortner https://example.com'
      )

    const longUrl = match.trim()
    try {
      const shortUrl = await getJson(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`)
      await message.send(`✅ *Shortened URL:* ${shortUrl}`)
    } catch (error) {
      await message.send('❌ Error: Unable to shorten the link. Try again later.')
    }
  }
)
