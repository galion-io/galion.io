(function(window) {
  var $ = window.jQuery;

  var $cryptoballs = $('#hero .cryptoball');
  // make then move away from the mouse
  $('#hero').on('mousemove', function(ev) {
    var mouseX = ev.clientX;
    var mouseY = ev.clientY;
    $cryptoballs.each(function() {
      var $ball = $(this);
      var ballPosition = $ball.position();
      var dx = ballPosition.left + $ball.width() / 2 - mouseX;
      var dy = ballPosition.top + $ball.height() / 2 - mouseY;
      // normalize dx/dy in terms of ball size
      dx = dx / $ball.width();
      dy = dy / $ball.height();
      var dxy = Math.sqrt(dx * dx + dy * dy);

      if (dxy < 0.7) {
        $ball.attr('tx', dx * $ball.width());
        $ball.attr('ty', dy * $ball.height());
        $ball.attr('moving', 'yes');
      }
    });
  });
  // gradually come to original position
  $cryptoballs.each(function() {
    var $ball = $(this);
    setInterval(function() {
      if ($ball.attr('moving')) {
        var speed = 0.9;
        var tx = Number($ball.attr('tx')) * speed;
        var ty = Number($ball.attr('ty')) * speed;
        $ball.css('transform', 'translate3d(' + tx + 'px, ' + ty + 'px, 0)');
        if (Math.abs(tx) < 1 && Math.abs(ty) < 1) {
          $ball.attr('tx', '');
          $ball.attr('ty', '');
          $ball.attr('moving', '');
        } else {
          $ball.attr('tx', tx);
          $ball.attr('ty', ty);
        }
      }
    }, 1000 / 60);
  });
})(window);
