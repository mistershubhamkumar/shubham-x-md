const axios = require('axios');
const cheerio = require('cheerio');
const { bot } = require('../lib');

class XXXHandler {
  constructor() {
    this.baseUrl = 'https://www.xnxx.com';
  }

  async search(query) {
    if (!query) {
      throw new Error('Query is required');
    }

    try {
      const url = `${this.baseUrl}/search/${encodeURIComponent(query)}/${Math.floor(Math.random() * 3) + 1}`;
      const response = await axios.get(url, { timeout: 10000 });
      const $ = cheerio.load(response.data);
      const results = [];

      $('div.mozaique').each((_, element) => {
        const $element = $(element);
        const links = $element.find('div.thumb a')
          .map((_, el) => this.baseUrl + $(el).attr('href').replace('/THUMBNUM/', '/'))
          .get();
        
        const titles = $element.find('div.thumb-under a')
          .map((_, el) => $(el).attr('title') || 'Untitled')
          .get();
        
        const infos = $element.find('div.thumb-under p.metadata')
          .map((_, el) => $(el).text().trim())
          .get();

        links.forEach((link, index) => {
          if (titles[index] && infos[index]) {
            results.push({ 
              title: titles[index], 
              info: infos[index], 
              link: link 
            });
          }
        });
      });

      if (results.length === 0) {
        throw new Error('No results found');
      }

      return { 
        code: 200, 
        status: true, 
        result: results 
      };
    } catch (error) {
      console.error('Search error:', error.message);
      throw new Error(`Search failed: ${error.message}`);
    }
  }

  async download(link) {
    if (!link) {
      throw new Error('Link is required');
    }

    try {
      const response = await axios.get(link, { timeout: 10000 });
      const $ = cheerio.load(response.data);
      const videoScript = $('#video-player-bg > script:nth-child(6)').html();

      if (!videoScript) {
        throw new Error('Video script not found');
      }

      const extractVideoUrl = (pattern) => {
        const match = videoScript.match(pattern);
        return match ? match[1] : null;
      };

      const files = {
        low: extractVideoUrl(/html5player\.setVideoUrlLow\('(.*?)'\);/),
        high: extractVideoUrl(/html5player\.setVideoUrlHigh\('(.*?)'\);/)
      };

      if (!files.low && !files.high) {
        throw new Error('No video URLs found');
      }

      const title = $('meta[property="og:title"]').attr('content') || 'Untitled Video';

      return { 
        title, 
        files 
      };
    } catch (error) {
      console.error('Download error:', error.message);
      throw new Error(`Download failed: ${error.message}`);
    }
  }
}


// Lev
bot(
  {
    pattern: 'xxx ?(.*)',
    fromMe: true,
    desc: 'Search XXX content',
    type: 'search',
  },
  async (message, match) => {
    const query = match.trim();
    if (!query) {
      return await message.send('❌ Usage: `xxx <query>`');
    }

    try {
      const searchResponse = await xxxHandler.search(query);
      const results = searchResponse.result.slice(0, 3);

      for (const video of results) {
        try {
          const downloadResponse = await xxxHandler.download(video.link);
          
          if (downloadResponse.files.high) {
            try {
              const response = await axios.get(downloadResponse.files.high, { 
                responseType: 'arraybuffer',
                timeout: 30000 
              });

              const fileBuffer = Buffer.from(response.data);
              await message.send(
                fileBuffer,
                {
                  fileName: `${downloadResponse.title}.mp4`,
                  mimetype: 'video/mp4',
                  caption: `🎬 ${downloadResponse.title}\n❗ ${video.info}`,
                },
                'video'
              );
            } catch (bufferError) {
              console.error('Buffer download error:', bufferError.message);
              await message.send(`❌ Video download failed: ${bufferError.message}`);
            }
          } else {
            await message.send(`❗ No high quality video ${video.title}`);
          }
        } catch (downloadError) {
          console.error('Download process error:', downloadError.message);
          await message.send(`❌ Download error ${video.title}: ${downloadError.message}`);
        }
      }
    } catch (error) {
      console.error('Search process error:', error.message);
      await message.send(`❌ Search failed: ${error.message}`);
    }
  }
);

const xxxHandler = new XXXHandler();
module.exports = { xxxHandler };
