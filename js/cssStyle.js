/**
 * get or set css, most featured css function, including css3 and chain
 * note: opacity 0-100, scale 100 means same size, 200 is 2 times
 * @method fnCSS
 * @param  {[node]} obj   [node obj that needs operation]
 * @param  {[string]} attr  [attribute]
 * @param  {[string/number]} value
 * @return {[type]}       [description]
 * usage1:
 *    fnCSS.css(div1, 'rotate', 20);
 *    fnCSS.css(div1, 'scale', 200);
 *    fnCSS.css(div1, 'height', 160);
 *    fnCSS.css(div1, 'top', 500);
 *
 * usage2: last is get, others set
 *    fnCSS.css(div1, 'rotate', 20)
 *    .css(div1, 'scale', 200)
 *    .css(div1, 'height', 160)
 *    .css*div1, 'top', 500)
 *    .css(div1, 'rotate');
 */
var fnCSS = (function() {

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

    var itself = {
        css: function(obj, attr, value) {
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

            return itself;
        }
    };

    return itself;
})();



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


/**
 * especially for many style setting.
 * @param {[node]} obj      [description]
 * @param {[json]} attrJson [description]
 * usage: the order of css3 attr maters
 *     setCSS(div1, {
 *       'scale': 60,
 *       'translateY': 100,
 *       'height': 505,
 *       'rotate': 30,
 *       'opacity': 50
 *     });
 */
function setCSS(obj, attrJson) {
    for (attr in attrJson) {

        var value = attrJson[attr];
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
                setCss3(obj, attr, attrJson[attr]);
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
