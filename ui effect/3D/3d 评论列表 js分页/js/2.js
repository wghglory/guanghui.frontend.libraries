(function loadAllData() {
    var messageListContent = document.getElementById('messageList');
    var messageListHtml = '';
    for (var i = 0; i < data.length; i++) {

        messageListHtml += '<li><div class="pic"></div><div class="dot"></div><div class="chat"><div class="post" data-id="' + data[i].post.id + '"><h4><span></span>' + data[i].post.username + '<time>[' + formatDate(data[i].post.time) + ']</time></h4><p>' + data[i].post.content + '</p></div>';

        for (var r in data[i].replies) {
            messageListHtml += '<div class="reply" data-id="' + data[i].replies[r].id + '"><h4><span></span>' + data[i].replies[r].username + '<time>[' + formatDate(data[i].replies[r].time) + ']</time></h4><p>' + data[i].replies[r].content + '</p></div>';

        }

        messageListHtml += '</div></li>';
    }
    messageListContent.innerHTML = messageListHtml;
})();


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
