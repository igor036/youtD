/*
 *Author: Igor Joaquim dos Santos Lima
 *Email: igorjoquim.pg@gmail.com
 */
const video = require('./js/video.js')
const $ = require('jquery')

var urlText;

function videoInfo() {


    let loadGif = $("#load");
    let search  = $("#search");
    let infoDiv = $("#info");

    search.hide('fast');
    loadGif.show('fast');
  
    video.videoInfo(urlText.val(), (info) => {

        console.log(info);

        $("#videoImg").attr('src',info.related_videos[1].playlist_iurlmq);
        $("#title").html(info.title);

        let quality,i=0;

        do {
            
            quality = info.formats[i];
            infoDiv.append('<link>'+ quality.quality +'('+info.fmt_list[i][1]+')' +'</link>');
            quality = info.formats[++i];
            
        } while(quality.itag != undefined);

        loadGif.hide('hide');
        search.show('fast');

    });
}

//init
$(function(){
    urlText = $("#url");
});
