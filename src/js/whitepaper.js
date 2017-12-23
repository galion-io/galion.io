(function(window) {
  var $ = window.jQuery;
  var N_PAGES = 3;

  window.changeWhitepaperPage = function(el, offset) {
    var $el = $(el);
    var $parent = $el.parent();
    var current = Number($parent.attr('data-page'));
    var next = current + offset;
    if (next <= 0) {
      next = N_PAGES;
    }
    if (next > N_PAGES) {
      next = 1;
    }

    $parent.css('background-image', 'url(\'img/wp' + next + '.png\')');
    $parent.attr('data-page', next);
  };
})(window);
