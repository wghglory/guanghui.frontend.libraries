var modal = document.getElementById('modal');
var ul = modal.querySelector('ul');
var lis = ul.children;

// modal.style.opacity = 1;   // 太快还不行
setTimeout(function() {
    modal.style.opacity = 1;
}, 30);
modal.addEventListener("transitionend", modalEnd, false);
//完全显示后变换弹窗高度，top，ul位移，li入场翻转
function modalEnd() {
    this.removeEventListener('transitionend', modalEnd, false);
    modal.style.height = '230px';
    modal.style.top = 'calc(50% - 120px)';

    ul.style.transform = 'translateY(0)';

    for (var i = 0; i < lis.length; i++) {
        lis[i].style.transition = '0.3s ' + (200 + i * 200) + 'ms';
        lis[i].style.opacity = 1;
        lis[i].style.transform = "rotateX(0deg)";
        // lis[i].hasClicked = false;
        // lis[i].index = i;
        lis[i].onmouseover = liOver;
        lis[i].onmouseout = function() {
            // if (!this.hasClicked) {
            //     this.style.transform = "rotateY(0deg)";
            // }
        };
        lis[i].onclick = liClick;
    }
}

function liOver() {

}

function liClick() {

}
