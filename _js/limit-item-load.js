$( document ).ready( function() {

    if ( $('.brochure-item-wrapper').children().length <= 9 ) {
        // No need to load more
        return;
    } else {

        console.log("More than 9 children");

        var minCount = 9;
        var maxCount = 18;
        var itemsCount = $('.brochure-item-container > .brochure-item-wrapper').length;
        var initialLoad = itemsCount - minCount;

        $('.brochure-item-container > .brochure-item-wrapper').slice(0, minCount).removeClass( 'd-none' );

        $(window).scroll(function() {

            if( $(window).scrollTop() + $(window).height() >= $(document).height() - 800) {

                $('.brochure-item-container > .brochure-item-wrapper').slice( minCount, maxCount ).removeClass( 'd-none' );
          
                minCount += 9;
                maxCount += 9;
          
            }

          });
    }

});