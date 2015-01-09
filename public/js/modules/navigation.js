"use strict";

define(['jquery', 'modules/helpers', 'underscore', 'foundation'], function($, helpers, _) {
    var navigation = {};

    navigation.init = function() {
        this.notifications();
        this.sidebar();
    };

    navigation.sidebar = function() {

    };

    navigation.notifications = function() {
        $('a[data-notifications]').each(function() {
            $(this).off('click', showDropdown);
            $(this).on('click', showDropdown);
        });

        $(document).mouseup(function(e) {
            $('a[data-notifications]').each(function() {
                var drop = $('#' + $(this).attr('data-notifications'));
                if ($(this).has(e.target).length !== 0)
                    return;
                if (!drop.is(e.target) && drop.has(e.target).length === 0)
                    if (drop.hasClass('pDropOpen')) {
                        drop.removeClass('pDropOpen');
                        helpers.hideDropDownScrolls();
                    }
            })
        });
    };

    function showDropdown(e) {
        var drop = $('#' + $(this).attr('data-notifications'));
        var scroll = $('#' + $(drop).attr('data-scroll'));
        if (drop.css('visibility') === 'visible') {
            drop.removeClass('pDropOpen');

            helpers.hideDropDownScrolls();

            return;
        }
        var pageContent = $(this).parents('#page-content > div');
        var insidePage = pageContent.length > 0;
        var pageOffsetTop = 0;
        var pageOffsetLeft = 0;
        if (insidePage) {
            var pOffset = pageContent.offset();
            pageOffsetTop = pOffset.top;
            pageOffsetLeft = pOffset.left;
        }

        var left = (($(this).offset().left - $(window).scrollLeft() - pageOffsetLeft) - 250);
        var leftExtraOffset = $(drop).attr('data-left-offset');
        if (_.isUndefined(leftExtraOffset)) {
            leftExtraOffset = 0;
        }
        left += Number(leftExtraOffset);
        left = left + 'px';

        var topOffset = $(this).offset().top - $(window).scrollTop() - pageOffsetTop;
        var top = $(this).outerHeight() + topOffset;
        var topExtraOffset = $(drop).attr('data-top-offset');
        if (_.isUndefined(topExtraOffset)) {
            topExtraOffset = 0;
        }
        top += Number(topExtraOffset);
        top = top + 'px';
        $(drop).addClass('pDropOpen');
        $(drop).css({'position': 'absolute', 'left': left, 'top': top});

        if ($(scroll).getNiceScroll().length < 1)
            $(scroll).niceScroll({
                cursorcolor: "#a9b1bf",
                cursorwidth: 7,
                cursorborder: "1px solid #fff"
            });

        $(scroll).getNiceScroll().resize();
        $(scroll).getNiceScroll().show();
    }

    return navigation;
});