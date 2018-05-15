/*
 *Author: Igor Joaquim dos Santos Lima
 *Email: igorjoquim.pg@gmail.com
 */
const video = require('./js/video.js')
const $ = require('jquery')

var urlText;
var infoDiv;
var url;

function addLinkToDownload(info,i) {

    if (info.fmt_list[i]) {

        let quality = info.formats[i]; 
        let link = document.createElement("a");

        link.textContent = quality.quality +"("+info.fmt_list[i][1]+")";
        link.onclick = ()=> {
            video.downloadVideo(url,info.formats[i],info.title);
        };

        infoDiv.append("<br/>");
        infoDiv.append(link);

        addLinkToDownload(info,i+1);
    }
}

function clearInfoDiv(){
    infoDiv.find('a').remove();
    infoDiv.find('br').remove();
}

function videoInfo() {
    
    let loadGif = $("#load");
    let search  = $("#search");

    clearInfoDiv();

    try {
    
        url = urlText.val();
        search.hide('fast');
        loadGif.show('fast');
      
        video.videoInfo(url, (info) => {
    
            console.log(info);
    
            $("#videoImg").attr('src',info.related_videos[1].playlist_iurlmq);
            $("#title").html(info.title);
    
            addLinkToDownload(info,0);
    
            loadGif.hide('hide');
            search.show('fast');
        });

    }catch(e){

        loadGif.hide('hide');
        search.show('fast');

        setTimeout(() => {
            alert("vídeo não encontrado!");
        },100);
    }
}

//init
$(function(){
    urlText = $("#url");
    infoDiv = $("#info");
    video.path="C:\\Users\\igor.lima\\Downloads\\";
});
