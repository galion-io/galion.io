(function(window) {
  var $ = window.jQuery;
  $('form.subscribe-mailbox').each(function() {
    var $form = $(this);

    $form.on('submit', function() {
      $form.find('.form-error').remove();

      var email = $form.find('input[type="text"]').val();
      if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        $form.append('<div class="form-error">Please provide a valid e-mail address.</div>');
        return false;
      }

      $.post('https://api.galion.io/api/limited/Newsletter/Subscribe', { mail: email })
        .done(_success)
        .fail(function() {
          $form.append('<div class="form-error">Error adding you to the whitelist, try again in a few second :-(</div>');
        });
      return false;
    });
  });

  function _success() {
    $('form.subscribe-mailbox').each(function() {
      var $form = $(this);

      $form.find('input[type="text"]').attr('disabled', 'disabled');
      $form.find('input[type="text"]').val('Successfully subscribed !');
    });
  }
})(window);
