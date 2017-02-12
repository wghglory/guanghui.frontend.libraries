var oList = document.getElementById("list");
var aLi = oList.children;
var oPrev = document.getElementById("prev");
var oNext = document.getElementById("next");
var arr = [];
//arr.unshift(arr.pop());   //尾部剪切到头部
//arr.push(arr.shift());    //头部剪切到尾部
for (var i = 0; i < aLi.length; i++) {
    var oSpan = aLi[i].children[0]; //存放模糊图片
    arr[i] = {
        left: getStyle(aLi[i], "left"),
        liOpacity: getStyle(aLi[i], "opacity"),
        scale: getStyle(aLi[i], "transform"),
        zIndex: getStyle(aLi[i], "z-index"),
        spanOpacity: getStyle(oSpan, "opacity")
    };
}

oPrev.onclick = function() {
    arr.unshift(arr.pop());
    setStyle();
};
oNext.onclick = function() {
    arr.push(arr.shift());
    setStyle();
};

function setStyle() {
    for (var i = 0; i < aLi.length; i++) {
        var oSpan = aLi[i].children[0];
        aLi[i].style.left = arr[i].left;
        aLi[i].style.opacity = arr[i].liOpacity;
        aLi[i].style.WebkitTransform = arr[i].scale;
        aLi[i].style.zIndex = arr[i].zIndex;
        oSpan.style.opacity = arr[i].spanOpacity;
        // arr[i]={left:getStyle(aLi[i],"left"),opacity:getStyle(aLi[i],"opacity"),scale:getStyle(aLi[i],"transform")};
    }
}

function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    return getComputedStyle(obj)[attr];
}
