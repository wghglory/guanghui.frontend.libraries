var picUl = document.getElementById('list');
var lis = picUl.children;
var iZ = document.documentElement.clientWidth / 2;
var iNow = 0;
var btns = document.getElementById('btns').children;

picUl.style.transformOrigin = 'center center ' + iZ + 'px';
window.onresize = function() {
    iZ = document.documentElement.clientWidth / 2;
    picUl.style.transformOrigin = 'center center ' + iZ + 'px';
}

for (var i = 0; i < btns.length; i++) {
    btns[i].index = i;
    btns[i].onclick = function() {
        if (iNow == this.index) {
            return;
        }
        btns[iNow].className = '';
        tab(iNow, this.index);
        iNow = this.index;
        btns[iNow].className = 'active';

    };
}

function tab(iOld, iNow) {
    picUl.style.transition = '.5s';
    picUl.addEventListener('transitionend', end, false);
    if (iOld > iNow) {
        lis[iNow].className = 'prev';
        picUl.style.transform = 'rotateY(-90deg)';
    } else {
        lis[iNow].className = 'next';
        picUl.style.transform = 'rotateY(90deg)';
    }

    function end() {
        lis[iOld].className = '';
        picUl.style.transition = 'none';
        lis[iNow].className = 'active';
        picUl.style.transform = 'rotateY(0deg)';
    }
}
