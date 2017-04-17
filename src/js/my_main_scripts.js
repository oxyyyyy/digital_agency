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

// Smooth anchors + active menu item
$(document).ready(function() {
  $(document).on("scroll", onScroll);

  //smoothscroll
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
$('.circle').circleProgress({
  value: 1,
  size: 200,
  startAngle: 0,
  thickness: 5,
  fill: "#E5E5E5"
});

var circles = $('#circles').waypoint(function(direction) {

  $('#circle_1').circleProgress({
    value: 1,
    size: 200,
    startAngle: 0,
    thickness: 5,
    fill: "#ff5400"
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
      fill: "#ff5400"
    });
    $('#circle_2_top').circleProgress({
      value: 0.5,
      size: 200,
      startAngle: -Math.PI,
      reverse: true,
      emptyFill: "rgba(0, 0, 0, 0)",
      thickness: 5,
      fill: "#ff5400"
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
      fill: "#ff5400"
    });
    $('#circle_3_top').circleProgress({
      value: 0.5,
      size: 200,
      startAngle: -Math.PI,
      reverse: true,
      emptyFill: "rgba(0, 0, 0, 0)",
      thickness: 5,
      fill: "#ff5400"
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
      fill: "#ff5400"
    });
  }, 6000);
  setTimeout(function() {
    $('#circle_4').removeClass('off_line').addClass('on_line')
  }, 7000);

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

var progress = $('#unknown').waypoint(function(direction) {
  $('.progress-bar').css("width",
    function() {
      return $(this).attr("aria-valuenow") + "%";
    }
  );
  percent_1_animation.start();
  percent_2_animation.start();
  percent_3_animation.start();
  roi_animation.start();
  this.destroy();
}, {
  offset: '75%'
});
