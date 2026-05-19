(function ($) {

  "use strict";

  $(function () {
    var root = document.documentElement;
    var btn = document.getElementById("theme-toggle");
    if (!btn) {
      return;
    }
    function isDark() {
      return root.getAttribute("data-theme") === "dark";
    }
    function sync() {
      var dark = isDark();
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
      btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      btn.setAttribute("title", dark ? "Light theme" : "Dark theme");
      btn.classList.toggle("theme-toggle--dark", dark);
    }
    sync();
    btn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      if (next === "dark") {
        root.setAttribute("data-theme", "dark");
      } else {
        root.removeAttribute("data-theme");
      }
      try {
        localStorage.setItem("reego-theme", next);
      } catch (e) { /* ignore */ }
      sync();
    });
  });

  $(window).on('load', function () {

    // FAQ Accordion
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("accordion-active");
        var isOpen = this.classList.contains("accordion-active");
        this.setAttribute("aria-expanded", isOpen ? "true" : "false");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
    // FAQ Accordion

    /*Page Loader active
    ========================================================*/
    $('#preloader').fadeOut();

    // Sticky Nav
    $(window).on('scroll', function () {
      if ($(window).scrollTop() > 50) {
        $('.scrolling-navbar').addClass('top-nav-collapse');
      } else {
        $('.scrolling-navbar').removeClass('top-nav-collapse');
      }
    });

    // one page navigation 
    $('.navbar-nav').onePageNav({
      currentClass: 'active'
    });

    /* slicknav mobile menu active  */
    $('.mobile-menu').slicknav({
      prependTo: '.navbar-header',
      parentTag: 'liner',
      allowParentLinks: true,
      duplicate: true,
      label: '',
      closedSymbol: '<i class="lni-chevron-right"></i>',
      openedSymbol: '<i class="lni-chevron-down"></i>',
    });

    /* WOW Scroll Spy
  ========================================================*/
    var wow = new WOW({
      //disabled for mobile
      mobile: false
    });

    wow.init();

    /* Testimonials Carousel 
   ========================================================*/
    var owl = $("#testimonials");
    owl.owlCarousel({
      loop: true,
      nav: true,
      navText: [
        '<span class="sr-only">Previous reference</span>&#8249;',
        '<span class="sr-only">Next reference</span>&#8250;'
      ],
      dots: true,
      center: false,
      margin: 0,
      smartSpeed: 600,
      autoplay: true,
      autoplayTimeout: 7000,
      autoplayHoverPause: true,
      responsiveClass: true,
      responsiveRefreshRate: true,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 1
        },
        960: {
          items: 1
        },
        1200: {
          items: 1
        },
        1920: {
          items: 1
        }
      }
    });

    /*  Slick Slider
   ========================================================*/
    $('.slider-center').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      centerMode: false,
      infinite: false,
      arrows: false,
      dots: false,
      responsive: [
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            arrows: true,
            dots: true,
            autoplay: true,
            autoplaySpeed: 5500,
            pauseOnHover: true
          }
        }
      ]
    });


    /* Back Top Link active
    ========================================================*/
    var offset = 200;
    var duration = 500;
    $(window).scroll(function () {
      if ($(this).scrollTop() > offset) {
        $('.back-to-top').fadeIn(400);
      } else {
        $('.back-to-top').fadeOut(400);
      }
    });

    $('.back-to-top').on('click', function (event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 600);
      return false;
    });

    /* Map Form Toggle
    ========================================================*/
    $('.map-icon').on('click', function (e) {
      $('#conatiner-map').toggleClass('panel-show');
      e.preventDefault();
    });

    /* Selected work — tag filters + horizontal scroller reset
    ========================================================*/
    var $workScroller = $('.selected-work-scroller');
    var $workCards = $('.selected-work-card');
    var $workFilters = $('.selected-work-filter');

    function applyWorkFilter(filter) {
      filter = (filter || 'all').toLowerCase();
      $workCards.each(function () {
        var $card = $(this);
        var tags = ($card.attr('data-tags') || '').toLowerCase().split(/\s+/).filter(Boolean);
        var show = filter === 'all' || tags.indexOf(filter) !== -1;
        $card.toggleClass('is-filtered-out', !show);
        $card.attr('aria-hidden', show ? 'false' : 'true');
      });
      if ($workScroller.length) {
        $workScroller[0].scrollLeft = 0;
      }
    }

    $workFilters.on('click', function () {
      var f = $(this).attr('data-filter') || 'all';
      $workFilters.removeClass('is-active').attr('aria-pressed', 'false');
      $(this).addClass('is-active').attr('aria-pressed', 'true');
      applyWorkFilter(f);
    });

    applyWorkFilter('all');

  });

}(jQuery));