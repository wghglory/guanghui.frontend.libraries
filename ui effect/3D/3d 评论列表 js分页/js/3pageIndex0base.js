var pageSize = 4; // how many data should be displayed in a page
var currentPageIndex = 0;

var messageListContent = document.getElementById('messageList');

function loadData(pageIndex) { //click first page, pageIndex = 0
    var messageListHtml = '';

    var startIndex = pageIndex * pageSize; //starting data
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


(function loadPagination() {

    var footerContent = document.querySelector('footer');

    var pageCount = Math.ceil(data.length / pageSize);


    var paginationHtml = '<a href="javascript:;">首页</a><a href="javascript:;">上一页</a>';
    for (var i = 0; i < pageCount; i++) {
        if (i == currentPageIndex) {
            paginationHtml += '<a href="javascript:;" class="active">' + (i + 1) + '</a>';
        } else {
            paginationHtml += '<a href="javascript:;">' + (i + 1) + '</a>';
        }
    }
    paginationHtml += '<a href="javascript:;">下一页</a><a href="javascript:;">末页</a>';
    footerContent.innerHTML = paginationHtml;

    var aCollection = document.getElementsByTagName('a');
    var aArray = [].slice.call(aCollection);
    aPages = aArray.slice(2, aCollection.length - 2); // 获取除去首页尾页和上一页下一页，带页码的a

    for (var i = 0; i < aPages.length; i++) {
        aPages[i].index = i;
        aPages[i].onclick = function() {
            // console.log(aPages[currentPageIndex]);
            aPages[currentPageIndex].className = '';

            currentPageIndex = this.index;
            this.className = 'active';
            loadData(currentPageIndex);
        };
    }

    // first page
    aCollection[0].onclick = function() {
        aPages[currentPageIndex].className = '';
        currentPageIndex = 0;
        aPages[currentPageIndex].className = 'active';

        loadData(currentPageIndex);
    };
    //pre page
    aCollection[1].onclick = function() {

        if (currentPageIndex == 0) {
            return;
        }

        aPages[currentPageIndex].className = '';
        currentPageIndex -= 1;
        aPages[currentPageIndex].className = 'active';

        loadData(currentPageIndex);

    };
    //next page
    aCollection[aCollection.length - 2].onclick = function() {

        if (currentPageIndex == pageCount - 1) {
            return;
        }

        aPages[currentPageIndex].className = '';
        currentPageIndex += 1;
        aPages[currentPageIndex].className = 'active';

        loadData(currentPageIndex);
    };
    //last page
    aCollection[aCollection.length - 1].onclick = function() {
        aPages[currentPageIndex].className = '';
        currentPageIndex = pageCount - 1;
        aPages[currentPageIndex].className = 'active';

        loadData(currentPageIndex);
    };

    //laod first page when loading
    loadData(0);

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
