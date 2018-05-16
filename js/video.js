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
        ytdl.getInfo(url.match(regex_id)[1]).then(info => {
            sucess(info);
        });
    },

    downloadVideo: function(url,quality,name,process) {

        let video = ytdl(url, { filter: (format) => format.resolution === quality.resolution });
        video.pipe(fs.createWriteStream(this.path+name+'.'+quality.container));
        video.on('response',(res)=> {

            let totalSize =  res.headers['content-length'],dataRead = 0;

            res.on('data',(data) => {
                
                dataRead += data.length;
                let percent = (dataRead*100) / totalSize;

                process.attr("aria-valuenow",parseInt(percent));
                process.html(parseInt(percent)+"%");
                process.css("width",parseInt(percent)+"%");

            });
        });
    }
};