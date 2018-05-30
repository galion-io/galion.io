(function(window) {
  var $ = window.jQuery;
  window.toggleMarketplaceImage = function toggleMarketplaceImage(el, name) {
    $('#shema-marketplace').attr('src', 'img/marketplace-' + name + '.png');
    $('#marketplace .bullet.active').removeClass('active');
    $(el).addClass('active');
  };
})(window);
