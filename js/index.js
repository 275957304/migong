$(function(){
    var imgPath = 'images/'; //图片
    var loadingPage = (function () {
        var imgSources = ['b1.jpg','b2.jpg','b3_a.png','b3_b.png','b6.jpg','b7.jpg','b8.jpg','cj.jpg','cover_top.png','i.png'];
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
            $('#loading_rate').text(Math.floor(percent * 100) + '%');
            if (percent == 1) {
                setTimeout(function () {
                    $('html,body').animate({scrollTop: 0}, 100);
                    setTimeout(function(){
                        $('#slide .section').eq(0).addClass('active');setTimeout(addition(),8000);
                    },600)
    				$('#loading').fadeOut(300);
                }, 500);
            }
        });
    })();


    var addNumber = 1,
        pageHeight = $(window).height(),
        index = 0,
        pageNumber = 2;
        state = true;

    $(window).resize(function (){resize()});
    function resize() {
        $("#slide .section,.home_bg").height(pageHeight);
        $("#slide").height(pageHeight * 3 );
    }
    resize();

    $('body').bind('mousewheel', function (event, delta) {
        event.preventDefault();
        //$(document).off("keydown");
        var $slide = $('#slide .section');
        if(delta > 0){
            if(state){
                if(index == 0){
                    return;
                }else{
                    index>0 ? index-- : index;
                    $('html,body').animate({scrollTop: pageHeight * index}, 100,function (){state = true});
                    $slide.removeClass('active');
                    setTimeout(function(){
                        $slide.eq(index).addClass('active');
                    },1000/60)
                    animateHome(index);
                }
                state = false;
            }
        }else{
            if(state){
                if(index == pageNumber){
                    return;
                }else{
                    index<pageNumber ? index++ : index;
                    $('html,body').animate({scrollTop: pageHeight * index}, 100,function (){state = true});
                    $slide.removeClass('active');
                    setTimeout(function(){
                        $slide.eq(index).addClass('active');
                    },1000/60);
                    animateHome(index);
                }
                state = false;
            }
        }
        return false;
    });

    function animateHome(i){
        $('#j_sub li').eq(i).addClass('active').siblings().removeClass('active');
        if(i == 0){
            addition()
        }else{
            $('#J_home').removeClass('home_next')
        }
    }

    function addition(){
        if(addNumber >= 90){
            $('#J_home').addClass('home_next')
            addNumber = 0;
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



});
