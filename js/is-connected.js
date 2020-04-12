(function () {
  'use strict';
  $(() => {
    $.ajaxSetup({ cache: false });
    $.ajax({
      url: '/php/is-connected.php',
      method: 'get'
    })
    .done(function (data) {
      if (data.success) {
        $('#disconnectbtn').click(function () {
          $.ajax({
            url: '/php/logout.php',
            method: 'get' 
          })
          .done(function () {
            window.location.href = '/html/login.html';
          });
        });
      } else {
        window.location.href = '/html/login.html';
      }
    })
    .fail(function () {
      $('body').html('Fatal error');
    });
  });
}) ();
