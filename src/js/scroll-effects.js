(function(window) {
  var ScrollMagic = window.ScrollMagic;
  var $ = window.jQuery;

  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;

  if (x > 2000) {
    x = 2000;
  }

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
  var $tokentext = $('#tokensale .text-token');
  new ScrollMagic.Scene({
    triggerElement: '#trigger-tokensale-top',
    duration: 0.3 * y,
    triggerHook: 0.75
  })
    .setPin('#tokensale')
    .addTo(controller)
    .on('progress', function(ev) {
      var rotate = (ev.progress * -1 * 360) % 360;

      $token.css('left', 0 + (100 - ev.progress * 100) + '%');
      $token.css('transform', 'rotate(' + rotate + 'deg)');

      if (ev.progress < 1) {
        $token.css('opacity', '1');
        $tokentext.css('opacity', '0');
        $tokentext.css('margin-left', '50px');
      } else if (ev.progress >= 1) {
        $token.css('opacity', '1');
        $tokentext.css('opacity', '1');
        $tokentext.css('margin-left', '0');
      }
    });

  var $vision = $('#vision');
  new ScrollMagic.Scene({
    triggerElement: '#vision',
    duration: 1 * y,
    triggerHook: 1
  })
    .addTo(controller)
    .on('progress', function(ev) {
      if (ev.progress > 0.6) {
        $vision.addClass('shown');
      } else {
        $vision.removeClass('shown');
      }
    });

  var $features = $('#features');
  new ScrollMagic.Scene({
    triggerElement: '#dashboard',
    duration: 1 * y,
    triggerHook: 1
  })
    .addTo(controller)
    .on('progress', function(ev) {
      if (ev.progress > 0.2) {
        $features.addClass('shown');
      } else {
        $features.removeClass('shown');
      }
    });

  var $roadmap = $('#roadmap');
  new ScrollMagic.Scene({
    triggerElement: '#roadmap',
    duration: 1 * y,
    triggerHook: 1
  })
    .addTo(controller)
    .on('progress', function(ev) {
      if (ev.progress > 0.3) {
        $roadmap.addClass('shown');
      } else {
        $roadmap.removeClass('shown');
      }
    });

  var $subscribeMid = $('#subscribe-mid');
  new ScrollMagic.Scene({
    triggerElement: '#subscribe-mid',
    duration: 1 * y,
    triggerHook: 1
  })
    .addTo(controller)
    .on('progress', function(ev) {
      if (ev.progress > 0.3) {
        $subscribeMid.addClass('shown');
      } else {
        $subscribeMid.removeClass('shown');
      }
    });

  var $france = $('#france');
  new ScrollMagic.Scene({
    triggerElement: '#france',
    duration: 1 * y,
    triggerHook: 1
  })
    .addTo(controller)
    .on('progress', function(ev) {
      if (ev.progress > 0.3) {
        $france.addClass('shown');
      } else {
        $france.removeClass('shown');
      }
    });

  var $whitepaper = $('#whitepaper');
  new ScrollMagic.Scene({
    triggerElement: '#whitepaper',
    duration: 1 * y,
    triggerHook: 1
  })
    .addTo(controller)
    .on('progress', function(ev) {
      if (ev.progress > 0.8) {
        $whitepaper.addClass('shown');
      } else {
        $whitepaper.removeClass('shown');
      }
    });

  var $subscribeBottom = $('#subscribe-bottom');
  new ScrollMagic.Scene({
    triggerElement: '#subscribe-bottom',
    duration: 1 * y,
    triggerHook: 1
  })
    .addTo(controller)
    .on('progress', function(ev) {
      if (ev.progress > 0.7) {
        $subscribeBottom.addClass('shown');
      } else {
        $subscribeBottom.removeClass('shown');
      }
    });

  var $tokensaleRepartition = $('#tokensale-repartition');
  new ScrollMagic.Scene({
    triggerElement: '#tokensale-repartition',
    duration: 1 * y,
    triggerHook: 1
  })
    .addTo(controller)
    .on('progress', function(ev) {
      if (ev.progress > 0.5) {
        $tokensaleRepartition.addClass('shown');
      } else {
        $tokensaleRepartition.removeClass('shown');
      }
    });

  var $tokensaleMetrics = $('#tokensale-metrics');
  new ScrollMagic.Scene({
    triggerElement: '#tokensale-metrics',
    duration: 1 * y,
    triggerHook: 1
  })
    .addTo(controller)
    .on('progress', function(ev) {
      if (ev.progress > 0.2) {
        $tokensaleMetrics.addClass('shown');
      } else {
        $tokensaleMetrics.removeClass('shown');
      }
    });
})(window);
