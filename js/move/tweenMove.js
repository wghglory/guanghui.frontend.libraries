/**
 * [tweenMove 时间版运动]
 * @param  {[node]} obj      [要运动的html objectNode]
 * @param  {[json]} json     [最终目标点的状态{'height':400,'opacity':100}]
 * @param  {[decimal]} duration [持续时间ms]
 * @param  {[string]} moveType [运动类型，linear]
 * @param  {[function]} fnEnd    [运动结束后的回掉函数]
 * @param  {[function]} fnDuring [运动过程中执行]
 *
 * 使用方法：
 * 注意css3顺序导致结果不同
 *         tweenMove(div, {
 *             'top': 300,
 *             'opacity': 50,
 *             'rotate': 30,
 *             'translateX': 300,
 *             'scale': 200 //2倍
 *         }, 2000, 'elasticOut', function() {
 *             alert('done');
 *         }, function() {
 *             console.log('running');
 *         });
 */
function tweenMove(obj, json, duration, moveType, fnEnd, fnDuring) {
    var fn = tween[moveType];
    var t = 0;
    var b = {};
    var c = {};
    var d = duration / 24;
    var sAttr = '';
    clearInterval(obj.timer);
    for (sAttr in json) {
        b[sAttr] = css(obj, sAttr);
        c[sAttr] = json[sAttr] - b[sAttr];
    }
    if (duration < 30) {
        for (sAttr in json) {
            css(obj, sAttr, json[sAttr]);
        }
    } else {
        obj.timer = setInterval(
            function() {
                if (t < d) {
                    t++;
                    for (sAttr in json) {
                        css(obj, sAttr, fn(t, b[sAttr], c[sAttr], d));
                    }
                } else {
                    for (sAttr in json) {
                        css(obj, sAttr, json[sAttr]);
                    }
                    clearInterval(obj.timer);
                    if (fnEnd) {
                        fnEnd.call(obj);
                    }
                }
                if (fnDuring) {
                    fnDuring.call(obj);
                }
            }, 24);
    }
}

/**
 * get or set css. NO chain
 * note: opacity 0-100, scale 100 means same size, 200 is 2 times
 * @method css
 * @param  {[node]} obj   [node obj that needs operation]
 * @param  {[string]} attr  [attribute]
 * @param  {[string/number]} value
 * @return {[type]}       [description]
 * usage:
 *     css(div1, 'rotate', 20);
 *     css(div1, 'scale', 50);
 *     css(div1, 'height', 60);
 *     css(div1, 'top');   //read
 * OR
 *     css(div1, 'rotate', 20)('scale',200);  but can only do have 2(). no 3rd
 */
function css(obj, attr, value) {

    // read the attr value
    if (arguments.length == 2) {
        // read css3 attribute
        if (attr == 'scale' || attr == 'rotate' || attr == 'rotateX' || attr == 'rotateY' || attr == 'scaleX' || attr == 'scaleY' || attr == 'translateY' || attr == 'translateX') {
            if (!obj.$Transform) {
                obj.$Transform = {};
            }
            switch (attr) {
                case 'scale':
                case 'scaleX':
                case 'scaleY':
                    return typeof(obj.$Transform[attr]) == 'number' ? obj.$Transform[attr] : 100;
                default:
                    return obj.$Transform[attr] ? obj.$Transform[attr] : 0;
            }
        }
        // read normal css2 attribute
        var sCur = obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, false)[attr];
        if (attr == 'opacity') {
            return Math.round((parseFloat(sCur) * 100));
        } else {
            return parseInt(sCur);
        }

    } else if (arguments.length == 3) { // set attribute
        switch (attr) {
            case 'scale':
            case 'scaleX':
            case 'scaleY':
            case 'rotate':
            case 'rotateX':
            case 'rotateY':
            case 'translateZ':
            case 'translateX':
            case 'translateY':
                setCss3(obj, attr, value);
                break;
            case 'width':
            case 'height':
            case 'paddingLeft':
            case 'paddingTop':
            case 'paddingRight':
            case 'paddingBottom':
                value = Math.max(value, 0); //value must > 0 for width to padding
            case 'left':
            case 'top':
            case 'marginLeft':
            case 'marginTop':
            case 'marginRight':
            case 'marginBottom':
                if (typeof value == 'string') { // pass '6px'
                    obj.style[attr] = value;
                } else { // pass just 6 for left maybe
                    obj.style[attr] = value + 'px';
                }
                break;
            case 'opacity':
                obj.style.filter = 'alpha(opacity:' + value + ')';
                obj.style.opacity = value / 100;
                break;
            default:
                obj.style[attr] = value;
        }
    }
    // hoping: css(div1, 'rotate', 20)('scale',200)
    return function(attr_in, value_in) {
        css(obj, attr_in, value_in);
    };
}

function setCss3(obj, attr, value) {
    var sTr = '';
    var sVal = '';
    var arr = ['Webkit', 'Moz', 'O', 'ms', ''];
    if (!obj.$Transform) {
        obj.$Transform = {};
    }
    obj.$Transform[attr] = parseInt(value);
    for (sTr in obj.$Transform) {
        switch (sTr) {
            case 'scale':
            case 'scaleX':
            case 'scaleY':
                sVal += sTr + '(' + (obj.$Transform[sTr] / 100) + ') ';
                break;
            case 'rotate':
            case 'rotateX':
            case 'rotateY':
                sVal += sTr + '(' + (obj.$Transform[sTr]) + 'deg) ';
                break;
            case 'translateX':
            case 'translateY':
            case 'translateZ':
                sVal += sTr + '(' + (obj.$Transform[sTr]) + 'px) ';
                break;
        }
    }
    for (var i = 0; i < arr.length; i++) {
        obj.style[arr[i] + 'Transform'] = sVal;
    }
}


var tween = {
    linear: function(t, b, c, d) { //匀速
        return c * t / d + b;
    },
    easeIn: function(t, b, c, d) { //加速曲线
        return c * (t /= d) * t + b;
    },
    easeOut: function(t, b, c, d) { //减速曲线
        return -c * (t /= d) * (t - 2) + b;
    },
    easeBoth: function(t, b, c, d) { //加速减速曲线
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b;
        }
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d) { //加加速曲线
        return c * (t /= d) * t * t * t + b;
    },
    easeOutStrong: function(t, b, c, d) { //减减速曲线
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d) { //加加速减减速曲线
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t + b;
        }
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p) { //正弦衰减曲线（弹动渐入）
        var s;
        if (t === 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    elasticOut: function(t, b, c, d, a, p) { //正弦增强曲线（弹动渐出）
        var s;
        if (t === 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p) {
        var s;
        if (t === 0) {
            return b;
        }
        if ((t /= d / 2) == 2) {
            return b + c;
        }
        if (!p) {
            p = d * (0.3 * 1.5);
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
                Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }
        return a * Math.pow(2, -10 * (t -= 1)) *
            Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    },
    backIn: function(t, b, c, d, s) { //回退加速（回退渐入）
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    backOut: function(t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 3.70158; //回缩的距离
        }
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d / 2) < 1) {
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        }
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d) { //弹球减振（弹球渐出）
        return c - tween.bounceOut(d - t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
        }
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d) {
        if (t < d / 2) {
            return tween.bounceIn(t * 2, 0, c, d) * 0.5 + b;
        }
        return tween.bounceOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    }
};
