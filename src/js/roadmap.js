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
  };

  window.scrollRoadmapTo = function scrollRoadmapTo(year) {
    var $blockEl = $('#roadmap #block-' + year);
    $blockEl.parent().scrollTo($blockEl, 100, { offset: -30 });
  };

  var $blocks = $('#roadmap .blocks');
  $blocks.scroll(function() {
    var selected = null;
    var selectedOffset = null;
    $blocks.children().each(function() {
      var offset = $(this).position().left;
      if (offset < 50 && (selectedOffset === null || selectedOffset < offset)) {
        selectedOffset = offset;
        selected = $(this).attr('id');
      }
    });
    if ($('#block-2020s1').width() + $('#block-2020s1').position().left < $blocks.width() + 350) {
      selected = 'block-2020s1';
    }
    window.toggleRoadmapYear(selected.replace('block-', ''));
  });
})(window);
