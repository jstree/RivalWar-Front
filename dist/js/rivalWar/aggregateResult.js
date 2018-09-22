$(function () {
  // Aggregate Result API
  var aggregateParamType = 'noneParam';
  var aggregateParam = '';
  var aggregateURL = '/api/rivalWar/menu/getRootAggregateResult.do';
  var aggregateType = 'GET';
  var aggregateReturnType = 'json';
  function aggregateBeforeSendCallback(){ console.log("beforeSendCallback"); }
  function aggregateSuccessCallback (responseData) {
    console.log(responseData)
    $("#topNode").html("우위 스펙 갯수: " + $.number(responseData.topNumberOfAdvantages) + " 좋아요 획득 갯수 : " + $.number(responseData.topLikeCount) + "<br>총 등록 글 : " + $.number(responseData.topTotalRegisteredPosts) + " 총 등록된 해시 태그 : " + $.number(responseData.topRegisteredHashTag));
    $("#midNode").html("중위 스펙 갯수: " + $.number(responseData.midNumberOfAdvantages) + " 좋아요 획득 갯수 : " + $.number(responseData.midLikeCount) + "<br>총 등록 글 : " + $.number(responseData.midTotalRegisteredPosts) + " 총 등록된 해시 태그 : " + $.number(responseData.midRegisteredHashTag));
    $("#botNode").html("하위 스펙 갯수: " + $.number(responseData.botNumberOfAdvantages) + " 좋아요 획득 갯수 : " + $.number(responseData.botLikeCount) + "<br>총 등록 글 : " + $.number(responseData.botTotalRegisteredPosts) + " 총 등록된 해시 태그 : " + $.number(responseData.botRegisteredHashTag));

    $("#topNodeTitle").html(responseData.topName + " (" + responseData.topGraphPercent + "%)");
    $("#topNodeGraph").css("width", responseData.topGraphPercent+"%");

    $("#midNodeTitle").html(responseData.midName + " (" + responseData.midGraphPercent + "%)");
    $("#midNodeGraph").css("width", responseData.midGraphPercent+"%");

    $("#botNodeTitle").html(responseData.botName + " (" + responseData.botGraphPercent + "%)");
    $("#botNodeGraph").css("width", responseData.botGraphPercent+"%");

    $("#topScore").html($.number(responseData.topVersusScore) + " points");
    $("#midScore").html($.number(responseData.midVersusScore) + " points");
    $("#botScore").html($.number(responseData.botVersusScore) + " points");

    $("#totalTraffic").html($.number(responseData.totalTraffic) + " <i class='fa fa-caret-up color-green'></i>");
    $("#uniqueVisit").html($.number(responseData.uniqueVisit) + " <i class='fa fa-caret-down color-red'></i>");
    $("#revisitCount").html($.number(responseData.revisitCount) + " <i class='fa fa-caret-up color-green'></i>");
    $("#pageView").html($.number(responseData.pageView) + " <i class='fa fa-caret-down color-red'></i>");


    $("#totalArticle").html($.number(responseData.totalArticle));
    $("#totalLikeCount").html($.number(responseData.totalLikeCount));
    $("#totalSpecCount").html($.number(responseData.totalSpecCount));
    $("#totalHashCount").html($.number(responseData.totalHashCount));
    $("#standardError").html(responseData.standardError);
    $("#equilibriumAssumption").html(responseData.equilibriumAssumption);
    $("#probability").html(responseData.probability);
    $("#lowerLimit").html(responseData.lowerLimit);
    $("#higherLimit").html(responseData.higherLimit);
    $("#distributionTResult").html(responseData.distributionTResult);
  }
  function aggregateErrorCallback(){ console.log("errorCallback"); }
  function aggregateCompleteCallback(){ console.log("completeCallback"); }
  callAjax(aggregateParamType, aggregateParam, aggregateURL, aggregateType, aggregateReturnType, aggregateBeforeSendCallback, aggregateSuccessCallback, aggregateErrorCallback, aggregateCompleteCallback);
});
