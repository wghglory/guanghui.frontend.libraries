// var pageSize = 3; // how many data should be displayed in a page

// 加载数据和当前页码、每页pageSize有关。与总共有多少页码无关！

var messageUl = document.getElementById('messageList');

function loadData(pageIndex, pageSize) { //click first page, pageIndex = 1, not 0 based
    var messageListHtml = '';

    var pageSize = pageSize || 5;

    var startIndex = (pageIndex - 1) * pageSize; //starting data
    var endIndex = startIndex + pageSize; //ending data
    endIndex = endIndex > data.length ? data.length : endIndex;

    for (var i = startIndex; i < endIndex; i++) {

        messageListHtml += '<li><div><div class="pic"></div><div class="dot"></div><div class="chat"><div class="post" data-id="' + data[i].post.id + '"><h4><span></span>' + data[i].post.username + '<time>[' + formatDate(data[i].post.time) + ']</time></h4><p>' + data[i].post.content + '</p></div>';

        for (var r in data[i].replies) {
            messageListHtml += '<div class="reply" data-id="' + data[i].replies[r].id + '"><h4><span></span>' + data[i].replies[r].username + '<time>[' + formatDate(data[i].replies[r].time) + ']</time></h4><p>' + data[i].replies[r].content + '</p></div>';

        }

        messageListHtml += '</div><div></li>';
    }
    messageUl.innerHTML = messageListHtml;

    ulHeightChange(); //step1

    var timer = setTimeout(function() { //step2
        liShow();
        clearTimeout(timer);
    }, 1000);
}

// step1, ulheight改变，使得分页标签运动
function ulHeightChange() {
    var lis = messageUl.children;
    var heightOfUl = 0;
    for (var i = 0; i < lis.length; i++) {
        heightOfUl += (lis[i].offsetHeight + getStyle(lis[i], 'margin-bottom'));;
    }
    messageUl.style.height = heightOfUl + 'px';
}

// step2
function liShow() {
    var lis = messageUl.children;
    for (var i = 0; i < lis.length; i++) {
        lis[i].children[0].style.transform = 'rotateY(0)';
    }
}

function  formatDate(date) {    
    var  day = date.getDate();    
    if  (day < 10)    {       
        day =  '0'  + day;   
    }    
    var  month = date.getMonth() + 1;    
    if  (month < 10)    {       
        month =  '0'  + month;   
    }    
    var  year = date.getFullYear();    
    return  year +  '-'  + month +  '-'  + day + ' ' + [date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    ].join(':');
}

function getStyle(obj, attr) {
    if (attr == "rotate") {
        return obj.rotate;
    }
    var i = parseFloat(obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, false)[attr]);
    var val = i ? i : 0;
    if (attr == "opacity") {
        val *= 100;
    }
    return val;
}
