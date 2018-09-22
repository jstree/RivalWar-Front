$(function () {
  console.log("csrf start");
  $.getJSON("/api/jsTreeServiceFramework/security/csrf.do", function (json) {
    var csrfValue = $("input[name=_csrf]:hidden");
    csrfValue.val(json._csrf_token);
  });
});
