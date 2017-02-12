$(function() {
    //初始化 高度 当前导航所在索引值
    var height = $(window).height(),
        num = $('#nav li.choose').index(),
        animating = false;
    $('#container .item-1').addClass('show');




    //默认将每个模块的高度置为可见高度
    $('.section').height(height);
    //当窗口大小变动，重新计算高度
    $(window).resize(function() {
        height = $(window).height();
        $('.section').height(height);
    });




    //导航点击
    $('#nav li').click(function() {
        var index = $(this).index();
        num = index;
        $('#container').animate({ top: -index * height }, function() {
            //将其他元素隐藏，显示当前选中的元素
            $('#container .section').removeClass('show').eq(index).addClass('show');
        });
        //将其他元素隐藏，显示当前选中的元素
        $(this).addClass('choose').siblings().removeClass('choose');
    });




    $(document).mousewheel(function(e, direction) {
        e.preventDefault();
        if (animating) {
            return;
        }
        animating = true;
        console.log(direction);
        if (direction < 0) { //down -1, up 1
            num++;
            num = num > 6 ? 6 : num;
        } else {
            num--;
            num = num < 0 ? 0 : num;
        }
        $('#container').stop().animate({ top: -num * height }, function() {
            $('#container .section').removeClass('show').eq(num).addClass('show');
            animating = false;
        });
        $('#nav li').removeClass('choose').eq(num).addClass('choose');
    });

});
