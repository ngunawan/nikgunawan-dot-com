 $(document).ready(function () {

     //smooth transition between pages -----------
     $('body').fadeIn();

     //smooth scrolling for anchorlinks ----------
     $('a.anchorlink').on('click', function (e) {
         // Make sure this.hash has a value before overriding default behavior
         if (this.hash !== "") {
             e.preventDefault();
             var hash = this.hash;
             // Using jQuery's animate() method to add smooth page scroll
             $('html, body').animate({
                 scrollTop: $(hash).offset().top
             }, 400, function () {
                 // Add hash (#) to URL when done scrolling (default click behavior)
                 window.location.hash = hash;
             });
         } 
     });

     //flipblock animations -----------------------
     $('.flipblock').hover(function () {
         var flipblock_inactive = $(this).parent().parent().children().first();
         flipblock_inactive.children('.flipblock--back').toggleClass("flipped");
         flipblock_inactive.children('.flipblock--front').toggleClass("flipped");
     });

     //navbar hamburger toggles --------------------
     function toggleBurgerMenu() {
         $('.navbar__hamburger').toggleClass('clicked');
         $('.navbar').toggleClass('navburger');

         if ($('.navbar').hasClass('navburger')) {
             //add event handlers to links when hamburger menu is open
             $('.navbar__link').on('click', toggleBurgerMenu);
             $('.navbar__link-wrapper').on('click', toggleBurgerMenu);
         } else {
             //remove handlers when closing hamburger menu
             $('.navbar__link').off('click', toggleBurgerMenu);
             $('.navbar__link-wrapper').off('click', toggleBurgerMenu);
         }
     }
     $('.navbar__hamburger').on('click', toggleBurgerMenu);

     //gallery controls ----------------------------
     $('.gallery__thumbnail').on('click', function() {
         let img_url = "images/" + $(this).attr('data-img-url');
         $('.gallery').children('.black-overlay').css({
             'opacity': '1',
             'z-index': '9000'
         });
         $('.gallery__preview').attr('src', img_url);
     });
     
     function closePreview() {
          $('.gallery').children('.black-overlay').css({
             'opacity': '0',
             'z-index': '-9000'
         });
         $('.gallery__preview').attr('src', "");
     }
     
     $('.gallery').children('.black-overlay').on('click', closePreview);

 });













