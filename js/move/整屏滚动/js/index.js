$(function() {
    //初始化 高度 当前导航所在索引值
    var height = $(window).height(),
        num = $('#nav li.choose').index(),
        animating = false;
    $('#container .item-1').addClass('show');

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



    //默认将每个模块的高度置为可见高度
    $('.section').height(height);
    //当窗口大小变动，重新计算高度
    $(window).resize(function() {
        height = $(window).height();
        $('.section').height(height);
    });


    $(document).mousewheel(function(e, direction) {
        e.preventDefault();
        if (animating) {
            return;
        }
        animating = true;
        if (direction < 0) {
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
        $('#guide li').removeClass('choose').eq(num).addClass('choose');
        modAnimate();
    });


    // 12926.00
    var timer = 0;

    function modAnimate() {
        if (num == 1) {
            clearInterval(timer);
            var count = 0;
            timer = setInterval(function() {
                count += 111.99;
                if (count > 12926) {
                    count = 12926.00
                    clearInterval(timer);
                }
                $('#container .salary h1').html(count.toFixed(2));
            }, 33);
        }
    }

    // teacher click
    $('#container .item-6 .photo').click(function() {
        var num = $(this).data('num')
        $('#layer').addClass('show').find('li').removeClass('show').eq(num).addClass('show');
        $('#layer .arrow').show();
        if (num == 0) {
            $('#layer .arr-left').hide();
        }
        if (num == $('#layer li').length - 1) {
            $('#layer .arr-right').hide();
        }
    });

    $('#layer .close').click(function() {
        $('#layer').animate({ opacity: 0 }, function() {
            $(this).removeClass('show').css('opacity', 1).find('li').removeClass('show');
        });
    });

    $('#layer .arrow').click(function() {
        var num = $('#layer li.show').index(),
            last = $('#layer li').length - 1;
        if ($(this).hasClass('arr-left')) {
            num--;
            if (num < 0) {
                return;
            }
        }
        if ($(this).hasClass('arr-right')) {
            num++;
            if (num > last) {
                return;
            }
        }
        if (num > 0 && num < last) {
            $('#layer .arrow').show();
        } else if (num <= 0) {
            $('#layer .arr-left').hide();
            $('#layer .arr-right').show();
        } else if (num >= last) {
            $('#layer .arr-left').show();
            $('#layer .arr-right').hide();
        }
        $('#layer li').removeClass('show').eq(num).addClass('show');
    })
});
