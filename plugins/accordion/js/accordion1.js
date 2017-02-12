var accordionHeaders = document.querySelectorAll('.accordion h3');

function removeCaret() { //remove caret if no content in div
    for (var i = 0; i < accordionHeaders.length; i++) {
        if (accordionHeaders[i].nextElementSibling.innerHTML == '') {
            removeClass(accordionHeaders[i].children[0], 'caret');
        }
    }
}

for (var i = 0; i < accordionHeaders.length; i++) {
    accordionHeaders[i].onclick = function() {
        this.classList.toggle("active");
        this.children[0].classList.toggle("caret-up");
        this.nextElementSibling.classList.toggle("show");

        removeCaret();
    };
}

removeCaret();
