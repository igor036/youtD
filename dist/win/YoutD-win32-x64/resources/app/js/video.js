/*
 *Author: Igor Joaquim dos Santos Lima
 *Email: igorjoquim.pg@gmail.com
 */
const fs = require('fs');
const ytdl = require('ytdl-core');
const files = {};

module.exports = {
    video: NaN,
    regex_id: /v=([\]\[!"#$%'()*+,.\/:;<=>?@\^_`{|}~-\w]*)/,
    videoInfo: function(url, sucess) {
        ytdl.getInfo(url.match(this.regex_id)[1]).then(info => {
            sucess(info);
        });
    },
    downloadVideo: function(url,quality,name,onData,end) {
        
        let file = fs.createWriteStream(this.path+name+'.'+quality.container);
        let video = ytdl(url, { filter: (format) => format.resolution === quality.resolution });
        
        files[this.path+name+'.'+quality.container] = file;

        video.pipe(file);
        video.on('response',(res)=> {

            let totalSize =  res.headers['content-length'];
            res.on('data',(data) => {
                onData(data,totalSize);
            });

            res.on('end',end);
        });
    },
    stop: function(name, onDelete) {

        files[this.path+name].destroy();
        fs.unlink(this.path+name);
        onDelete();
        delete files[this.path+name];
    }
};
