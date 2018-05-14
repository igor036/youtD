const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports = {

    videoInfo: function(url) {
        
        ytdl.getInfo(url).then(info => {
            console.log(info);
        });
    }
};