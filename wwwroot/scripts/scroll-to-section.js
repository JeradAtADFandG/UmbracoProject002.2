$(function () {

    function scrollToSection(hash, removeHash) {
        var target = $(hash);
            target = target.length ? target : $('[name=' + hash.slice(1) + ']');
            
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top - $("#mainNav").outerHeight()
            }, 1500, "swing");

            if(removeHash) {
                history.replaceState({}, document.title, window.location.href.split('#')[0]);
            }
        }
    }

    /***************** Smooth Scrolling ******************/
    $('a[href*="#smooth-"]').click(function(e) {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var hash = this.hash.replace("smooth-", '');
            
            scrollToSection(hash, false);
            // blur the link to remove its focus
            this.blur();
            // don't change URL address and remain on page
            return false;
        }
    });

    // Check for any hash on load
    (function() {
        if (location.hash) {
            var hash = location.hash.replace("smooth-",'');
            scrollToSection(hash, true);
        }
    }());

}());