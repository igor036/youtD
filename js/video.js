/*
 *Author: Igor Joaquim dos Santos Lima
 *Email: igorjoquim.pg@gmail.com
 */
const fs = require('fs');
const ytdl = require('ytdl-core');
const regex_id = /v=([\]\[!"#$%'()*+,.\/:;<=>?@\^_`{|}~-\w]*)/;

module.exports = {
    video: NaN,
    videoInfo: function(url, sucess) {
        console.log("pesquisando!");
        ytdl.getInfo(url.match(regex_id)[1]).then(info => {
            sucess(info);
        });
    },

    downloadVideo: function(url,quality,name) {
        ytdl(url, { filter: (format) => format.resolution === quality.resolution })
            .pipe(fs.createWriteStream(this.path+name+'.'+quality.container,f));
    }
};