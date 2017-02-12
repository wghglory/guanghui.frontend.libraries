// var pageSize = 3; // how many data should be displayed in a page

// 加载数据和当前页码、每页pageSize有关。与总共有多少页码无关！

var messageListContent = document.getElementById('messageList');

function loadData(pageIndex, pageSize) { //click first page, pageIndex = 1, not 0 based
    var messageListHtml = '';

    var pageSize = pageSize || 5;

    var startIndex = (pageIndex - 1) * pageSize; //starting data
    var endIndex = startIndex + pageSize; //ending data
    endIndex = endIndex > data.length ? data.length : endIndex;

    for (var i = startIndex; i < endIndex; i++) {

        messageListHtml += '<li><div class="pic"></div><div class="dot"></div><div class="chat"><div class="post" data-id="' + data[i].post.id + '"><h4><span></span>' + data[i].post.username + '<time>[' + formatDate(data[i].post.time) + ']</time></h4><p>' + data[i].post.content + '</p></div>';

        for (var r in data[i].replies) {
            messageListHtml += '<div class="reply" data-id="' + data[i].replies[r].id + '"><h4><span></span>' + data[i].replies[r].username + '<time>[' + formatDate(data[i].replies[r].time) + ']</time></h4><p>' + data[i].replies[r].content + '</p></div>';

        }

        messageListHtml += '</div></li>';
    }
    messageListContent.innerHTML = messageListHtml;
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
