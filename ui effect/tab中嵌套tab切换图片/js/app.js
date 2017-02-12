var leftList = document.querySelectorAll('.container>ul li');
var rightDivs = document.querySelectorAll('section>div');


var preLeftListIndex = 0;

for (let i = 0; i < leftList.length; i++) {

    leftList[i].onmouseover = function() {

        leftList[preLeftListIndex].className = '';
        rightDivs[preLeftListIndex].style.display = 'none';
        preLeftListIndex = i;

        this.className = 'active';
        rightDivs[i].style.display = 'block';

    };

}

// wrong! 这样做结果是只有滑到左边最后一组li图片正常切换
// for (var i = 0; i < rightDivs.length; i++) {

//     var imgs = rightDivs[i].getElementsByTagName('img');
//     var rightTabs = rightDivs[i].querySelectorAll('li');
//     var preRightLi = 0;

//     for (let j = 0; j < rightTabs.length; j++) {

//         rightTabs[j].onmouseover = function() {
//             alert(imgs[j].src);   //imgs是最后一组li对应的图片，因为鼠标over的速度远远小于for循环。即鼠标over时imgs变量为for循环结束的值！！！！！！！！！！！
//             rightTabs[preRightLi].className = '';
//             imgs[preRightLi].style.display = 'none';
//             preRightLi = j;

//             this.className = 'active';
//             imgs[j].style.display = 'block';
//         };
//     }

// }


// good~
// for (var i = 0; i < rightDivs.length; i++) {

//     (function() {

//         var imgs = rightDivs[i].getElementsByTagName('img');
//         var rightTabs = rightDivs[i].querySelectorAll('li');
//         var preRightLi = 0;

//         for (let j = 0; j < rightTabs.length; j++) {

//             rightTabs[j].onmouseover = function() {

//                 rightTabs[preRightLi].className = '';
//                 imgs[preRightLi].style.display = 'none';
//                 preRightLi = j;

//                 this.className = 'active';
//                 imgs[j].style.display = 'block';
//             };
//         }

//     })();

// }


// for (var i = 0; i < rightDivs.length; i++) {

//     (function(obj) {

//         var imgs = obj.getElementsByTagName('img');
//         var rightTabs = obj.querySelectorAll('li');
//         var preRightLi = 0;

//         for (let j = 0; j < rightTabs.length; j++) {

//             rightTabs[j].onmouseover = function() {

//                 rightTabs[preRightLi].className = '';
//                 imgs[preRightLi].style.display = 'none';
//                 preRightLi = j;

//                 this.className = 'active';
//                 imgs[j].style.display = 'block';
//             };
//         }

//     })(rightDivs[i]);

// }


for (let i = 0; i < rightDivs.length; i++) {

    let imgs = rightDivs[i].getElementsByTagName('img');
    let rightTabs = rightDivs[i].querySelectorAll('li');
    let preRightLi = 0;

    for (let j = 0; j < rightTabs.length; j++) {

        rightTabs[j].onmouseover = function() {

            rightTabs[preRightLi].className = '';
            imgs[preRightLi].style.display = 'none';
            preRightLi = j;

            this.className = 'active';
            imgs[j].style.display = 'block';
        };
    }

}
