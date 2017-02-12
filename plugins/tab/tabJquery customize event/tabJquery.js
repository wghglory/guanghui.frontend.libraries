(function($) {

    var defaults = {
        heads: ['1', '2', '3'],
        bodies: ['1111111', '2222222', '3333333'],
        events: 'click'
    };

    var settings = {};
    var $parent = null;

    function fnTab(options) {
        $parent = this;
        settings = $.extend(settings, defaults, options);

        create();
        bind();
    }

    function create() {
        for (var i = 0; i < settings.heads.length; i++) {
            var $input = $('<input type="button" value="' + settings.heads[i] + '">');
            if (i == 0) {
                $input.attr('class', 'active');
            }
            $parent.append($input);
        }

        for (var i = 0; i < settings.bodies.length; i++) {
            var $div = $('<div>' + settings.bodies[i] + '</div>');
            if (i == 0) {
                $div.css('display', 'block');
            }
            $parent.append($div);
        }
    }

    function bind() {
        $parent.find('input').on(settings.events, function() {
            $parent.trigger('beforeChange');

            $parent.find('input').attr('class', '');
            $(this).attr('class', 'active');
            $parent.find('div').css('display', 'none');
            $parent.find('div').eq($(this).index()).css('display', 'block');

            $parent.trigger('afterChange');
        });
    }

    $.fn.extend({
        tabs: fnTab
    });

})(jQuery);
