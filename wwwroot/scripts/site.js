$(function () {

    setTimeout(() => {
        $("img.parallax-slider").attr('alt', 'Main Banner Background Image');
    }, 500);

    var $heroArea = $("#heroArea"),
        $window = $(window),
        $mainNav = $("#mainNav"),
        heroAreaHeight = $heroArea.outerHeight(),
        headerHeight = $("#header").outerHeight(),
        navAreaContentHeight = $("#navAreaContent").outerHeight(),
        cutoff = function () { return headerHeight + heroAreaHeight - navAreaContentHeight; };

    var initStickyNav = function () {
        var flag = false,
            stickyNavClass = "sticky-nav";

        return function () {
            if ($window.scrollTop() > cutoff() && !flag) {
                flag = true;
                $mainNav.addClass(stickyNavClass);
            } else if ($window.scrollTop() < cutoff() && flag) {
                flag = false;
                $mainNav.removeClass(stickyNavClass);
            }
        };
    }();
    $window.resize(function () {
        heroAreaHeight = $heroArea.outerHeight();
    });

    var initStickySmothScroll = function () {
        var flagMoveSticky = false,
            flagMakeSticky = false,
            flagAssignVar = false,
            stickyClass = "sticky",
            scrollOffset = 500,
            scrollBuffer = 1000,
            $window = $(window),
            $body = $("body"),
            $footer = $(".footer"),
            $footerNavTopScroll = $(".footer .nav-top-scroll");

        var param = {
            scrollBottomCutoff: 0,
            scrollBar: 0,
            heightLimit: 0,
            visiblePageHeight: 0
        };

        return function () {
            // Optimize variable assignment
            if(!flagAssignVar) {
                param.scrollBottomCutoff = $body.outerHeight() - ($window.height() + $footer.outerHeight());
                param.scrollBar = $window.scrollTop();
                param.heightLimit = scrollOffset + scrollBuffer + $footer.outerHeight();
                param.visiblePageHeight = $body.outerHeight() - $window.height();
                flagAssignVar = true;
            }

            // Enable sticky scroll-to-top navigation if page is long enough
            if(param.heightLimit < param.visiblePageHeight)
            {
                // Make the scroll-to-top navigation sticky
                if (param.scrollBar < param.scrollBottomCutoff && !flagMakeSticky) {
                    $footerNavTopScroll.addClass(stickyClass);
                    flagMakeSticky = true;

                } else if (param.scrollBar > param.scrollBottomCutoff && flagMakeSticky) {
                    $footerNavTopScroll.removeClass(stickyClass);
                    flagMakeSticky = false;
                }

                // Move the scroll-to-top navigation up or down
                if (param.scrollBar > scrollOffset && !flagMoveSticky) {
                    $footerNavTopScroll.animate({ bottom: '5rem' }, 700);
                    $footerNavTopScroll.css({ 'transform': "rotate(0deg)" });
                    flagMoveSticky = true;
                } else if (param.scrollBar < scrollOffset && flagMoveSticky) {
                    $footerNavTopScroll.animate({ bottom: '-6rem' }, 700);
                    $footerNavTopScroll.css({ 'transform': "rotate(180deg)" });
                    flagMoveSticky = false;
                }

                flagAssignVar = false;
            }
        };
    }();

    initStickyNav();
    initStickySmothScroll();

    $(window).scroll(function () {
         initStickyNav();
         initStickySmothScroll();
    });
}());