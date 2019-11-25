$(document).ready(function() {
  // Darkmode control
  if (document.cookie.indexOf("darkmode=on") == 0) {
    $("#darkModeStatus").html("Activated");
    $("body, #mainNav, #preloader").addClass("darkmode");
  } else if (document.cookie.indexOf("darkmode=off") == 0 ) {
    $("#darkModeStatus").html("Deactivated");
    $("body, #mainNav, #preloader").removeClass("darkmode");
  } else {
    $("#darkModeStatus").html("Deactivated");
  }
});

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

// Darkmode control
function darkmode(switchAction) {
  switch (switchAction) {
    case 1:
      expiry = new Date();
      expiry.setDate(expiry.getDate()+(1));

      document.cookie = "darkmode=on; expires=" + expiry.toGMTString();
    break;
    case 2:
      document.cookie = "darkmode=off;expires=Wed; 01 Jan 1970";
    break;
  }
};

(function ($) {
  "use strict";

  $('[data-toggle="tooltip"]').tooltip();

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

  /* Animated Title */
  (function() {
    //set animation timing
    var animationDelay = 3500,
      //loading bar effect
      barAnimationDelay = 3800,
      barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
      //letters effect
      lettersDelay = 50,
      //type effect
      typeLettersDelay = 150,
      selectionDuration = 500,
      typeAnimationDelay = selectionDuration + 800,
      //clip effect
      revealDuration = 600,
      revealAnimationDelay = 2500;

    initHeadline();


    function initHeadline() {
      //insert <i> element for each letter of a changing word
      singleLetters($('.cd-headline.letters').find('b'));
      //initialise headline animation
      animateHeadline($('.cd-headline'));
    }

    function singleLetters($words) {
      $words.each(function() {
        var word = $(this),
          letters = word.text().split(''),
          selected = word.hasClass('is-visible');
        for (var i in letters) {
          if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
          letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
        }
        var newLetters = letters.join('');
        word.html(newLetters).css('opacity', 1);
      });
    }

    function animateHeadline($headlines) {
      var duration = animationDelay;
      $headlines.each(function() {
        var headline = $(this);

        if (headline.hasClass('loading-bar')) {
          duration = barAnimationDelay;
          setTimeout(function() {
            headline.find('.cd-words-wrapper').addClass('is-loading')
          }, barWaiting);
        } else if (headline.hasClass('clip')) {
          var spanWrapper = headline.find('.cd-words-wrapper'),
            newWidth = spanWrapper.width() + 10
          spanWrapper.css('width', newWidth);
        } else if (!headline.hasClass('type')) {
          //assign to .cd-words-wrapper the width of its longest word
          var words = headline.find('.cd-words-wrapper b'),
            width = 0;
          words.each(function() {
            var wordWidth = $(this).width();
            if (wordWidth > width) width = wordWidth;
          });
          headline.find('.cd-words-wrapper').css('width', width);
        };

        //trigger animation
        setTimeout(function() {
          hideWord(headline.find('.is-visible').eq(0))
        }, duration);
      });
    }

    function hideWord($word) {
      var nextWord = takeNext($word);

      if ($word.parents('.cd-headline').hasClass('type')) {
        var parentSpan = $word.parent('.cd-words-wrapper');
        parentSpan.addClass('selected').removeClass('waiting');
        setTimeout(function() {
          parentSpan.removeClass('selected');
          $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
        }, selectionDuration);
        setTimeout(function() {
          showWord(nextWord, typeLettersDelay)
        }, typeAnimationDelay);

      } else if ($word.parents('.cd-headline').hasClass('letters')) {
        var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
        hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
        showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

      } else if ($word.parents('.cd-headline').hasClass('clip')) {
        $word.parents('.cd-words-wrapper').animate({
          width: '2px'
        }, revealDuration, function() {
          switchWord($word, nextWord);
          showWord(nextWord);
        });

      } else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
        $word.parents('.cd-words-wrapper').removeClass('is-loading');
        switchWord($word, nextWord);
        setTimeout(function() {
          hideWord(nextWord)
        }, barAnimationDelay);
        setTimeout(function() {
          $word.parents('.cd-words-wrapper').addClass('is-loading')
        }, barWaiting);

      } else {
        switchWord($word, nextWord);
        setTimeout(function() {
          hideWord(nextWord)
        }, animationDelay);
      }
    }

    function showWord($word, $duration) {
      if ($word.parents('.cd-headline').hasClass('type')) {
        showLetter($word.find('i').eq(0), $word, false, $duration);
        $word.addClass('is-visible').removeClass('is-hidden');

      } else if ($word.parents('.cd-headline').hasClass('clip')) {
        $word.parents('.cd-words-wrapper').animate({
          'width': $word.width() + 10
        }, revealDuration, function() {
          setTimeout(function() {
            hideWord($word)
          }, revealAnimationDelay);
        });
      }
    }

    function hideLetter($letter, $word, $bool, $duration) {
      $letter.removeClass('in').addClass('out');

      if (!$letter.is(':last-child')) {
        setTimeout(function() {
          hideLetter($letter.next(), $word, $bool, $duration);
        }, $duration);
      } else if ($bool) {
        setTimeout(function() {
          hideWord(takeNext($word))
        }, animationDelay);
      }

      if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
        var nextWord = takeNext($word);
        switchWord($word, nextWord);
      }
    }

    function showLetter($letter, $word, $bool, $duration) {
      $letter.addClass('in').removeClass('out');

      if (!$letter.is(':last-child')) {
        setTimeout(function() {
          showLetter($letter.next(), $word, $bool, $duration);
        }, $duration);
      } else {
        if ($word.parents('.cd-headline').hasClass('type')) {
          setTimeout(function() {
            $word.parents('.cd-words-wrapper').addClass('waiting');
          }, 200);
        }
        if (!$bool) {
          setTimeout(function() {
            hideWord($word)
          }, animationDelay)
        }
      }
    }

    function takeNext($word) {
      return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
    }

    function takePrev($word) {
      return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
    }

    function switchWord($oldWord, $newWord) {
      $oldWord.removeClass('is-visible').addClass('is-hidden');
      $newWord.removeClass('is-hidden').addClass('is-visible');
    }

  })();

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
