function mazeGame(time,fn) {
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
    var aMatrix = [
        [b4,b2,b3,b2,b2,b2,b3,b2,b2,b15],        
        [b6,b4,b12,b2,b10,b4,b12,b1,b5,b14],
        [b6,b7,b2,b2,b1,b8,b3,b14,b11,b6],
        [b8,b2,b3,b2,b9,b13,b6,b7,b9,b6],
        [b7,b1,b7,b2,b2,b1,b6,b4,b2,b14],
        [b4,b9,b5,b3,b2,b12,b9,b6,b11,b6],
        [b8,b1,b4,b12,b1,b4,b3,b12,b9,b6],
        [b6,b6,b13,b11,b6,b6,b8,b3,b2,b9],
        [b13,b7,b10,b6,b6,b6,b13,b7,b1,b11],
        [b4,b2,b2,b14,b7,b9,b5,b3,b9,b6],
        [b6,b4,b15,b7,b10,b4,b3,b12,b2,b9],
        [b8,b14,b6,b4,b2,b14,b6,b4,b3,b10],
        [b6,b6,b6,b8,b1,b6,b13,b6,b6,b11],
        [b13,b13,b6,b13,b6,b6,b4,b14,b13,b6],
        [b4,b3,b9,b11,b6,b6,b6,b7,b2,b14],
        [b6,b7,b1,b6,b7,b12,b12,b2,b3,b14],
        [b13,b5,b12,b12,b3,b2,b2,b3,b14,b13],
        [b4,b3,b10,b4,b12,b2,b10,b6,b7,b10],
        [b6,b7,b1,b7,b3,b2,b10,b6,b4,b15],
        [b7,b10,b7,b2,b9,b5,b2,b12,b9,b13]
    ];
    var $elem = $("#J_target");
    var t1, t2, t3, t4, ikeycode, icoord, afloor, iw = 58, ih = 58, iTarget, iPos;
    var isStop = false;
    var xAxis = 20; //X坐标格数
    var yAxis = 10; //Y坐标格数
    var gift = []; //生成礼品   
    var integral = 0; //积分 
    var treasure = 0; //宝物
	var timer = null;
    function init() {
        icoord = [9, 5];
        $elem.attr('style','')
        createGift();
        bindEvent();
        getTime(time);
    }    
    init();
    function bindEvent() {
        $(document).keydown(function(e) {
        	e.preventDefault();
            ikeycode = e.keyCode;            
            var reg = /^(38|104|37|100|40|98|39|102)$/;
            if (!reg.test(ikeycode) || isStop) {

            } else {
                afloor = aMatrix[icoord[0]][icoord[1]];
                //目前坐标
                //console.log( icoord + '-----' + afloor)
                t1 = afloor[0] && ikeycode == 38;
                t2 = afloor[1] && ikeycode == 39;
                t3 = afloor[2] && ikeycode == 40;
                t4 = afloor[3] && ikeycode == 37;
                if (t1) {
                    doTop();
                } else if (t2) {                    
                    doRight();
                } else if (t3) {
                    doDown();
                } else if (t4) {
                    doLeft();
                }
            }
        });
    }
    function doTop() {
        isStop = true;
        iPos = $elem.position();
        //console.log(iPos);
        doMove({
            x: Math.ceil(iPos.left),
            y: Math.ceil(iPos.top) - ih
        }, function() {
            icoord = [icoord[0], --icoord[1]];
            isStop = false;
        });
    };

    function doRight() {
        isStop = true;
        iPos = $elem.position();
        doMove({
            x: Math.ceil(iPos.left) + iw,
            y: Math.ceil(iPos.top)
        }, function() {
            icoord = [++icoord[0], icoord[1]];
            isStop = false;
        });
    };

    function doDown() {
        isStop = true;
        iPos = $elem.position();
        doMove({
            x: Math.ceil(iPos.left),
            y: Math.ceil(iPos.top) + ih
        }, function() {
            icoord = [icoord[0], ++icoord[1]];
            isStop = false;
        });
    };

    function doLeft() {
        isStop = true;
        iPos = $elem.position();
        doMove({
            x: Math.ceil(iPos.left) - iw,
            y: Math.ceil(iPos.top)
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
        var icoords = icoord[1]*xAxis + icoord[0];        
        for(var i=0;i<=gift.length;i++){
            if(gift[i] == icoords){
                var jf = $('#J_maze').find('#' + icoords).data('jf');
                integral += parseInt(jf);
                treasure++;
                $('#J_integral').text(integral);
                $('#J_maze').find('#' + icoords).remove();
                gift.splice(i,1);
                console.log('您的积分为' + integral)
            };
        };
        if(gift.length==0 && treasure == 12){
            var data = {
                bw:treasure,
                jf:integral
            };
            if(fn) fn(data);
			clearInterval(timer);
            $(document).off("keydown");
        }
    };
    function createGift(){
        var giftArea = '';
        for(var i=0;gift.length<12;i++){
            var half = 5, 
                ids,
                rx, //随机出X轴                
                ry = setRandom(9,0); //随机出Y轴
            if(i<=half){
                rx = setRandom(8,0);
            }else{
                rx = setRandom(19,11);
            };
            //二维坐标转换
            //console.log('y' + ry + 'x' + rx  )
            ids = (ry * xAxis) + rx;
            for(var j=0; j<gift.length;j++){
                if(gift[j] == ids ){
                    gift.splice(j,1);
                    half++
                }
            }
            gift.push(ids) 
        };
        $(gift).each(function(index,item){   
            var top =  parseInt(item/xAxis),
                left =  (item%xAxis),
                jf = 20;
            if(index==4 || index== 5){
                jf = 15;
            }else if(index==6 || index== 7 || index== 8){
                jf = 10
            }else if(index>8){
                jf = 5
            };
            giftArea += '<span id='+ item +' data-jf='+jf+' data-arr=['+ top +','+ left +'] class="g'+ index + '" style="left:'+ (left*58) +'px;top:'+ (top*58) +'px"></span>';
        });
        $('#J_maze').empty().append(giftArea);
    };
    function setRandom(max,min){
       return Math.floor(Math.random()*(max-min + 1)+min)
    };
    function getTime(time){
        var t = time, m=0, s=0;
        function countDown(){
            t--            
            m=Math.floor(t/60%60);
            m<10&&(m='0'+m);
            s=Math.floor(t%60);
            s<10&&(s='0'+s);  
            $('#J_time').text(m +":"+ s);             
            if(t==0){
                //时间到了
                var data = {
                    bw:treasure,
                    jf:integral
                };
                if(fn) fn(data);
                $(document).off("keydown");
                clearInterval(timer);
                return
            }  
            timer=setTimeout(countDown,1000);
        }
        countDown();
    }
}
