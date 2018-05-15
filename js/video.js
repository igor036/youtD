/*
 *Author: Igor Joaquim dos Santos Lima
 *Email: igorjoquim.pg@gmail.com
 */
const fs = require('fs');
const ytdl = require('ytdl-core');
const regex_id = /v=([\]\[!"#$%'()*+,.\/:;<=>?@\^_`{|}~-\w]*)/;

module.exports = {

    videoInfo: function(url, sucess) {
        console.log("pesquisando!");
        ytdl.getInfo(url.match(regex_id)[1]).then(info => {
            sucess(info);
        });
    }
};