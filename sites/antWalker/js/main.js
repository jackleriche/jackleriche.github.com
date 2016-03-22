$( window ).scroll(function() {
    if ( $(window).scrollTop() > 100 ) {
        $( '#scrollDown').fadeOut('slow');
    } else {
        $( '#scrollDown').fadeIn('slow');
    }
})