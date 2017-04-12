// WOW.js initialization
$(window).on('load', function() {
    new WOW().init();
});

// Preloader
$(window).on('load', function() {
    var $preloader = $('#page-preloader'),
        $spinner = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
});

// Smooth anchors + active menu item
$(document).ready(function() {
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('.menu_link').on('click', function(e) {
        e.preventDefault();
        $(document).off("scroll");

        $('.menu_link').each(function() {
            $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top + 2
        }, 500, 'swing', function() {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $('#main_menu_ul li a').each(function() {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.offset().top <= scrollPos && refElement.offset().top + refElement.height() > scrollPos) {
            $('#main_menu_ul li a').removeClass("active");
            currLink.addClass("active");
        } else {
            currLink.removeClass("active");
        }
    });
}
