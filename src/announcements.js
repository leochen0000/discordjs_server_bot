const fs = require('fs');
const gifsDir = './src/resources/media/gifs/';

const gamesNightTime = '8pm PST';

const announcementList = [`Happy Friday everyone~ It\'s times for Games Night again! Cya @ ${gamesNightTime}.`,
                     `It\'s ya favourite time of the week again! See you at Games Night @ ${gamesNightTime}!`,
                     `Congrats on making through another week! Let\'s celebrate together at Games Night @ ${gamesNightTime}!`,
                     `It\'s time for Games Night again! ${gamesNightTime}!`];

let gifList = fs.readdirSync(gifsDir);

exports.announcementList = announcementList;
exports.gifList = gifList;
exports.gifsDir = gifsDir;