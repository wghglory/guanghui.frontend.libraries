var list = document.querySelector('.list');
var divs = list.getElementsByTagName('div');
var btns = document.getElementsByTagName('input');

// show
btns[0].onclick = function() {
    for (var i = 0; i < divs.length; i++) {
        // divs[i].style.transition = '0.5s ' + i * 100 + 'ms';
        // divs[i].style.transform = 'rotateX(0deg)';

        divs[i].className = 'open';


        // for循环速度太快，以至于打开过程中span几乎同时过渡。这样阴影效果看来是整体变化，要想一个一个变，需要给span添加过渡延迟时间
        var span = divs[i].children[0];
        span.style.transition = '1s ' + i * 40 + 'ms';
    }
};

// hide
btns[1].onclick = function() {
    for (var i = 0; i < divs.length; i++) {
        // divs[i].style.transition = '0.5s ' + (divs.length - i) * 100 + 'ms';
        // divs[i].style.transform = 'rotateX(60deg)';

        divs[i].className = '';

        // 收缩时候最后一个延迟时间最短，第一个最长
        var span = divs[i].children[0];
        span.style.transition = '.5s ' + (divs.length - 1 - i) * 100 + 'ms';

    }
};
