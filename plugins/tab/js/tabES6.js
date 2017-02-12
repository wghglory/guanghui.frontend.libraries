"use strict"

function Tab(id) {
    this.tabSection = document.getElementById(id);
    this.lis = this.tabSection.querySelectorAll('.tabNav>li');
    this.divs = this.tabSection.querySelectorAll('.tabNav~div');

    this.preIndex = 0;
}

Tab.prototype.init = function() {
    var instance = this;
    for (let i = 0; i < this.lis.length; i++) {

        this.lis[i].onclick = function() {
            instance.change(i);
        }
    }
};

Tab.prototype.change = function(index) {
    // for (var i = 0; i < this.lis.length; i++) {
    //     this.lis[i].className = 'gradient';
    //     this.divs[i].style.display = 'none';
    // }
    this.lis[this.preIndex].className = 'gradient';
    this.divs[this.preIndex].style.display = 'none';
    this.preIndex = index;

    this.lis[index].className = 'active';
    this.divs[index].style.display = 'block';
};
