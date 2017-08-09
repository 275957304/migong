function mazeGame(fn,map) {
    var b1 =  [1, 1, 0, 0]; //  top  left  down  right  坐标是从上顺时针     左zuǒ
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
        [b14, b5, b15, b12, b4, b10, b2, b12, b4, b2],
        [b6, b11, b14, b3, b8, b1, b2, b2, b7, b6],
        [b6, b9, b7, b6, b13, b9, b2, b3, b2, b8],
        [b14, b2, b4, b6, b1, b2, b2, b7, b15, b7],
        [b6, b11, b6, b9, b12, b2, b3, b5, b9, b4],
        [b6, b11, b6, b9, b12, b2, b3, b5, b9, b4],
        [b9, b2, b3, b8, b6, b6, b11, b13, b6, b6],
        [b11, b15, b7, b13, b6, b6, b6, b10,  b7, b13],
        [b6, b9, b3, b14, b9, b7, b14, b2, b2, b4],
        [b9, b2, b12, b3, b4, b10, b7, b15, b4, b6],
        [b10, b3, b4, b6, b14, b2, b4, b6, b14, b8],
        [b11, b6, b6, b13, b6, b1, b8, b6, b6, b6],
        [b6, b13, b14, b4, b6, b6, b13, b6, b13, b13],
        [b14, b2, b7, b6, b6, b6, b11, b9, b3, b4],
        [b14, b3, b2, b12, b12, b7, b6, b15, b7, b6],
        [b13, b14, b3, b2, b2, b3, b12, b12, b14, b13],
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
	console.log(aMatrix)
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
