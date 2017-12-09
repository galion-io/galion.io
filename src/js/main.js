(function(window) {
  var ScrollMagic = window.ScrollMagic;
  var $ = window.jQuery;

  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;

  var SCROLL_SPEED = 1000;
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

  var controller = new ScrollMagic.Controller();

  var $cryptoballs = $('#hero .cryptoball');
  $('#hero').on('mousemove', function(ev) {
    var mouseX = ev.clientX;
    var mouseY = ev.clientY;
    $cryptoballs.each(function() {
      var $ball = $(this);
      var ballPosition = $ball.position();
      var dx = ballPosition.left + $ball.width() / 2 - mouseX;
      var dy = ballPosition.top + $ball.height() / 2 - mouseY;
      // normalize dx/dy in terms of ball size
      dx = dx / $ball.width();
      dy = dy / $ball.height();
      var dxy = Math.sqrt(dx * dx + dy * dy);

      if (dxy < 0.7) {
        $ball.attr('tx', dx * $ball.width());
        $ball.attr('ty', dy * $ball.height());
        $ball.attr('moving', 'yes');
      }
    });
  });
  // setup back-to-normal position
  $cryptoballs.each(function() {
    var $ball = $(this);
    setInterval(function() {
      if ($ball.attr('moving')) {
        var speed = 0.9;
        var tx = Number($ball.attr('tx')) * speed;
        var ty = Number($ball.attr('ty')) * speed;
        $ball.css('transform', 'translate3d(' + tx + 'px, ' + ty + 'px, 0)');
        if (Math.abs(tx) < 1 && Math.abs(ty) < 1) {
          $ball.attr('tx', '');
          $ball.attr('ty', '');
          $ball.attr('moving', '');
        } else {
          $ball.attr('tx', tx);
          $ball.attr('ty', ty);
        }
      }
    }, 1000 / 60);
  });

  new ScrollMagic.Scene({
    triggerElement: '#trigger-hero-top',
    duration: 3 * y,
    triggerHook: 0
  })
    .setPin('#hero')
    .addIndicators({ name: 'hero' })
    .addTo(controller)
    .on('progress', function(ev) {
      $('#hero-anim-percent').text(Math.round(ev.progress * 100) + ' %');

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
      var PHONE_DURATION = 1 - PHONE_START;
      var $phone = $('#hero-phone');
      if (ev.progress > PHONE_START) {
        var phoneProgress = (ev.progress - PHONE_START) / PHONE_DURATION;
        $phone.css('bottom', -1 * $phone.height() + ($phone.height() + 100) * phoneProgress);
      } else {
        $phone.css('bottom', -1 * $phone.height());
      }
    });

  new ScrollMagic.Scene({
    triggerElement: '#trigger-vision-top',
    duration: 0.25 * y,
    triggerHook: 0.5
  })
    .setPin('#vision')
    .addIndicators({ name: 'vision' })
    .addTo(controller)
    .on('progress', function(ev) {
      $('#vision-anim-percent').text(Math.round(ev.progress * 100) + ' %');
      $('#vision .title').each(function() {
        $(this).css('padding-bottom', ((1 - ev.progress) * 5 + 1) + 'em');
      });
    });

  var $token = $('#tokensale .token');
  var $piechart = $('#tokensale .piechart');
  var $tokentext = $('#tokensale .text');
  new ScrollMagic.Scene({
    triggerElement: '#trigger-tokensale-top',
    duration: 1 * y,
    triggerHook: 0.5
  })
    .setPin('#tokensale')
    .addIndicators({ name: 'tokensale' })
    .addTo(controller)
    .on('progress', function(ev) {
      var rotate = (ev.progress * -1 * 360) % 360;
      $token.css('left', ((1 - ev.progress) * 100) + '%');
      $token.css('transform', 'rotate(' + rotate + 'deg)');

      if (ev.progress === 1) {
        $token.css('opacity', '0');
        $piechart.css('opacity', '1');
        $tokentext.css('opacity', '1');
      } else {
        $token.css('opacity', '1');
        $piechart.css('opacity', '0');
        $tokentext.css('opacity', '0');
      }
    });
})(window);
