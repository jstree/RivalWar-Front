$(function () {

  // CompareSpec API
  var compareSpecParamType = 'noneParam';
  var compareSpecParam = '';
  var compareSpecURL = '/api/rivalWar/menu/getRootCompareSpec.do';
  var compareSpecType = 'GET';
  var compareSpecReturnType = 'json';
  function compareSpecBeforeSendCallback(){ console.log("beforeSendCallback"); }
  function compareSpecSuccessCallback (responseData) {
    console.log(responseData);
    $("#compareSpecTime").text(responseData.calTime);

    //bot
    $("#botSpec1Title").html(responseData.botSpec1Title);
    $("#botSpec1Amount").html(responseData.botSpec1Amount);
    $("#botSpec1Trend").html(responseData.botSpec1Trend);
    $("#botSpec1Graph").css("width", responseData.botSpec1Graph+"%");

    $("#botSpec2Title").html(responseData.botSpec2Title);
    $("#botSpec2Amount").html(responseData.botSpec2Amount);
    $("#botSpec2Trend").html(responseData.botSpec2Trend);
    $("#botSpec2Graph").css("width", responseData.botSpec2Graph+"%");

    $("#botSpec3Title").html(responseData.botSpec3Title);
    $("#botSpec3Amount").html(responseData.botSpec3Amount);
    $("#botSpec3Trend").html(responseData.botSpec3Trend);
    $("#botSpec3Graph").css("width", responseData.botSpec3Graph+"%");

    $("#botSpec4Title").html(responseData.botSpec4Title);
    $("#botSpec4Amount").html(responseData.botSpec4Amount);
    $("#botSpec4Trend").html(responseData.botSpec4Trend);
    $("#botSpec4Graph").css("width", responseData.botSpec4Graph+"%");

    $("#botSpec5Title").html(responseData.botSpec5Title);
    $("#botSpec5Amount").html(responseData.botSpec5Amount);
    $("#botSpec5Trend").html(responseData.botSpec5Trend);
    $("#botSpec5Graph").css("width", responseData.botSpec5Graph+"%");

    //mid
    $("#midSpec1Title").html(responseData.midSpec1Title);
    $("#midSpec1Amount").html(responseData.midSpec1Amount);
    $("#midSpec1Trend").html(responseData.midSpec1Trend);
    $("#midSpec1Graph").css("width", responseData.midSpec1Graph+"%");

    $("#midSpec2Title").html(responseData.midSpec2Title);
    $("#midSpec2Amount").html(responseData.midSpec2Amount);
    $("#midSpec2Trend").html(responseData.midSpec2Trend);
    $("#midSpec2Graph").css("width", responseData.midSpec2Graph+"%");

    $("#midSpec3Title").html(responseData.midSpec3Title);
    $("#midSpec3Amount").html(responseData.midSpec3Amount);
    $("#midSpec3Trend").html(responseData.midSpec3Trend);
    $("#midSpec3Graph").css("width", responseData.midSpec3Graph+"%");

    $("#midSpec4Title").html(responseData.midSpec4Title);
    $("#midSpec4Amount").html(responseData.midSpec4Amount);
    $("#midSpec4Trend").html(responseData.midSpec4Trend);
    $("#midSpec4Graph").css("width", responseData.midSpec4Graph+"%");

    $("#midSpec5Title").html(responseData.midSpec5Title);
    $("#midSpec5Amount").html(responseData.midSpec5Amount);
    $("#midSpec5Trend").html(responseData.midSpec5Trend);
    $("#midSpec5Graph").css("width", responseData.midSpec5Graph+"%");

    //top
    $("#topSpec1Title").html(responseData.topSpec1Title);
    $("#topSpec1Amount").html(responseData.topSpec1Amount);
    $("#topSpec1Trend").html(responseData.topSpec1Trend);
    $("#topSpec1Graph").css("width", responseData.topSpec1Graph+"%");

    $("#topSpec2Title").html(responseData.topSpec2Title);
    $("#topSpec2Amount").html(responseData.topSpec2Amount);
    $("#topSpec2Trend").html(responseData.topSpec2Trend);
    $("#topSpec2Graph").css("width", responseData.topSpec2Graph+"%");

    $("#topSpec3Title").html(responseData.topSpec3Title);
    $("#topSpec3Amount").html(responseData.topSpec3Amount);
    $("#topSpec3Trend").html(responseData.topSpec3Trend);
    $("#topSpec3Graph").css("width", responseData.topSpec3Graph+"%");

    $("#topSpec4Title").html(responseData.topSpec4Title);
    $("#topSpec4Amount").html(responseData.topSpec4Amount);
    $("#topSpec4Trend").html(responseData.topSpec4Trend);
    $("#topSpec4Graph").css("width", responseData.topSpec4Graph+"%");

    $("#topSpec5Title").html(responseData.topSpec5Title);
    $("#topSpec5Amount").html(responseData.topSpec5Amount);
    $("#topSpec5Trend").html(responseData.topSpec5Trend);
    $("#topSpec5Graph").css("width", responseData.topSpec5Graph+"%");
  }
  function compareSpecErrorCallback(){ console.log("errorCallback"); }
  function compareSpecCompleteCallback(){ console.log("completeCallback"); }
  callAjax(compareSpecParamType, compareSpecParam, compareSpecURL, compareSpecType, compareSpecReturnType, compareSpecBeforeSendCallback, compareSpecSuccessCallback, compareSpecErrorCallback, compareSpecCompleteCallback);


});
