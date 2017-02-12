var modal = document.getElementById('modal');
var ul = modal.querySelector('ul');
var lis = ul.children;
var contact = document.getElementsByClassName('contact')[0];

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
        lis[i].style.transition = '0.3s ' + (200 + i * 200) + 'ms'; //每个li依次延迟出场
        lis[i].style.opacity = 1;
        lis[i].style.transform = "rotateX(0deg)";
        //以上是每个li出场动画

        lis[i].hasClicked = false;
        lis[i].index = i; // 判断当前点击的li index

        // FF 下这样似乎有问题，IE CHROME OK
        lis[i].onmouseover = liOver;
        lis[i].onmouseout = liOut;
        lis[i].onclick = liClick;

    }
}

function liOver(e) { //只有没点击的li才有over效果
    if (!this.hasClicked) {
        var mousePosX = e.clientX - getLeft(this);

        this.style.transition = '0.5s'; //必须js在这加：要在over时候覆盖上面lis[i].style.transition = '0.3s ' + (200 + i * 200) + 'ms';

        if (mousePosX > this.offsetWidth / 2) { //判断鼠标在li左侧还是右侧over
            this.style.transform = 'rotateY(30deg)';
        } else {
            this.style.transform = 'rotateY(-30deg)';
        }
    }
};

function liOut() {
    if (!this.hasClicked) {
        this.style.transform = 'rotateY(0deg)';
    }
};

function liClick(e) {
    var mousePosX = e.clientX - getLeft(this);
    var rotateDeg = mousePosX > this.offsetWidth / 2 ? -180 : 180; //翻转与点击左右位置有关

    // 离当前点击li越近的li先运动，最远的最后运动，要找到最远的li，当它运动结束后也就是所有运动结束的时候，此时contact入场
    var farthestDistance = 0; // 距离当前点击li最远的li index差值。比如当前点击第2个，一共4个，this.index = 1, farthestDistance = abs(3-1) = 2, farthestIndex = 3 第四个li是最远的
    var farthestIndex = 0; // 距离当前点击li最远的li index

    contact.style.display = 'block';

    for (var i = 0; i < lis.length; i++) {
        if (farthestDistance < Math.abs(i - this.index)) {
            farthestDistance = Math.abs(i - this.index);
            farthestIndex = i;
        }
        lis[i].hasClicked = true;
        //当前点击li不延迟，向上下分别延迟，距离越远延迟越大
        lis[i].style.transition = '0.5s ' + Math.abs(i - this.index) * 100 + 'ms cubic-bezier(0.115, -0.195, 0.255, -0.280)';
        lis[i].style.transform = 'rotateY(' + rotateDeg + 'deg)';
        lis[i].style.opacity = 0.1;
    }

    // 距离当前点击li最远的li完成了过度，此时所有的过度都完成了，准备contact登场
    lis[farthestIndex].addEventListener('transitionend', end, false);

    function end() {
        this.removeEventListener('transitionend', end, false);
        contact.style.opacity = 1;
    }

}

function getLeft(obj) {
    var left = 0;
    while (obj) {
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    return left;
}


var back = contact.querySelector('a');
var close = modal.querySelector('.close');

back.onclick = function() {
    contact.style.opacity = 0;
    contact.addEventListener('transitionend', end, false);

    function end() {
        this.removeEventListener('transitionend', end, false);

        contact.style.display = 'none';

        for (var i = 0; i < lis.length; i++) {
            lis[i].hasClicked = false;
            lis[i].style.transition = '0.5s ' + (lis.length - i - 1) * 100 + 'ms';
            lis[i].style.transform = 'rotateY(0deg)';
            lis[i].style.opacity = 1;
        }
    }
};

close.onclick = function() {
    modal.style.transition = '.8s height,.6s top,0.4s opacity .2s';
    modal.style.height = '40px';
    modal.style.top = 'calc(50% - 80px)';
    modal.style.opacity = 0;
};
