(function(window) {
  var $ = window.jQuery;
  window.toggleRoadmapYear = function toggleRoadmapYear(year) {
    var $el = $('#roadmap #nav-roadmap-' + year);
    $('#roadmap .item.active').removeClass('active');
    $el.addClass('active');

    $('#roadmap .icon-active').css('display', 'none');
    $('#roadmap .icon-inactive').css('display', 'block');

    $el.find('.icon-active').css('display', 'block');
    $el.find('.icon-inactive').css('display', 'none');

    $('#roadmap .text').css('display', 'none');
    $('#roadmap .text.text-' + year).css('display', 'block');
  };

  window.scrollRoadmapTo = function scrollRoadmapTo(year) {
    var $blockEl = $('#roadmap #block-' + year);
    $blockEl.parent().scrollTo($blockEl, 100, { offset: -30 });
  };

  var $blocks = $('#roadmap .blocks');
  $blocks.scroll(function() {
    if ($('#roadmap #block-2021').position().left <= $blocks.width()) {
      window.toggleRoadmapYear('2021');
    } else if ($('#roadmap #block-2020').position().left <= $blocks.width()) {
      window.toggleRoadmapYear('2020');
    } else if ($('#roadmap #block-2019').position().left <= $blocks.width()) {
      window.toggleRoadmapYear('2019');
    } else if ($('#roadmap #block-2018').position().left <= $blocks.width()) {
      window.toggleRoadmapYear('2018');
    }
  });
})(window);
