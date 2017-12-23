(function(window) {
  var $ = window.jQuery;
  var SCROLL_SPEED = 1000;

  // usage: goto.hero();
  window.goto = {
    hero: function() {
      $('html, body').animate({
        scrollTop: $('#trigger-hero-top').offset().top
      }, SCROLL_SPEED);
    },
    vision: function() {
      $('html, body').animate({
        scrollTop: $('#trigger-vision-top').offset().top + 100
      }, SCROLL_SPEED);
    },
    tokensale: function() {
      $('html, body').animate({
        scrollTop: $('#trigger-tokensale-top').offset().top + 700
      }, SCROLL_SPEED);
    },
    team: function() {
      $('html, body').animate({
        scrollTop: $('#team').offset().top
      }, SCROLL_SPEED);
    }
  };
})(window);
