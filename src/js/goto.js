(function(window) {
  var $ = window.jQuery;
  var SCROLL_SPEED = 1000;
  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;

  var sections = {
    hero: { id: 'hero', offset: -y, label: 'Page top' },
    vision: { id: 'vision', offset: -30, label: 'Our vision' },
    marketplace: { id: 'marketplace', offset: -120, label: 'Marketplace' },
    bullets: { id: 'bullets', offset: -120, label: 'Core features' },
    features: { id: 'features', offset: -100, label: 'Our MVP' },
    roadmap: { id: 'roadmap', offset: -100, label: 'Roadmap' },
    team: { id: 'team', offset: -130, label: 'Team' },
    advisors: { id: 'advisors', offset: -100, label: 'Advisors' },
    partners: { id: 'partners', offset: -100, label: 'Partners' },
    tokensaleIntro: { id: 'tokensale-intro', offset: 0, label: 'Token sale' },
    france: { id: 'france', offset: -200, label: 'Compliant with regulations' },
    whitepaper: { id: 'whitepaper', offset: 20, label: 'Whitepaper' },
  };

  var $menu = $('body > nav');
  window.goto = {};
  for (var key in sections) {
    (function(key) {
      window.goto[key] = function() {
        $('html, body').animate({
          scrollTop: $('#' + sections[key].id).position().top + sections[key].offset
        }, SCROLL_SPEED);
      };
      sections[key].$el = $('#' + sections[key].id);
    })(key);
    $menu.append($([
      '<a id="nav-bullet-' + key + '" onclick="goto.' + key + '()" tooltip="' + sections[key].label + '">',
      '<span class="bullet"></span>',
      '<span class="text">' + sections[key].label + '</span>',
      '</a>'
    ].join('')));
  }

  if (x > 1000) { // only for desktop
    var $header = $('header').first();
    $(window).scroll(function(ev) {
      // menu bullet highlight
      for (var key in sections) {
        var s = sections[key];
        if (ev.currentTarget.pageYOffset >= s.$el.position().top + s.offset - 20) {
          $menu.find('a.active').removeClass('active');
          $('#nav-bullet-' + key).addClass('active');
        }
      }

      // sticky header
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

  $(window).scroll();
})(window);
