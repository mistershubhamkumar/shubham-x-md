const { bot, getJson } = require('../lib/');

bot({
    pattern: 'naruto ?(.*)',
    fromMe: true,
    desc: 'Naruto WhatsApp Status Generator',
    type: 'Anime🪄'
}, async (message, match) => {

    // API से डेटा प्राप्त करें
    const apiUrl = 'https://raw.githubusercontent.com/mask-sir/api.mask-ser/main/Naruto.json';
    const { result } = await getJson(apiUrl);

    // रैंडम इमेज सेलेक्ट करें
    const randomImage = result[Math.floor(Math.random() * result.length)];

    // कैप्शन सेट करें
    let caption = '*Nαɾυƚσ υȥυɱαƙι*';

    // इमेज भेजें
    return await message.sendFromUrl(randomImage, { caption });
});
