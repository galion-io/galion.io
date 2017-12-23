(function(window) {
  var $ = window.jQuery;
  window.toggleRoadmapYear = function toggleRoadmapYear(el, year) {
    $('#roadmap .item.active').removeClass('active');
    $(el).addClass('active');

    $('#roadmap .icon-active').css('display', 'none');
    $('#roadmap .icon-inactive').css('display', 'block');

    $(el).find('.icon-active').css('display', 'block');
    $(el).find('.icon-inactive').css('display', 'none');

    $('#roadmap .text').css('display', 'none');
    $('#roadmap .text.text-' + year).css('display', 'block');

    $('#roadmap .blocks').css('display', 'none');
    $('#roadmap .blocks.blocks-' + year).css('display', 'block');
  };

  $.fn.isScrollable = function() {
    return this[0].scrollWidth > this[0].clientWidth || this[0].scrollHeight > this[0].clientHeight;
  };

  var $blocks = $('#roadmap .blocks');
  if ($blocks.isScrollable()) {
    $blocks.mousewheel(function(evt, chg) {
      this.scrollLeft -= (chg * 50); // need a value to speed up the change
      evt.preventDefault();
    });
  }
})(window);
