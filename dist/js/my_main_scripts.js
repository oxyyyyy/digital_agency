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
