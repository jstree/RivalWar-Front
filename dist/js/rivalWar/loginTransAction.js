$(function () {

  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
    return false;
  };

  // 로그인 트랜잭션
  var loginResult = getUrlParameter('loginResult');
  console.log(loginResult);
  if (loginResult == "success") {
    console.log("login complete");
  } else {
    console.log("not login");

    $('.btn-facebook').click(function(e) {
      console.log("facebook login");
      e.preventDefault();

      $.getJSON("/api/jsTreeServiceFramework/security/csrf.do", function (json) {
        if (json != null) {
          loginProcessExcute(json._csrf_token);
        }
      });

    });

  }

  function loginProcessExcute(csrf_token){
    var f = document.createElement("form");
    f.setAttribute('method',"post");
    f.setAttribute('action',"/auth/facebook?scope=email");
    f.setAttribute('id',"facebookSocialloginForm");

    e=document.createElement('INPUT');
    e.type='TEXT';
    e.name='_csrf';
    e.value=csrf_token;
    f.appendChild(e);

    document.getElementsByTagName('body')[0].appendChild(f);
    $('#facebookSocialloginForm').submit();
  }
});
