function callAjax(paramType, param, url, Type, returnType, beforeSendCallback, successCallback, errorCallback, completeCallback) {
  var formQueryString;
  if('html' == paramType){
    formQueryString = $(param).serialize();
  }else if('json' == paramType){
    formQueryString = JSON.stringify(param);
  }else if('noneParam' == paramType) {
    console.log("noneParam");
  }else if('objectPut' == paramType) {
    //var obj = { width:1680, height:1050 };
    formQueryString = $.param( param ); // 자바스크립트 객체(리터럴)을 쿼리스트링으로 만들어준다.
    console.log(formQueryString);          // 결과 : width=1680&height=1050

  }else{
    url += '?' + paramType + '=' + param;
  }
  $.ajax({
    url : url,
    type : Type,
    data : formQueryString,
    dataType : returnType,
    timeout : 7313,
    global : false,
    contentTypeString : 'application/x-www-form-urlencoded; charset=UTF-8',
    beforeSend: null,
    async : false,
    cache: false,
    beforeSend: function(){
      beforeSendCallback();
    },
    success: function(responseText) {
      successCallback(responseText);
    },
    error: function() {
      errorCallback();
    },
    complete: function(){
      completeCallback();
    },
    statusCode: {
      404: function() {
        alert( "page not found" );
      }
    },
    processDataBoolean: true,
    ifModified : true
  });
  //type // GET, POST, DELETE, PUT
  //dataType : xml , html , json , jsonp , script , text
}

/*
function callAjax(callAjaxObj) {

 var form          = callAjaxObj.form || null;
 var url           = callAjaxObj.url || null;
 var target        = callAjaxObj.target || null;
 var type          = callAjaxObj.type || 'get';
 var returnType    = callAjaxObj.returnType || 'json';
 var data          = callAjaxObj.data || {};
 var contentType   = callAjaxObj.contentType || 'application/x-www-form-urlencoded; charset=UTF-8';
 var jsonpCallback = callAjaxObj.jsonpCallback || 'callback';
 var processData   = callAjaxObj.processData || true;
 var crossDomain   = callAjaxObj.crossDomain || false;
 var async         = callAjaxObj.async || true;.

accepts: The content type sent in the request header that tells the server what kind of response it will accept in return
async: Set this options to false to perform a synchronous request
beforeSend: A pre-request callback function that can be used to modify the jqXHR object before it is sent
cache: Set this options to false to force requested pages not to be cached by the browser
complete: A function to be called when the request finishes (after success and error callbacks are executed)
contents: An object that determines how the library will parse the response
contentType: The content type of the data sent to the server
context: An object to use as the context (this) of all Ajax-related callbacks
converters: An object containing dataType-to-dataType converters
crossDomain: Set this property to true to force a cross-domain request (such as JSONP) on the same domain
data: The data to send to the server when performing the Ajax request
dataFilter: A function to be used to handle the raw response data of XMLHttpRequest
dataType: The type of data expected back from the server
error: A function to be called if the request fails
global: Whether to trigger global Ajax event handlers for this request
headers: An object of additional headers to send to the server
ifModified: Set this option to true if you want to force the request to be successful only if the response has changed since the last request
isLocal: Set this option to true if you want to force jQuery to recognize the current environment as “local”
jsonp: A string to override the callback function name in a JSONP request
jsonpCallback: Specifies the callback function name for a JSONP request
mimeType: A string that specifies the mime type to override the XHR mime type
password: A password to be used with XMLHttpRequest in response to an HTTP access authentication request
processData : Set this option to false if you don’t want that the data passed in to the data option (if not a string already) will be processed and transformed into a query string
scriptCharset: Sets the charset attribute on the script tag used in the request but only applies when the “script” transport is used
statusCode: An object of numeric HTTP codes and functions to be called when the response has the corresponding code
success: A function to be called if the request succeeds
timeout: A number that specifies a timeout (in milliseconds) for the request
traditional: Set this to true if you wish to use the traditional style of param serialization
type: The type of request to make, which can be either “POST” or “GET”
url: A string containing the URL to which the request is sent
username: A username to be used with XMLHttpRequest in response to an HTTP access authentication request
xhr: A callback for creating the XMLHttpRequest object
xhrFields: An object to set on the native XHR object
*/
