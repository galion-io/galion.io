(function(window) {
  window.focusPortrait = function(el) {
    var $el = $(el);
    var big = {
      background: $('#bigface').css('background-image'),
      name: $('#bigface .name').html(),
      job: $('#bigface .job').html(),
      text: $('#bigface p').html()
    };

    // update bigface content
    $('#bigface').css('background-image', $el.css('background-image'));
    $('#bigface .name').html($el.find('.name').html());
    $('#bigface .job').html($el.find('.job').html());
    $('#bigface p').html($el.find('p').html());

    // update portrait
    $el.css('background-image', big.background);
    $el.find('.name').html(big.name);
    $el.find('.job').html(big.job);
    $el.find('p').html(big.text);
  };
})(window);
