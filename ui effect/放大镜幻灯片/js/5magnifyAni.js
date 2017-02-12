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
for (var i = 0; i < aBtns.length; i++) {
    aBtns[i].index = i;
    aBtns[i].onclick = function() {
        aBtns[iNow].className = '';
        hidePicAndText(iNow); //hide：隐藏之前的结束后，显示刚被点击的

        iNow = this.index; // after hide, update inow and show current
        aBtns[iNow].className = 'active';
    };
}

function hidePicAndText(n) {
    aPicList[n].className = 'hide';
    textList[n].className = 'hide';

    aPicList[n].addEventListener('transitionend', picShow, false);
    textList[n].addEventListener('transitionend', textShow, false);
}

function picShow() {
    this.removeEventListener('transitionend', picShow, false);
    this.style.transition = '0s';
    this.className = ''; //之前hide的结束后回到默认位置. 回到默认位置不需要过度

    aPicList[iNow].style.transition = '0.5s'; //再把当前点击对应的元素过度恢复
    aPicList[iNow].className = 'active';
}

function textShow() {
    this.removeEventListener('transitionend', textShow, false);
    this.style.transition = '0s';
    this.className = '';

    textList[iNow].style.transition = '0.5s';
    textList[iNow].className = 'active';
}

// picUl.onmousemove = function(e) {
magnify.onmousemove = function(e) { //主要这样又多一个问题：鼠标在放大镜zoom上可以左右无限拖动，所以限制范围
    var x = e.clientX - getLeft(this); //距离picUl左边缘距离x

    if (e.clientX > getLeft(this) && e.clientX < getLeft(this) + this.offsetWidth) {
        zoom(x);
    }
};

function zoom(x) {
    var bigX = Math.ceil(x * scale - oPic.offsetWidth / 2);
    oPic.style.backgroundPosition = -bigX + 'px 0';
    oZoom.style.left = (x - 92) + 'px';
}

function getLeft(obj) {
    var left = 0;
    while (obj) {
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    return left;
}
