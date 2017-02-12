var aPicList = document.getElementById('picList').children;
var textList = document.getElementById('textList').children;
var aBtns = document.getElementById('btns').children;

var iNow = 0;

for (var i = 0; i < aBtns.length; i++) {
    aBtns[i].index = i;
    aBtns[i].onclick = function() {
        aBtns[iNow].className = '';
        hidePicAndText(iNow);  //hide：隐藏之前的结束后，显示刚被点击的

        iNow = this.index;   // after hide, update inow and show current
        aBtns[iNow].className = 'active';
    };
}

function hidePicAndText(n){
    aPicList[n].className = 'hide';
    textList[n].className = 'hide';

    aPicList[n].addEventListener('transitionend', picShow, false);
    textList[n].addEventListener('transitionend', textShow, false);
}

function picShow(){
	this.removeEventListener('transitionend', picShow, false);
	this.style.transition = '0s';
	this.className = '';  //之前hide的结束后回到默认位置. 回到默认位置不需要过度

	aPicList[iNow].style.transition = '0.5s';  //再把当前点击对应的元素过度恢复
	aPicList[iNow].className = 'active';
}

function textShow(){
	this.removeEventListener('transitionend', textShow, false);
	this.style.transition = '0s';
	this.className = '';

	textList[iNow].style.transition = '0.5s';
	textList[iNow].className = 'active';
}
