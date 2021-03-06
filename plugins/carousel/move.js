/**
 * [startMove 速度版运动框架，不支持css3]
 * @method startMove
 * @param  {[node]}   obj  [要运动的html objNode]
 * @param  {[json]}   json [运动目标点json对象]
 * @param  {[function]} fnEnd   [运动结束后回调]
 * @param  {[int]} factor   [速度影响因子，越大速度越慢。一般不用传]
 * 使用方法
 * startMove(div, {
 *         'left': 500,
 *         'top': 66,
 *         'opacity': 20,
 *         'width': 400,
 *         'padding': 55,
 *         'marginTop': 44
 *     },
 *     function() {
 *         alert('done');
 *     },
 *     20
 * );
 *
 * startMove(div, {
 *       'left': 500,
 *       'top': 66,
 *       'opacity': 10,
 *       'width': 400,
 *       'padding': 55,
 *       'marginTop': 44
 *   },
 *   function() {
 *       console.log('done');
 *       startMove(div, {
 *           'left': 50,
 *           'top': 460,
 *           'opacity': 100,
 *           'width': 40,
 *       });
 *   }
 * );
 */

function startMove(obj, json, fnEnd, factor) {
    var speedFactor = factor || 8; //bigger speedFactor, move slower
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var bStop = true; //这一次运动就结束了(所有的值都到达了)
        for (var attr in json) {
            //1.取当前的值
            var iCur = 0;

            if (attr == 'opacity') {
                iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                iCur = parseInt(getStyle(obj, attr));
            }

            //2.算速度
            var iSpeed = (json[attr] - iCur) / speedFactor;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            //3.检测是否到达目标点，没到达就别停
            if (iCur != json[attr]) {
                bStop = false;
            }

            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
                obj.style.opacity = (iCur + iSpeed) / 100;
            } else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }
        }

        if (bStop) {
            clearInterval(obj.timer);
            if (fnEnd) {
                fnEnd();
            }
        }
    }, 30);
}

/**
 * simplest get css2 style: getStyle(div1, 'height')
 * @param  {[node]} obj
 * @param  {[string]} attr like height, top, opacity
 * @return {[string]}   '50px'
 */
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}

