$(function () {
  // Compare Info API
  var compareInfoParamType = 'noneParam';
  var compareInfoParam = '';
  var compareInfoURL = '/api/rivalWar/menu/getRootCompareInfo.do';
  var compareInfoType = 'GET';
  var compareInfoReturnType = 'json';
  function compareInfoBeforeSendCallback(){ console.log("beforeSendCallback"); }
  function compareInfoSuccessCallback (responseData) {
    console.log(responseData);
    $("#compareInfoTime").text(responseData.calTime);

    $("#botImage").attr("src", responseData.botImageUrl1);

    $("#botVender").attr("href", responseData.botVenderUrl);
    $("#botVender").html(responseData.botVenderText + " <i class='fa fa-arrow-circle-right'></i>");

    $("#botPost1").attr("href", responseData.botPost1Url);
    $("#botPost1").html("<img src='" + responseData.botPost1Icon + "'> "+ responseData.botPost1Text);

    $("#botPost2").attr("href", responseData.botPost2Url);
    $("#botPost2").html("<img src='" + responseData.botPost2Icon + "'> "+ responseData.botPost2Text);

    $("#botPost3").attr("href", responseData.botPost3Url);
    $("#botPost3").html("<img src='" + responseData.botPost3Icon + "'> "+ responseData.botPost3Text);

    $("#botPost4").attr("href", responseData.botPost4Url);
    $("#botPost4").html("<img src='" + responseData.botPost4Icon + "'> "+ responseData.botPost4Text);

    $("#botPost5").attr("href", responseData.botPost5Url);
    $("#botPost5").html("<img src='" + responseData.botPost5Icon + "'> "+ responseData.botPost5Text);

    //mid
    $("#midImage").attr("src", responseData.midImageUrl1);

    $("#midVender").attr("href", responseData.midVenderUrl);
    $("#midVender").html(responseData.midVenderText + " <i class='fa fa-arrow-circle-right'></i>");

    $("#midPost1").attr("href", responseData.midPost1Url);
    $("#midPost1").html("<img src='" + responseData.midPost1Icon + "'> "+ responseData.midPost1Text);

    $("#midPost2").attr("href", responseData.midPost2Url);
    $("#midPost2").html("<img src='" + responseData.midPost2Icon + "'> "+ responseData.midPost2Text);

    $("#midPost3").attr("href", responseData.midPost3Url);
    $("#midPost3").html("<img src='" + responseData.midPost3Icon + "'> "+ responseData.midPost3Text);

    $("#midPost4").attr("href", responseData.midPost4Url);
    $("#midPost4").html("<img src='" + responseData.midPost4Icon + "'> "+ responseData.midPost4Text);

    $("#midPost5").attr("href", responseData.midPost5Url);
    $("#midPost5").html("<img src='" + responseData.midPost5Icon + "'> "+ responseData.midPost5Text);

    //top
    $("#topImage").attr("src", responseData.topImageUrl1);

    $("#topVender").attr("href", responseData.topVenderUrl);
    $("#topVender").html(responseData.topVenderText + " <i class='fa fa-arrow-circle-right'></i>");

    $("#topPost1").attr("href", responseData.topPost1Url);
    $("#topPost1").html("<img src='" + responseData.topPost1Icon + "'> "+ responseData.topPost1Text);

    $("#topPost2").attr("href", responseData.topPost2Url);
    $("#topPost2").html("<img src='" + responseData.topPost2Icon + "'> "+ responseData.topPost2Text);

    $("#topPost3").attr("href", responseData.topPost3Url);
    $("#topPost3").html("<img src='" + responseData.topPost3Icon + "'> "+ responseData.topPost3Text);

    $("#topPost4").attr("href", responseData.topPost4Url);
    $("#topPost4").html("<img src='" + responseData.topPost4Icon + "'> "+ responseData.topPost4Text);

    $("#topPost5").attr("href", responseData.topPost5Url);
    $("#topPost5").html("<img src='" + responseData.topPost5Icon + "'> "+ responseData.topPost5Text);
  }
  function compareInfoErrorCallback(){ console.log("errorCallback"); }
  function compareInfoCompleteCallback(){ console.log("completeCallback"); }
  callAjax(compareInfoParamType, compareInfoParam, compareInfoURL, compareInfoType, compareInfoReturnType, compareInfoBeforeSendCallback, compareInfoSuccessCallback, compareInfoErrorCallback, compareInfoCompleteCallback);
});
