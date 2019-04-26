$(function(){
    var imgPath = 'images/'; //图片
    var loadingPage = (function () {
        var imgSources = ['loading.png','loading_gary.jpg','b1.jpg','b2.jpg','b3_a.png','b3_b.png','b6.jpg','b7.jpg','b8.jpg','cj.jpg','cover_top.png','i.png','lottery_b1.jpg','lottery_b2.jpg','m1.png','m2.png','ms.png','pop.png','walk.png'];
        for (var i = 0; i < imgSources.length; i++) {
            imgSources[i] = (imgPath + imgSources[i]);
        };
        var loadImage = function (path, callback){var img = new Image();img.onload = function(){img.onload = null;callback(path)};img.src = path;}
        var imgLoader = function (imgs, callback) {
            var len = imgs.length, i = 0;
            while (imgs.length) {
                loadImage(imgs.shift(), function (path) {
                    callback(path, ++i, len);
                })
            }
        }
        var percent = 0;
        imgLoader(imgSources, function (path, curNum, total) {
            percent = curNum / total;
            $('.percent').text(Math.floor(percent * 100) + '%');
            $(".loadSuc").css({ "height": ( percent * 260 ) + "px"});
            if (percent == 1) {
                setTimeout(function () {
                    showPage(1);
    				$('#loading').fadeOut(300);
                }, 500);
            }
        });
    })();

    var addNumber = 1,
        pageHeight = $(window).height(),
        ispage = false;

    $(window).resize(function (){resize()});
    function resize() {
		pageHeight > 930 ? pageHeight=930 : pageHeight;
        $("#J_slide, #J_p1, #J_p2, #J_p3, .home_bg").height(pageHeight);
    }
    resize();

    $('#j_sub li').on('click',function(){
        $(document).on("keydown");
        var index = $(this).data('id');
        $(this).addClass('active').siblings().removeClass('active');
        showPage(index);
    });

    $('#J_to2').on('click',function(){
        showPage(2);
    })

    $('#J_toLottery').on('click',function(){
        showPage(3);
    });

    function showPage(i){
        var timer = null;
        $('#j_sub li').eq(i-1).addClass('active').siblings().removeClass('active')
        $("#J_slide .section").hide().removeClass('active');
        $('#J_p' + i).show();
        setTimeout(function(){
            $('#J_p' + i).show().addClass('active');
        },1000/60);
        if(i==1){
            ispage = false;
            timer = setTimeout(function(){
                if(!ispage){
                    addition()
                }
            },1500)
        }else{
            ispage = true;
            clearTimeout(timer);
        }
        if(i == 2){
            $('#J_home').removeClass('home_next');
            $('#J_gameBg,.J_success').hide();
            $('#J_two,.start_game').show();
        }
    }

    function addition(){
        if(addNumber >= 90){
            $('#J_home').addClass('home_next');
            addNumber = 0;
            if(!ispage){
                $('#J_p1,.top_link,.sub').addClass('shake');
                setTimeout(function(){
                    $('#J_p1,.top_link,.sub').removeClass('shake');
                },500);
            };
            return;
        }else{
            addNumber ++;
        }
        setTimeout(function() {
            addition()
        },1000/60);
        $('#J_number').text(addNumber)
    };

    $("#J_sz").hover(function(){
        $(".sz_bg").addClass('sz_show');
    },function(){
        $(".sz_bg").removeClass('sz_show');
    });

    $("#J_mz").hover(function(){
        $(".mz_bg").addClass('mz_show');
    },function(){
        $(".mz_bg").removeClass('mz_show');
    });

    $('.close').on('click',function(){
        $(this).parents('.success_pop').fadeOut();
    });

    var audio = document.getElementById("audio"),argM = false;
        audio.play();
    $('#J_sound').on('click',function(){
        if (argM) {
            $(this).removeClass('pause');
            audio.play();
        } else {
            $(this).addClass('pause');
            audio.pause();
        }
        argM = !argM;
    });

});

//游戏
var map = 1;
$('#J_sz,#J_mz').on('click',function(){
    var id = $(this).data('id');
    map = id;
    $('#J_two').fadeOut(100);
    $('#J_gameBg').fadeIn(100);
    $('.gamebg').hide();$('#J_mapbg_' + id).show();
    $('#J_map').attr('class','m' + id);
    $("#J_target").attr('style','').removeClass('rotate');
    $(document).off("keydown");
});
function mazeGame(fn,map) {
    console.log(map)
    var b1 =  [1, 1, 0, 0];
    var b2 =  [1, 0, 1, 0];
    var b3 =  [1, 1, 1, 0];
    var b4 =  [0, 1, 1, 0];
    var b5 =  [0, 0, 1, 0];
    var b6 =  [0, 1, 0, 1];
    var b7 =  [0, 0, 1, 1];
    var b8 =  [0, 1, 1, 1];
    var b9 =  [1, 0, 0, 1];
    var b10 = [1, 0, 0, 0];
    var b11 = [0, 1, 0, 0];
    var b12 = [1, 0, 1, 1];
    var b13 = [0, 0, 0, 1];
    var b14 = [1, 1, 0, 1];
    var b15 = [1, 1, 0, 0];
    var b16 = [1, 1, 1, 1];
    var aMapTwo = [
        [b15, b2, b2, b3, b2, b2, b2, b3, b2, b4 ],
        [b14, b5, b15, b12, b4, b10, b2, b12, b4, b6],
        [b6, b11, b14, b3, b8, b1, b2, b2, b7, b6],
        [b6, b9, b7, b6, b13, b9, b2, b3, b2, b8],
        [b14, b2, b4, b6, b1, b2, b2, b7, b15, b7],
        [b6, b11, b6, b9, b12, b2, b3, b5, b9, b4],
        [b6, b9, b12, b3, b4, b1, b12, b4, b1, b8],
        [b9, b2, b3, b8, b6, b6, b11, b13, b6, b6],
        [b11, b15, b7, b13, b6, b6, b6, b10,  b7, b13],
        [b6, b9, b3, b5, b9, b7, b14, b2, b2, b4],
        [b9, b2, b12, b3, b4, b10, b7, b15, b4, b6],
        [b10, b3, b4, b6, b14, b2, b4, b6, b14, b8],
        [b11, b6, b6, b13, b6, b1, b8, b6, b6, b6],
        [b6, b13, b14, b4, b6, b6, b13, b6, b13, b13],
        [b14, b2, b7, b6, b6, b6, b11, b9, b3, b4],
        [b14, b3, b2, b12, b12, b7, b6, b15, b7, b6],
        [b13, b14, b3, b2, b2, b3, b12, b12, b5, b13],
        [b10, b7, b6, b10, b2, b12, b4, b10, b3, b4],
        [b1, b4, b6, b10, b2, b3, b7, b1, b7, b6],
        [b13, b9, b12, b2, b5, b9, b2, b8, b10, b7]
    ];
    var aMatrix = [
        [b10, b2, b3, b2, b2, b4, b1, b3 , b2, b5],
        [b1, b2, b7, b1, b2, b12, b7, b9, b2, b4],
        [b14, b3, b5, b14, b3, b3, b2, b2, b5, b6],
        [b6, b6, b11, b6, b6, b14, b2, b4, b1, b7],
        [b13, b6, b14, b7, b6, b6, b1, b12, b7, b11],
        [b11, b6, b13, b1, b8, b13, b14, b2, b4, b6],
        [b6, b14, b4, b6, b9, b4, b6, b11, b14, b8],
        [b6, b13, b6, b14, b4, b9, b7, b6, b6, b6 ],
        [b14, b4, b13, b13, b14, b2, b2, b7, b6, b13],
        [b13, b9, b2, b4, b14, b3, b2, b4, b14, b4],
        [b15, b2, b2, b8, b6, b6, b11, b6, b6, b6,],
        [b14, b2, b5, b9, b7, b6, b6, b9, b7, b6],
        [b9, b2, b3, b2, b4, b13, b6, b10, b2, b8],
        [b10, b2, b16, b4, b6, b1, b12, b2, b5, b6],
        [b15, b4, b6, b6, b14, b16, b4, b1, b5, b6],
        [b6, b14, b7, b6, b6, b13, b6, b9, b2, b7],
        [b6, b14, b5, b6, b6, b15, b12, b5, b15, b4],
        [b3, b6, b10, b12, b7, b9, b2, b5, b6, b6],
        [b15, b12, b2, b2, b2, b3, b2, b2, b7, b6],
        [b9, b2, b2, b2, b5, b9, b2, b3, b2, b7]
    ];
    var $elem = $("#J_target");
    var $maze = $("#J_maze");
    var t1, t2, t3, t4, ikeycode, icoord, afloor, iw, ih, iTarget, iPos;
    var isStop = false;

    function init() {
        icoord = [0, 5];
        iw = 53;
        ih = 53;
        bindEvent();
    }
    init();
    function bindEvent() {
        $(document).keydown(function(e) {
        	e.preventDefault();
            ikeycode = e.keyCode;
            var reg = /^(38|104|37|100|40|98|39|102)$/;
            if (!reg.test(ikeycode) || isStop) {
            } else {
                if(map == 1){
                    afloor = aMatrix[icoord[0]][icoord[1]];
                }else if(map == 2){
                    afloor = aMapTwo[icoord[0]][icoord[1]];
                }
                t1 = afloor[0] && ikeycode == 38;
                t2 = afloor[1] && ikeycode == 39;
                t3 = afloor[2] && ikeycode == 40;
                t4 = afloor[3] && ikeycode == 37;
                if (t1) {
                    doTop();
                } else if (t2) {
                    $('#J_target').removeClass('rotate');
                    doRight();
                } else if (t3) {
                    doDown();
                } else if (t4) {
                    $('#J_target').addClass('rotate');
                    doLeft();
                }
            }
        });
    }

    function doTop() {
        isStop = true;
        iPos = $elem.position();
        doMove({
            x: iPos.left,
            y: iPos.top - ih
        }, function() {
            icoord = [icoord[0], ++icoord[1]];
            isStop = false;
        });
    };
    function doRight() {
        isStop = true;
        iPos = $elem.position();
        doMove({
            x: iPos.left + iw,
            y: iPos.top
        }, function() {
            icoord = [++icoord[0], icoord[1]];
            isStop = false;
        });

    };
    function doDown() {
        isStop = true;
        iPos = $elem.position();
        doMove({
            x: iPos.left,
            y: iPos.top + ih
        }, function() {
            icoord = [icoord[0], --icoord[1]];
            isStop = false;
        });
    };
    function doLeft() {
        isStop = true;
        iPos = $elem.position();
        doMove({
            x: iPos.left - iw,
            y: iPos.top
        }, function() {
            icoord = [--icoord[0], icoord[1]];
            isStop = false;
        });
    };
    function doMove(target, callback) {
        $elem.stop().animate({
            "left": target.x,
            "top": target.y
        }, function() {
            callback && callback();
            checkPrize();
        })
    };
    function checkPrize() {
        if (icoord[0] == 19 && icoord[1] == 7) {
        	if(fn) fn();
            $(document).off("keydown");
        }
    };
}
