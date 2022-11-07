//onscroll fixed top navigation
$(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() >= 60) {
      $(".navigation").addClass("sticky-md-top sticky-navigation shadow");
    } else {
      $(".navigation").removeClass("sticky-md-top sticky-navigation shadow");
    }
  });
});

//dark theme toggle
$(document).ready(function () {
  $(".darkthemebtn").click(function () {
    $("body").toggleClass("dark-theme");
  });
});

//slider
var myCarousel = document.querySelector("#myCarousel");
var carousel = new bootstrap.Carousel(myCarousel, {
  interval: 2000,
  wrap: false
});

//back to top button
$(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() >= 60) {
      $(".back-to-top").addClass("d-block");
    } else {
      $(".back-to-top").removeClass("d-block");
    }
  });
  $(".back-to-top").click(function () {
    $("html").scrollTop(0);
  });
});