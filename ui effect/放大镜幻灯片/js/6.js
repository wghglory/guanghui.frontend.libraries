var picUl = document.getElementById('picList');
var aPicList = picUl.children;
var textList = document.getElementById('textList').children;
var aBtns = document.getElementById('btns').children;

var oZoom = document.getElementById('zoom');
var oPic = document.querySelector('.pic');
var scale = 424 / 363; //大图/小图
scale = scale.toFixed(2);

var magnify = document.getElementById('magnify');

var iNow = 0;
var aSrc = ['img/iBannerTextBig.png', 'img/iBannerTextBig2.png', 'img/iBannerTextBig3.png'];

var timer = null;

for (var i = 0; i < aBtns.length; i++) {
    aBtns[i].index = i;
    aBtns[i].onclick = function() {
        aBtns[iNow].className = '';
        // hidePicAndText(iNow); //hide：隐藏之前的结束后，显示刚被点击的
        magnifyAnimation(iNow); // 1. 每次点击放大镜转动，结束后hidePicAndText

        iNow = this.index; // after hide, update inow and show current
        aBtns[iNow].className = 'active';
    };
}

// 2 隐藏之前点击的图片和文字
function hidePicAndText(n) {
    aPicList[n].className = 'hide';
    textList[n].className = 'hide';

    aPicList[n].addEventListener('transitionend', picShow, false); //隐藏之前结束后显示被点击的
    textList[n].addEventListener('transitionend', textShow, false);
}

// 3 图片显示：之前hide的图片结束后回到默认位置，新图片突破入场。入场结束后放大镜旋转回来
function picShow() {
    this.removeEventListener('transitionend', picShow, false);
    this.style.transition = '0s';
    this.className = ''; //之前hide的结束后回到默认位置. 回到默认位置不需要过度

    aPicList[iNow].style.transition = '0.5s'; //再把当前点击对应的元素过度恢复
    aPicList[iNow].className = 'active';

    aPicList[iNow].addEventListener('transitionend', end, false); // 4 新突破入场结束后，最后一步：放大镜旋转回来（图片和文字过渡时间一样，所以在textShow不用写了）

    function end() {
        oZoom.style.transition = '.5s';
        oPic.style.transition = '.5s';
        this.removeEventListener('transitionend', end, false);

        oZoom.style.transform = 'rotate(0deg)';
        oPic.style.transform = 'rotate(0deg)';
    }
}

// 3 文字显示：之前hide的文字结束后回到默认位置，新文字突破入场。
function textShow() {
    this.removeEventListener('transitionend', textShow, false);
    this.style.transition = '0s';
    this.className = '';

    textList[iNow].style.transition = '0.5s';
    textList[iNow].className = 'active';
}

// 放大镜左右移动只能在图片或者放大镜区域，超过则等待50ms回到左侧x=0位置
// picUl.onmousemove = function(e) {
magnify.onmousemove = function(e) { //主要这样又多一个问题：鼠标在放大镜zoom上可以左右无限拖动，所以限制范围
    var x = e.clientX - getXY(this).left; //距离picUl左边缘距离x
    var y = e.clientY - getXY(this).top;
    if ((e.clientX > getXY(this).left && e.clientX < getXY(this).left + this.offsetWidth) && (y > 0 && y < 80)) {
        clearTimeout(timer);
        timer = null;
        zoom(x);
    } else {
        if (!timer) {
            timer = setTimeout(function() {
                zoom(0);
                timer = null;
            }, 50);
        }
    }
};

// 放大镜移动，计算放大镜显示图片背景位置，添加过渡时间
function zoom(x) {
    var bigX = Math.ceil(x * scale - oPic.offsetWidth / 2);
    var time = Math.abs(oZoom.offsetLeft - (x - 92));
    document.title = time;
    console.log(oZoom.offsetLeft, x, time);
    time = time < 30 ? 0 : time;
    oPic.style.transition = time + 'ms';
    oZoom.style.transition = time + 'ms';
    oPic.style.backgroundPosition = -bigX + 'px 0';
    oZoom.style.left = (x - 92) + 'px';
}

function getXY(obj) {
    var p = {
        top: 0,
        left: 0
    };
    while (obj) {
        p.top += obj.offsetTop;
        p.left += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    return p;
}

// 1. 放大镜左旋转，结束后改变放大镜背景图为最新的图片，然后隐藏之前点击的图片和文字
function magnifyAnimation(n) {
    oZoom.style.transition = '.5s';
    oPic.style.transition = '.5s';
    oZoom.style.transform = 'rotate(-30deg)';
    oPic.style.transform = 'rotate(30deg)';
    oZoom.addEventListener('transitionend', end, false);

    function end() {
        this.removeEventListener('transitionend', end, false);
        oPic.style.backgroundImage = 'url(' + aSrc[iNow] + ')';
        hidePicAndText(n);
    }

}
