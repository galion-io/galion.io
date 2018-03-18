(function(window) {
  var $ = window.jQuery;
  window.toggleFeatureImage = function toggleFeatureImage(el, name) {
    $('#feature-img').attr('src', 'img/' + name + '.png');
    $('#features nav a').removeClass('active');
    $(el).addClass('active');
   
    $('#dashboard').css('display', 'none');
	  $('#wallets').css('display', 'none');
    $('#mobile').css('display', 'none');
    $('#'+ name).css('display', 'block');
  };
})(window);
