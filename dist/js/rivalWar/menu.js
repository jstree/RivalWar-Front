$(function () {

  console.log("menu script done");

  // 메뉴 API
  var ajaxParamType = 'noneParam';
  var ajaxParam = '';
  var ajaxURL = '/api/rivalWar/menu/getRootMenuCategories.do';
  var ajaxType = 'GET';
  var ajaxReturnType = 'json';

  function beforeSendCallback() {
    console.log("beforeSendCallback");
  }

  function successCallback(responseData) {
    rootMenuAjaxCall(responseData);
  }

  function errorCallback() {
    console.log("errorCallback");
  }

  function completeCallback() {
    console.log("completeCallback");
  }

  callAjax(ajaxParamType, ajaxParam, ajaxURL, ajaxType, ajaxReturnType, beforeSendCallback, successCallback, errorCallback, completeCallback);
});

function rootMenuAjaxCall(jsonData){
  $(jsonData).each(function (entryIndex, entryList){
    if (entryIndex == 0) {
      ///////////////////////////////////////////////////////////////////////////////////////////////
      //recentChild Menu create
      $("#menuMainTitle").html(entryList.c_title);

      var recentParamType = 'noneParam';
      var recentParam = '';
      var recentURL = '/api/rivalWar/menu/getRecentList.do';
      var recentType = 'GET';
      var recentReturnType = 'json';
      function beforeSendCallback(){ console.log("beforeSendCallback"); }
      function successCallback (recentData) {
        recentMenuAjaxCall(recentData);
      }
      function errorCallback(){ console.log("errorCallback"); }
      function completeCallback(){ console.log("completeCallback"); }
      callAjax(recentParamType, recentParam, recentURL, recentType, recentReturnType, beforeSendCallback, successCallback, errorCallback, completeCallback);

      ///////////////////////////////////////////////////////////////////////////////////////////////
    } else if (entryIndex == 1) {
      ///////////////////////////////////////////////////////////////////////////////////////////////
      //classified Menu create
      $("#menuSubTitle").html(entryList.c_title);

      var classifiedParamType = 'noneParam';
      var classifiedParam = '';
      var classifiedURL = '/api/rivalWar/menu/getClassifiedMenu.do';
      var classifiedType = 'GET';
      var classifiedReturnType = 'json';
      function beforeSendCallback(){ console.log("beforeSendCallback"); }
      function successCallback (classifiedData) {
        classifiedMenuAjaxCall(classifiedData);
      }
      function errorCallback(){ console.log("errorCallback"); }
      function completeCallback(){ console.log("completeCallback"); }
      callAjax(classifiedParamType, classifiedParam, classifiedURL, classifiedType, classifiedReturnType, beforeSendCallback, successCallback, errorCallback, completeCallback);
      ///////////////////////////////////////////////////////////////////////////////////////////////
    }
  });
}

function recentMenuAjaxCall(recentData){
  $('#recent-menu-levels-collapse').empty(); //패널(div)의 내용 초기화
  var table = "";
  //data를 탐색 : each() 메서드를 사용해서 데이터가 있는 만큼 반복
  $.each(recentData, function (recentIndex, recentEntry) {
    table += "<li><a href='#'>" + recentEntry.c_title + " <span class='label label-important'>new</span></a></li>";
  });
  $('#recent-menu-levels-collapse').append(table); //패널에 추가하기
}


function classifiedMenuAjaxCall(categoryData){
  $('#menu-levels-collapse').empty(); //패널(div)의 내용 초기화
  var table = "";

  //data를 탐색 : each() 메서드를 사용해서 데이터가 있는 만큼 반복
  $.each(categoryData, function (categoryIndex, categoryEntry) {
    var categoryCompareStr = JSON.stringify(categoryEntry.childcount);
    var categoryCheckStr = new String();
    categoryCheckStr = categoryCompareStr.toString().replace(/"/g, "");
    console.log(categoryCheckStr);
    if ("NoChild" == new String(categoryCheckStr).valueOf()) {

      table += "<li><a href='#'>" + categoryEntry.c_title + "</a></li>";

    } else {
      table += "<li class='panel'>";
      table += "<a class='accordion-toggle collapsed' data-toggle='collapse' data-parent='#menu-levels-collapse' href='#sub-menu-" + categoryIndex + "-collapse'>" + categoryEntry.c_title + "</a>";
      table += "<ul id='sub-menu-" + categoryIndex + "-collapse' class='panel-collapse collapse'>";

      table += childMenuCallAjax(categoryEntry.c_id);

      table += "</ul>";
      table += "</li>";
    }
  });
  $('#menu-levels-collapse').append(table); //패널에 추가하기
}


function childMenuCallAjax(c_id) {
  var table = "";
  var ajaxParamType = 'c_id';
  var ajaxParam = c_id;
  var ajaxURL = '/api/rivalWar/menu/getChildNode.do';
  var ajaxType = 'GET';
  var ajaxReturnType = 'json';
  function beforeSendCallback(){ console.log("beforeSendCallback"); }
  function successCallback (childData) {
    $.each(childData, function (childIndex, childEntry) {
      table += "<li><a href='#'>" + childEntry.c_title + "</a></li>";
    });
  }
  function errorCallback(){ console.log("errorCallback"); }
  function completeCallback(){ console.log("completeCallback"); }
  callAjax(ajaxParamType, ajaxParam, ajaxURL, ajaxType, ajaxReturnType, beforeSendCallback, successCallback, errorCallback, completeCallback);
  return table;
}
