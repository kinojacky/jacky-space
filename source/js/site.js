// Control nav-menu-bar open
function openNav() {
  document.getElementById("overlayNav").style.visibility = "visible";
  document.getElementById("overlayNav").style.opacity = "1";
}

// Control nav-menu-bar close
function closeNav() {
  document.getElementById("overlayNav").style.visibility = "hidden";
  document.getElementById("overlayNav").style.opacity = "0";
}

(function ($) {
  "use strict";

  $('[data-toggle="tooltip"]').tooltip()

  // Preloader (if the #preloader div exists)
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }

    /* Background loading full-size images */
    $('.gallery-item').each(function() {
        var src = $(this).attr('href');
        var img = document.createElement('img');

        img.src = src;
        $('#image-cache').append(img);
    });
  });

  // Isotope Portfolio
  (function() {
    var grid = $('.grid').isotope({
      itemSelector: '.grid-item',
      percentPosition: true,
      masonry: {
        // use outer width of grid-sizer for columnWidth
        columnWidth: '.grid-sizer'
      }
    });

    grid.imagesLoaded(function() {
      grid.isotope();
    });

    grid.isotope({
      filter: '*'
    });

    // filter items on button click
    $('#isotope-filters').on('click', 'a', function() {
      var filterValue = $(this).attr('data-filter');
      grid.isotope({
        filter: filterValue
      });
    });

    // filter items on tag click
    $('.post-tag').on('click', 'a', function() {
      var filterValue = $(this).attr('data-filter');
      grid.isotope({
        filter: filterValue
      });
      $('#isotope-filters a[data-filter="' + filterValue + '"]').focus();
    });

  })();

  /* Magnific Popup */
  $('.gallery-item').magnificPopup({
      type: 'image',
      gallery: {
          enabled: true
      }
  });

//
//   // Back to top button
//   $(window).scroll(function() {
//     if ($(this).scrollTop() > 100) {
//       $('.back-to-top').fadeIn('slow');
//     } else {
//       $('.back-to-top').fadeOut('slow');
//     }
//   });
//   $('.back-to-top').click(function(){
//     $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
//     return false;
//   });
//
//   // Initiate the wowjs animation library
//   new WOW().init();
//
//   // Header scroll class
//   $(window).scroll(function() {
//     if ($(this).scrollTop() > 100) {
//       $('#header').addClass('header-scrolled');
//     } else {
//       $('#header').removeClass('header-scrolled');
//     }
//   });
//
//   if ($(window).scrollTop() > 100) {
//     $('#header').addClass('header-scrolled');
//   }
//
//   // Smooth scroll for the navigation and links with .scrollto classes
//   $('.main-nav a, .mobile-nav a, .scrollto').on('click', function() {
//     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
//       var target = $(this.hash);
//       if (target.length) {
//         var top_space = 0;
//
//         if ($('#header').length) {
//           top_space = $('#header').outerHeight();
//
//           if (! $('#header').hasClass('header-scrolled')) {
//             top_space = top_space - 20;
//           }
//         }
//
//         $('html, body').animate({
//           scrollTop: target.offset().top - top_space
//         }, 1500, 'easeInOutExpo');
//
//         if ($(this).parents('.main-nav, .mobile-nav').length) {
//           $('.main-nav .active, .mobile-nav .active').removeClass('active');
//           $(this).closest('li').addClass('active');
//         }
//
//         if ($('body').hasClass('mobile-nav-active')) {
//           $('body').removeClass('mobile-nav-active');
//           $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
//           $('.mobile-nav-overly').fadeOut();
//         }
//         return false;
//       }
//     }
//   });
//
//   // Navigation active state on scroll
//   var nav_sections = $('section');
//   var main_nav = $('.main-nav, .mobile-nav');
//   var main_nav_height = $('#header').outerHeight();
//
//   $(window).on('scroll', function () {
//     var cur_pos = $(this).scrollTop();
//
//     nav_sections.each(function() {
//       var top = $(this).offset().top - main_nav_height,
//           bottom = top + $(this).outerHeight();
//
//       if (cur_pos >= top && cur_pos <= bottom) {
//         main_nav.find('li').removeClass('active');
//         main_nav.find('a[href="#'+$(this).attr('id')+'"]').parent('li').addClass('active');
//       }
//     });
//   });
//
//   // jQuery counterUp (used in Whu Us section)
//   $('[data-toggle="counter-up"]').counterUp({
//     delay: 10,
//     time: 1000
//   });
//
//   // Porfolio isotope and filter
//   $(window).on('load', function () {
//     var portfolioIsotope = $('.portfolio-container').isotope({
//       itemSelector: '.portfolio-item'
//     });
//     $('#portfolio-flters li').on( 'click', function() {
//       $("#portfolio-flters li").removeClass('filter-active');
//       $(this).addClass('filter-active');
//
//       portfolioIsotope.isotope({ filter: $(this).data('filter') });
//     });
//   });
//
//   // Testimonials carousel (uses the Owl Carousel library)
//   $(".testimonials-carousel").owlCarousel({
//     autoplay: true,
//     dots: true,
//     loop: true,
//     items: 1
//   });
//
})(jQuery);
