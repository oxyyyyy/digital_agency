// Copyright (c) 2017 Copyright Holder All Rights Reserved.
// Author: Alexandr Vlasenko

// TODO: Сделать появление кругов при скроле (скриптом? wow.js?)

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

// Smooth scroll + active menu item
$(document).ready(function() {
  $(document).on("scroll", onScroll);

  // Active menu item on click + smooth scroll
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

// Active menu item on scroll
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

// Circle animation
var nonAnimatedCirclesMobile = window.matchMedia("(max-width: 1199px)")
// Fill with no animation on mobiles
if (nonAnimatedCirclesMobile.matches) {
  $('.circle').circleProgress({
    value: 1,
    size: 200,
    startAngle: 0,
    thickness: 5,
    fill: "#0ABAB5"
  });
}
// Prepare for animation on desktops
else {
  $('.circle').circleProgress({
    value: 1,
    size: 200,
    startAngle: 0,
    thickness: 5,
    fill: "#E5E5E5"
  });
}

// Run animation on waypoint
var services = $('#services').waypoint(function(direction) {

  var animatedCirclesDesktop = window.matchMedia("(min-width: 1200px)");
  // If it is a desktop - run animation
  if (animatedCirclesDesktop.matches) {
    $('#circle_1').circleProgress({
      value: 1,
      size: 200,
      startAngle: 0,
      thickness: 5,
      fill: "#0ABAB5"
    });
    setTimeout(function() {
      $('#circle_1').removeClass('off_line').addClass('on_line')
    }, 1000);

    setTimeout(function() {
      $('#circle_2').circleProgress({
        value: 0.5,
        size: 200,
        startAngle: -Math.PI,
        thickness: 5,
        fill: "#0ABAB5"
      });
      $('#circle_2_top').circleProgress({
        value: 0.5,
        size: 200,
        startAngle: -Math.PI,
        reverse: true,
        emptyFill: "rgba(0, 0, 0, 0)",
        thickness: 5,
        fill: "#0ABAB5"
      });
    }, 2000);
    setTimeout(function() {
      $('#circle_2').removeClass('off_line').addClass('on_line')
    }, 3000);

    setTimeout(function() {
      $('#circle_3').circleProgress({
        value: 0.5,
        size: 200,
        startAngle: -Math.PI,
        thickness: 5,
        fill: "#0ABAB5"
      });
      $('#circle_3_top').circleProgress({
        value: 0.5,
        size: 200,
        startAngle: -Math.PI,
        reverse: true,
        emptyFill: "rgba(0, 0, 0, 0)",
        thickness: 5,
        fill: "#0ABAB5"
      });
    }, 4000);
    setTimeout(function() {
      $('#circle_3').removeClass('off_line').addClass('on_line')
    }, 5000);

    setTimeout(function() {
      $('#circle_4').circleProgress({
        value: 1,
        size: 200,
        startAngle: 1.01 * -Math.PI,
        thickness: 5,
        fill: "#0ABAB5"
      });
    }, 6000);
    setTimeout(function() {
      $('#circle_4').removeClass('off_line').addClass('on_line')
    }, 7000);
  }


  this.destroy();
}, {
  offset: '75%'
});

// Progress bar animation
var options = {  
  useEasing: true,
    useGrouping: true,
    separator: ',',
    decimal: '.',
    prefix: '',
    suffix: '%'
};
var percent_1_animation = new CountUp("percent_1", 0, 90, 0, 3, options);
var percent_2_animation = new CountUp("percent_2", 0, 79, 0, 3, options);
var percent_3_animation = new CountUp("percent_3", 0, 28, 0, 3, options);
var roi_animation = new CountUp("roi_value", 0, 300, 0, 3, options);

var progress = $('#results').waypoint(function(direction) {
  $('.progress-bar').css("width",
    function() {
      return $(this).attr("aria-valuenow") + "%";
    }
  );
  percent_1_animation.start();
  percent_2_animation.start();
  percent_3_animation.start();
  roi_animation.start();
  $('.roi_rise').css("height", "180px");
  this.destroy();
}, {
  offset: '75%'
});

// Ajax from (formspree.io)
$("#contact_form").submit(function(event) {

  event.preventDefault();

  $.ajax({
      url: "https://formspree.io/elektronikaion@gmail.com",
      method: "POST",
      data: {
        Имя: $("#name").val(),
        Почта: $("#email").val(),
        Сообщение: $("#message").val()
      },
      beforeSend: function() {
        $("#submit_btn").html('Отправка <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
      },
      dataType: "json"
    })

    .done(function(response) {
      $("#submit_btn").html('Отправлено! <i class="fa fa-check" aria-hidden="true"></i>');
      // Clear the form.
      $('#name').val('');
      $('#email').val('');
      $('#message').val('');
    })

    .fail(function(data) {
      $("#submit_btn").html('Ошибка. <i class="fa fa-times" aria-hidden="true"></i>');
    });

});

// Particles.js init

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('home', 'js/particlesjs-config.json', function() {
  console.log('callback - particles.js config loaded');
});
