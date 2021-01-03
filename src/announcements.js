const fs = require('fs');
const gifsDir = './src/resources/media/gifs/';

const announcementList = ['Happy Friday everyone~ It\'s times for Games Night again! Cya @ 8pm.',
                     'It\'s ya favourite time of the week again! See you at Games Night @ 8pm PST!',
                     'Congrats on making through another week! Let\'s celebrate together at Games Night @ 8pm!',
                     'It\'s time for Games Night again! 8pm PST'];

let gifList = fs.readdirSync(gifsDir);

exports.announcementList = announcementList;
exports.gifList = gifList;
exports.gifsDir = gifsDir;