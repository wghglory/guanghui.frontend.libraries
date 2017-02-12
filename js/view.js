/**
 * return visiable area width and height
 * @return {[json]}  width and height
 */
function clientView() {
    // if (window.innerWidth) // ie9 +  最新浏览器
    // {
    //     return {
    //         w: window.innerWidth,
    //         h: window.innerHeight
    //     };
    // } else if (document.compatMode === "CSS1Compat") // 标准浏览器
    // {
    //     return {
    //         w: document.documentElement.clientWidth,
    //         h: document.documentElement.clientHeight
    //     };
    // }
    // return { // 怪异浏览器
    //     w: document.body.clientWidth,
    //     h: document.body.clientHeight
    // };

    return {
        w: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        h: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    };
}

/**
 * window scroll
 * @return {[json]}  left and top
 * usage:
 *         window.onscroll = function() {
                console.log(scroll().top);
           }
 */
function scroll() {
    // if (window.pageYOffset) //  ie9+ 和其他浏览器
    // {
    //     return {
    //         scrollLeft: window.pageXOffset,
    //         scrollTop: window.pageYOffset
    //     };
    // } else if (document.compatMode == "CSS1Compat") // 声明的了 DTD
    // // 检测是不是怪异模式的浏览器 -- 就是没有 声明<!DOCTYPE html>
    // {
    //     return {
    //         scrollLeft: document.documentElement.scrollLeft,
    //         scrollTop: document.documentElement.scrollTop
    //     };
    // }
    // return { //  剩下的肯定是怪异模式的
    //     scrollLeft: document.body.scrollLeft,
    //     scrollTop: document.body.scrollTop
    // };

    return {
        scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        scrollLeft: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}

/**
 * 距离浏览器左上角（0，0）距离坐标！
 * @param  {[node]} obj
 * @return {[json]}     left and top
 * usage:
 *     var p = getPos(oDiv3);
       alert(p.top);
 */
function getPos(obj) {
    var pos = {
        left: 0,
        top: 0
    };

    while (obj) {
        pos.left += obj.offsetLeft;
        pos.top += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return pos;
}

/**
 * detect screen resolution分辨率
 * @return {[json]}
 */
function resolution() {
    return {
        w: window.screen.width,
        h: window.screen.height
    };
}
