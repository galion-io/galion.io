(function(window) {
  var $ = window.jQuery;
  window.toggleFeatureImage = function toggleFeatureImage(el, name) {
    $('#feature-img').attr('src', 'img/' + name + '.png');
    $('#features nav a').removeClass('active');
    $(el).addClass('active');
  };
})(window);
