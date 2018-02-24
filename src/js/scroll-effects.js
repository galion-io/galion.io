(function(window) {
  var ScrollMagic = window.ScrollMagic;
  var $ = window.jQuery;

  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;

  if (x < 1000) {
    return;
  }

  var controller = new ScrollMagic.Controller();

  var $cryptoballs = $('#hero .cryptoball');

  new ScrollMagic.Scene({
    triggerElement: '#trigger-hero-top',
    duration: 1 * y,
    triggerHook: 0
  })
    .setPin('#hero')
    .addTo(controller)
    .on('progress', function(ev) {
      // hide scroll indicator
      if (ev.progress > 0) {
        $('#hero #scroll-indicator').css('opacity', 0);
      } else {
        $('#hero #scroll-indicator').css('opacity', 1);
      }

      // move cryptoballs
      var ballx = [5, 15, 25, 20, 35, 45, 55, 65, 70, 75, 85, 95];
      var bally = [20, 70, 50, 85, 30, 30, 45, 65, 20, 50, 25, 75];
      var scale = [0.5, 0.6, 0.4, 0.4, 0.8, 0.3, 0.7, 0.6, 0.4, 0.9, 0.5, 0.7];
      var toX = 0.5 * x + 250 + 325 / 2;
      var toY = 0.5 * y;
      var BALL_MOVE_END = 0.8;
      $cryptoballs.each(function(i) {
        var $el = $(this);
        var originX = x * 0.01 * ballx[i];
        var originY = y * 0.01 * bally[i];
        var tx = toX - originX;
        var ty = toY - originY;
        function fx(x) { return x; }
        function fy(y) { return y * y * y; }
        $el.css('opacity', 1);
        var ballProgress = Math.min(ev.progress * (1 / BALL_MOVE_END), 1);
        $el.css('left', originX + fx(ballProgress) * tx - $el.width() / 2);
        $el.css('top', originY + fy(ballProgress) * ty - $el.height() / 2);
        $el.css('height', scale[i] * 100 + 'px');
        $el.css('width', scale[i] * 100 + 'px');
        $el.css('background-image', 'url(img/' + i + '.svg)');
      });

      var PHONE_START = 0.2;
      var PHONE_END = 0.8;
      var PHONE_DURATION = PHONE_END - PHONE_START;
      var $phone = $('#hero-phone');
      if (ev.progress > PHONE_START && ev.progress < PHONE_END) {
        var phoneProgress = (ev.progress - PHONE_START) / PHONE_DURATION;
        $phone.css('bottom', -1 * $phone.height() + ($phone.height() + 30) * phoneProgress);
      } else if (ev.progress > PHONE_END) {
        $phone.css('bottom', 30);
      } else {
        $phone.css('bottom', -1 * $phone.height());
      }

      var $phoneContent = $('#hero-phone-content');
      var PHONE_CONTENT_START = 0.6;
      if (ev.progress > PHONE_CONTENT_START) {
        $phoneContent.css('opacity', 1);
      } else {
        $phoneContent.css('opacity', 0);
      }
    });

  var $token = $('#tokensale .token');
  var $piechart = $('#tokensale .piechart');
  var $tokentext = $('#tokensale .text-token');
  var $saletext = $('#tokensale .text-sale');
  new ScrollMagic.Scene({
    triggerElement: '#trigger-tokensale-top',
    duration: 1 * y,
    triggerHook: 0.2
  })
    .setPin('#tokensale')
    .addTo(controller)
    .on('progress', function(ev) {
      var TOKEN_START = 0.4;
      var SALE_START = 0.7;

      var rollProgress = ev.progress / TOKEN_START;
      if (rollProgress > 1) {
        rollProgress = 1;
      }
      var rotate = (rollProgress * -1 * 360) % 360;

      $token.css('left', 50 + (60 - rollProgress * 60) + '%');
      $token.css('transform', 'rotate(' + rotate + 'deg)');

      if (ev.progress < TOKEN_START) {
        $token.css('opacity', '1');
        $tokentext.css('opacity', '0');
        $tokentext.css('display', 'none');
        $piechart.css('opacity', '0');
        $saletext.css('display', 'none');
        $saletext.css('opacity', '0');
      } else if (ev.progress >= TOKEN_START && ev.progress < SALE_START) {
        $token.css('opacity', '1');
        $tokentext.css('opacity', '1');
        $tokentext.css('display', 'block');
        $piechart.css('opacity', '0');
        $saletext.css('display', 'none');
        $saletext.css('opacity', '0');
      } else {
        $token.css('opacity', '0');
        $tokentext.css('opacity', '0');
        $tokentext.css('display', 'none');
        $piechart.css('opacity', '1');
        $saletext.css('display', 'block');
        $saletext.css('opacity', '1');
      }
    });


  // sticky header
  if (x > 800) { // only for desktop
    var $header = $('header').first();
    $(window).scroll(function(ev) {
      if (ev.currentTarget.pageYOffset < y + 100) {
        $header.removeClass('soonfixed');
        $header.removeClass('fixed');
      } else if (ev.currentTarget.pageYOffset < 2 * y - 70) {
        $header.addClass('soonfixed');
        $header.removeClass('fixed');
      } else {
        $header.addClass('soonfixed');
        $header.addClass('fixed');
      }
    });
  }
})(window);
