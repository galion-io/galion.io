(function(window) {
  window.focusPortrait = function(el) {
    var $el = $(el);

    // update bigface content
    $('#bigface').css('background-image', $el.find('.image').css('background-image'));
    $('#bigface-text .name').html($el.find('.name').html());
    $('#bigface-text .job').html($el.find('.job').html());
    $('#bigface-text p').html($el.find('p').html());
    $('#bigface-text .links').html($el.find('.links').html());

    $('.portraits-wrapper .active').removeClass('active');
    $el.addClass('active');
  };
})(window);
