function Tab(id) {
    this.tabSection = document.getElementById(id);
    this.lis = this.tabSection.querySelectorAll('.tabNav>li');
    this.divs = this.tabSection.querySelectorAll('.tabNav~div');
}

Tab.prototype.init = function() {
    var instance = this;
    for (var i = 0; i < this.lis.length; i++) {
        this.lis[i].index = i;
        this.lis[i].onclick = function() {
            instance.change(this);
        }
    }
};

Tab.prototype.change = function(li) {
    for (var i = 0; i < this.lis.length; i++) {
        this.lis[i].className = 'gradient';
        this.divs[i].style.display = 'none';
    }
    li.className = 'active';
    this.divs[li.index].style.display = 'block';
};
