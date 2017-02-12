var accordionHeaders = document.querySelectorAll('.accordion h3');

function removeCaret() { //remove caret if no content in div
    for (var i = 0; i < accordionHeaders.length; i++) {
        if (accordionHeaders[i].nextElementSibling.innerHTML == '') {
            removeClass(accordionHeaders[i].children[0], 'caret');
        }
    }
}

function restoreAccordion() {
    for (var i = 0; i < accordionHeaders.length; i++) {
        removeClass(accordionHeaders[i], 'active');
        if (accordionHeaders[i].nextElementSibling.innerHTML != '') {
            removeClass(accordionHeaders[i].children[0], 'caret-up');
            addClass(accordionHeaders[i].children[0], 'caret'); // accordionHeaders[i].children[0].className = 'caret';
            accordionHeaders[i].nextElementSibling.style.display = 'none';
        }
    }
}

function bindHeaderClick() {
    for (var i = 0; i < accordionHeaders.length; i++) {
        accordionHeaders[i].onclick = function() {

            if (this.classList.contains('active')) { //如果再次重复点击header，还原到最初状态。无法提取出来，因为会清空class
                restoreAccordion();
            } else { //点击其他header，还原兄弟节点
                restoreAccordion();

                addClass(this, 'active');
                if (this.nextElementSibling.innerHTML != '') {
                    addClass(this.children[0], 'caret-up');
                    this.nextElementSibling.style.display = 'block'; //div under h3
                }

            }

        };
    }
}


removeCaret();
bindHeaderClick();