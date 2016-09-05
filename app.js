var playbackSpeed = 1;

$(document).ready(function(){

    // Open tooltip by default
    $('[data-toggle="tooltip"]').tooltip(); 

    // Hide Video Container by Default
    $(".video-content").hide();

    // Load Introduction Content
    $('#description-content').load('content/text/introduction.html');

    // load Video, Text Content, and Subtitle inside folder
    $('.clickable a').on('click', function () {
        // Show Video Player
        $(".video-content").show();

        // Load Video File
        $("#videoplayer-src").attr('src', 'content/video/' + this.id + '.mp4');

        // Cleaning up subtitle src then load file
        $("#subtitle-src").attr('src', '');
        $("#subtitle-src").attr('src', 'content/subtitle/' + this.id + '-id.vtt');

        // Load html file for description content
        $('#description-content').load('content/text/' + this.id + '.html');

        // Autoplay video
        $(".video-content video")[0].load();

    });

    $('.with-video').on('click', function () {
        // Load previously video speed
        var videoTag = document.querySelector('.video-content video');
        videoTag.playbackRate = playbackSpeed;
        $(".playback-speed").text(playbackSpeed);
    });

    // Hide Video Container if .no-video class exist
    $('.no-video').on('click', function () {
        // Hide player
        $(".video-content").hide();

        // Cleaning up 
        $("#videoplayer-src").attr('src', '');
        $("#subtitle-src").attr('src', '');
    });

    // Rewind Button for Video
    $('#rewind-button').on('click', function () {
        // Pause video
        $('.video-content video').get(0).pause(); 
        // Reset to 0 secoind
        $('.video-content video').get(0).currentTime = 0;
        // Play video
        $('.video-content video').get(0).play(); 
    });

    // Detect end of video
    $('.video-content video').on('ended',function(){
        // And change to next section
        alert('Video sudah selesai! Silahkan melanjutkan ke bagian selanjutnya!');
    });

    $(".video-content video").on("timeupdate", function(event){
         onTrackedVideoFrame(secToMinSec(this.currentTime), secToMinSec(this.duration)) ;
       });
});

function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}

function secToMinSec(time) {
    var minutes = Math.round(parseInt(time / 60, 10));
    var seconds = Math.round(time % 60);

    // var clock = Math.round(minutes) + ":" + Math.round(seconds);

    var clock = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);

    return clock;
}

// Tryit Editor (HTML, CSS, Javascript)
function runCode() {
    var content = document.getElementById('sourceCode').value;
    var iframe = document.getElementById('targetCode');
    iframe = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument.document) ? iframe.contentDocument.document : iframe.contentDocument;
    iframe.document.open();
    iframe.document.write(content);
    iframe.document.close();
    return false;
}
runCode();

// Change Playback Rate
function changePlaybackRate(rateChange) {
    var videoTag = document.querySelector('.video-content video');
    if (videoTag.playbackRate) {
        videoTag.playbackRate = rateChange;
        playbackSpeed = videoTag.playbackRate;
        $(".playback-speed").text(playbackSpeed);
    }
};

function onTrackedVideoFrame(currentTime, duration){
    $("#current").text(currentTime);
    $("#duration").text(duration);
}
