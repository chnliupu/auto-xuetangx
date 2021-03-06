// ==UserScript==
// @name         AutoXuetangx
// @version      0.3
// @description  自动完成学堂在线刷时间
// @author       Cubesky, Chengze Fan, Liu Pu
// @match      *://*.xuetangx.com/courses/*
// @run-at      document-end
// @grant        none
// ==/UserScript==

(function() {
    var autoClick=setInterval(function(){
        var t = document.title;
        if (t.match('题')){
            $("a",$("li[class$=' ']")[$("li[class$=' ']").index($('li.active'))+1]).click();
            console.log("跳过思考题");
        }else{
            console.log("正在播放视频");
        };
        if (len =t.split(".").length-1 < 2){
            $("a",$("li[class$=' ']")[$("li[class$=' ']").index($('li.active'))+1]).click();
            console.log("跳过章节大标题")
        }else{};
    },5000);
    var scountstart=0;
    var cinv=setInterval(function(){
        if($("li").filter(function(index){ return $(this).text()=="标清"; }).length>0){
            scountstart=scountstart+1;
            if(scountstart>4){
                if($("li").filter(function(index){ return $(this).text()=="标清"; }).click().filter(".xt_video_player_common_active").length>0){
                    console.log("AutoXuetangx has now muted the sound.");
                    $('.xt_video_player_volume_icon*').click()
                    console.log("AutoXuetangx now changed video quality.");
                    $("li").filter(function(index){ return $(this).text()=="1.25x"; }).click().filter(".xt_video_player_common_value");
                    console.log("Set speed at 1.25x.")
                    clearInterval(cinv);
                    scountstart=0;
                    var inv=setInterval(function(){
                        if($("video")[0].readyState==4){
                            if($("video")[0].paused){
                                scountstart=-1;
                                $(".xt_video_player_play_btn").click();
                                console.log("AutoXuetangx now auto play the video.");
                                $($("h2")[1]).html($($("h2")[1]).html()+"<small> 已启用自动刷时间插件 - AutoXuetangX </small>");
                                clearInterval(inv);
                            }
                        }else{
                            scountstart=scountstart+1;
                            if(scountstart>10){
                                if(scountstart>30){
                                    console.log("AutoXuetangx now trying to refresh.");
                                    window.location.reload();
                                }else{
                                    console.log("AutoXuetangx is still waiting for video load.");
                                }
                            }else{
                                console.log("AutoXuetangx is waiting for video load.");
                            }
                        }
                    },2000);
                }else{
                    console.log("AutoXuetangx is waiting for video frame complete.");
                }
            }else{
                console.log("AutoXuetangx is waiting for video frame response.");
            }
        }

    },2000);
    var invend=setInterval(function(){
        if($("video")[0].ended){
            console.log("AutoXuetangx now change to play next video.");
            var autoattr=$("a",$("li[class$=' ']"));
            if(autoattr.length>$("li[class$=' ']").index($('li.active'))+1){
                $("a",$("li[class$=' ']")[$("li[class$=' ']").index($('li.active'))+1]).click();
            }else{
                $($("h2")[1]).html($($("h2")[1]).html()+"<br><small> 无法找到下一个视频，也许是你已经看完了所有视频？ - AutoXuetangX </small>");
                console.log("AutoXuetangx cannot found next video.");
            }
            clearInterval(invend);
        }else{
            console.log("AutoXuetangx is waiting for video ended.");
        }
    },2000);
    console.log("AutoXuetangx injected successful.");

})();
