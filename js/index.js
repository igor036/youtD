/*
 *Author: Igor Joaquim dos Santos Lima
 *Email: igorjoquim.pg@gmail.com
 */
const video = require('./js/video.js')
const $ = require('jquery')
const notifier = require('node-notifier');

var urlText;
var infoDiv;
var url;
var PID = 0;
var openFolder;

function addLinkToDownload(info,i) {

    if (info.fmt_list[i]) {

        let quality = info.formats[i];
        let link = document.createElement("a");

        link.textContent = quality.quality +"("+info.fmt_list[i][1]+")";
        link.href = "#";

        link.onclick = ()=> {

            let processDiv = $("#process");

            processDiv.append('<span>'+info.title+'</span>');
            processDiv.append("<br/>");
            processDiv.append('<div class="progress"><div id="process-'+PID+'" class="progress-bar progress-bar-striped bg-info" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div>');

            $("#clearBt").show('fast');

            let process = $("#process-"+(PID++));
            let dataRead = 0;

            video.downloadVideo(url,info.formats[i],info.title,(data,totalSize)=>{

                    dataRead += data.length;
                    let percent = (dataRead*100) / totalSize;

                    process.attr("aria-valuenow",parseInt(percent));
                    process.html(parseInt(percent)+"%");
                    process.css("width",parseInt(percent)+"%");
            }, ()=>{
                notifier.notify({
                    'title': 'Download Concluído',
                    'subtitle': 'Concluído!',
                    'message': info.title,
                    'icon': 'dwb-logo.png',
                    'contentImage': 'blog.png',
                    'sound': 'ding.mp3',
                    'wait': true
                  });
                  notifier.on('click',openFolder());
            });
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

            console.log(url.match(video.regex_id)[1]);

            $("#videoImg").attr('src', 'https://img.youtube.com/vi/'+url.match(video.regex_id)[1]+'/mqdefault.jpg' );


            $("#title").html(info.title);

            addLinkToDownload(info,0);

            loadGif.hide('hide');
            search.show('fast');


        });

    } catch(e) {

        loadGif.hide('hide');
        search.show('fast');

        setTimeout(() => {
            alert("vídeo não encontrado!");
        },100);
    }
}


//init
$(function(){

    //set download path
    let os = require('os');

    //windows
    if (os.type() == "Windows_NT") {
        video.path="C:\\Users\\"+os.userInfo().username+"\\Downloads\\";
        openFolder = ()=> {
          require('child_process').exec('start "" "'+video.path+'"');
        };
    }
    //Linux
    else if (os.type() == "Linux") {
      video.path="/home/"+os.userInfo().username+"/Downloads/";
      openFolder = ()=> {
        require('child_process').exec('nautilus '+video.path);
      };
    }

    $("#path").html(video.path);
    //end

    //get const component's
    urlText = $("#url");
    infoDiv = $("#info");
    //end

    //clear progress download
    $("#clearBt").click(()=>{
        let process = $("#process");
        process.find('br').remove();
        process.find('div').remove();
        process.find('span').remove();
        $("#clearBt").hide('fast');
    });
    //end

});
