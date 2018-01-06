$(window).on('scroll', function () {
    
    var wScroll = $(this).scrollTop();

    // Fixed nav
    wScroll > 1 ? $('#nav').addClass('fixed-nav') : $('#nav').removeClass('fixed-nav');

    // Back To Top Appear
    wScroll > 700 ? $('#back-to-top').fadeIn() : $('#back-to-top').fadeOut();
});