(function ($) {

  skel.breakpoints({
    xlarge: '(max-width: 1680px)',
    large: '(max-width: 1280px)',
    medium: '(max-width: 980px)',
    small: '(max-width: 736px)',
    xsmall: '(max-width: 480px)'
  });

  $(function () {

    var $window = $(window),
      $body = $('body');

    new LazyLoad();

    var $timeline_block = $('.cd-timeline-block');

    //hide timeline blocks which are outside the viewport
    $timeline_block.each(function () {
      if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
        $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
      }
    });

    //on scolling, show/animate timeline blocks when enter the viewport
    $(window).on('scroll', function () {
      $timeline_block.each(function () {
        if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden')) {
          $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
        }
      });
    });

    $('.clients').slick({
      slidesToShow: skel.vars.mobile ? 1 : 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      prevArrow: null,
      nextArrow: null
    });

    // Disable animations/transitions until the page has loaded.
    $body.addClass('is-loading');

    $window.on('load', function () {
      window.setTimeout(function () {
        $body.removeClass('is-loading');
      }, 100);
    });

    // Touch?
    if (skel.vars.touch)
      $body.addClass('is-touch');

    // Forms.
    var $form = $('form');

    // Auto-resizing textareas.
    $form.find('textarea').each(function () {

      var $this = $(this),
        $wrapper = $('<div class="textarea-wrapper"></div>'),
        $submits = $this.find('input[type="submit"]');

      $this
        .wrap($wrapper)
        .attr('rows', 1)
        .css('overflow', 'hidden')
        .css('resize', 'none')
        .on('keydown', function (event) {

          if (event.keyCode == 13
            && event.ctrlKey) {

            event.preventDefault();
            event.stopPropagation();

            $(this).blur();

          }

        })
        .on('blur focus', function () {
          $this.val($.trim($this.val()));
        })
        .on('input blur focus --init', function () {

          $wrapper
            .css('height', $this.height());

          $this
            .css('height', 'auto')
            .css('height', $this.prop('scrollHeight') + 'px');

        })
        .on('keyup', function (event) {

          if (event.keyCode == 9)
            $this
              .select();

        })
        .triggerHandler('--init');

      // Fix.
      if (skel.vars.browser == 'ie'
        || skel.vars.mobile)
        $this
          .css('max-height', '10em')
          .css('overflow-y', 'auto');

    });

    // Fix: Placeholder polyfill.
    $form.placeholder();

    // Prioritize "important" elements on medium.
    skel.on('+medium -medium', function () {
      $.prioritize(
        '.important\\28 medium\\29',
        skel.breakpoint('medium').active
      );
    });

    // Menu.
    var $menu = $('#menu');

    $menu.wrapInner('<div class="inner"></div>');

    $menu._locked = false;

    $menu._lock = function () {

      if ($menu._locked)
        return false;

      $menu._locked = true;

      window.setTimeout(function () {
        $menu._locked = false;
      }, 350);

      return true;

    };

    $menu._show = function () {

      if ($menu._lock())
        $body.addClass('is-menu-visible');

    };

    $menu._hide = function () {

      if ($menu._lock())
        $body.removeClass('is-menu-visible');

    };

    $menu._toggle = function () {

      if ($menu._lock())
        $body.toggleClass('is-menu-visible');

    };

    $menu
      .appendTo($body)
      .on('click', function (event) {
        event.stopPropagation();
      })
      .on('click', 'a', function (event) {

        var href = $(this).attr('href');

        event.preventDefault();
        event.stopPropagation();

        // Hide.
        $menu._hide();

        // Redirect.
        if (href == '#menu')
          return;

        window.setTimeout(function () {
          window.location.href = href;
        }, 350);

      })
      .append('<a class="close" href="#menu">Close</a>');

    $body
      .on('click', 'a[href="#menu"]', function (event) {

        event.stopPropagation();
        event.preventDefault();

        // Toggle.
        $menu._toggle();

      })
      .on('click', function (event) {

        // Hide.
        $menu._hide();

      })
      .on('keydown', function (event) {

        // Hide on escape.
        if (event.keyCode == 27)
          $menu._hide();

      });

    var $form = document.querySelectorAll('#contact-form')[0],
      $submit = document.querySelectorAll('#contact-form input[type="submit"]')[0],
      $message;

    if ($form) {
      var queryParams = window.location.search;

      $message = document.createElement('span');
      $message.classList.add('message');
      $form.appendChild($message);

      $message._show = function (type, text) {
        $message.innerHTML = text;
        $message.classList.add(type);
        $message.classList.add('visible');
      };

      $message._hide = function() {
        $message.classList.remove('visible');
      };

      if (queryParams === '?submitted=true') {
        $submit.disabled = true;
        $message._show('success', 'Thank you!');
      }
    }

    var $timeline_block = $('.cd-timeline-block');

    if ($timeline_block) {
      //hide timeline blocks which are outside the viewport
      $timeline_block.each(function(){
        if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.75) {
          $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
        }
      });

      //on scolling, show/animate timeline blocks when enter the viewport
      $(window).on('scroll', function(){
        $timeline_block.each(function(){
          if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
            $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
          }
        });
      });
    }
  });

})(jQuery);