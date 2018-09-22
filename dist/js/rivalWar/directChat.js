$(function () {
  console.log("directChat script done");

  // 메뉴 API
  var ajaxParamType = 'noneParam';
  var ajaxParam = '';
  var ajaxURL = '/api/rivalWar/directChat/getPaginatedChildNode.do?c_id=2&pageIndex=1&pageUnit=10&pageSize=10';
  var ajaxType = 'GET';
  var ajaxReturnType = 'json';

  function beforeSendCallback() {
    console.log("beforeSendCallback");
  }

  function successCallback(responseData) {
    directChatAjaxCall(responseData.result);
  }

  function errorCallback() {
    console.log("errorCallback");
  }

  function completeCallback() {
    console.log("completeCallback");
  }

  callAjax(ajaxParamType, ajaxParam, ajaxURL, ajaxType, ajaxReturnType, beforeSendCallback, successCallback, errorCallback, completeCallback);
});


function directChatAjaxCall(jsonData){
  $('#chat-messages').empty(); //패널(div)의 내용 초기화
  var table = "";
  $(jsonData).each(function (chatIndex, chatList){

    table += "<div class='chat-message'>";

    table += "  <div class='sender pull-left'>";
    table += "    <div class='time'>" + chatList.writeTime + "</div>";
    table += "    <span class='user-lev'>";
    table += "      <img src='partials/common/img/custom/level1.png'>";
    table += "    </span>";
    table += "    <div class='icon'>";
    table += "      <img src='partials/common/img/custom/user1.png' class='img-circle' alt=''>";
    table += "    </div>";
    table += "  </div>";

    table += "  <div class='chat-message-body msg-yellow'>";
    table += "    <span class='arrow'></span>";
    table += "    <div class='sender'>";
    table += "      <a href='#'>" + chatList.userId + "</a>";
    table += "    </div>";
    table += "    <div class='text'>" + chatList.contentsBody + "</div>";
    table += "    <div class='tag'>";
    table += "      <span class='item-color-B'>" + chatList.hashTags + "</span>";
    table += "    </div>";
    table += "    <div class='btn_reply'>";
    table += "      <button class='info-box-icon chat-type type-up'>";
    table += "        <i class='fa fa-thumbs-o-up'></i>" + chatList.likeCount;
    table += "      </button>";
    table += "      <button class='info-box-icon chat-type type-down'>";
    table += "        <i class='fa fa-thumbs-o-down'></i>" + chatList.hateCount;
    table += "      </button>";
    table += "      <button class='info-box-icon chat-type type-reply'>";
    table += "        <i class='fa fa-comment-o'></i>" + "답글";
    table += "      </button>";
    table += "      <button class='info-box-icon chat-type type-reply'>";
    table += "        <i class='fa fa-bell-o'></i>" + "신고";
    table += "      </button>";
    table += "    </div>";

    table += replyChatAjaxCall(chatList);

    table += "  </div>";
    table += "</div>";

  });
  $('#chat-messages').append(table); //패널에 추가하기
}

function replyChatAjaxCall(chatList){

  console.log("replyChatAjaxCall script done");
  var table = "";
  // 메뉴 API
  var ajaxParamType = 'noneParam';
  var ajaxParam = '';
  var ajaxURL = '/api/rivalWar/directChat/getPaginatedChildNode.do?c_id=' + chatList.c_id + '&pageIndex=1&pageUnit=1&pageSize=100';
  var ajaxType = 'GET';
  var ajaxReturnType = 'json';

  function beforeSendCallback() {
    console.log("beforeSendCallback");
  }

  function successCallback(responseData) {

    var collection = responseData.result;

    table = "<ul class='reply-wrap'>";
    $(collection).each(function (replyIndex, replyList){

      table += "  <li class='reply-msg clearfix'>";
      table += "    <div class='reply-content'>";
      table += "      <div class='written-info'>";
      table += "        <span class='user-img'>";
      table += "          <img alt='message user image' src='partials/common/img/custom/user1.png'>";
      table += "        </span>";
      table += "        <span class='direct-chat-name pull-left'>" + replyList.userId + "</span>";
      table += "        <span class='direct-chat-timestamp pull-right'>" + replyList.writeTime + "</span>";
      table += "      </div>";
      table += "      <p>" + replyList.contentsBody + "</p>";
      table += "      <div>";
      table += "        <button class='info-box-icon chat-type type-up'>" + "좋아요" + replyList.likeCount + "</button>";
      table += "        <button class='info-box-icon chat-type type-reply'>" + "답글 달기" + "</button>";
      table += "      </div>";
      table += "   </div>";
      table += "  </li>";

    });
    table += "</ul>";

  }

  function errorCallback() {
    console.log("errorCallback");
  }

  function completeCallback() {
    console.log("completeCallback");
  }

  callAjax(ajaxParamType, ajaxParam, ajaxURL, ajaxType, ajaxReturnType, beforeSendCallback, successCallback, errorCallback, completeCallback);
  return table;
}


$(function(){

  if (window.localStorage.getItem("chat-simple") != null){
    var messages = window.localStorage.getItem("chat-simple").split(",");
    for (var i = 0; i < messages.length; i++){
      localStorage.removeItem("chat-simple-" + messages[i]);
    }
  }

  var Message = Backbone.Model.extend({

    defaults: function() {
      return {
        text: "empty...",
        order: Messages.nextOrder()
      };
    },

    initialize: function() {
      if (!this.get("text")) {
        this.set({"text": this.defaults().text});
      }
    }

  });

  var MessageList = Backbone.Collection.extend({
    model: Message,
    localStorage: new Backbone.LocalStorage("chat-simple"),
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },
    comparator: function(message) {
      return message.get('order');
    }

  });

  var Messages = new MessageList;

  var MessageView = Backbone.View.extend({

    className: 'chat-message',

    template: _.template($('#message-template').html()),

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    // Re-render the titles of the todo item.
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

  var AppView = Backbone.View.extend({

    el: $("#chat"),

    events: {
      "keypress #new-message":  "createOnEnter",
      "click #new-message-btn": "createOnClick"
    },

    initialize: function() {

      this.input = this.$("#new-message");

      this.listenTo(Messages, 'add', this.addOne);
      this.listenTo(Messages, 'all', this.render);

      Messages.fetch();
    },

    addOne: function(message) {
      var view = new MessageView({model: message});

      ////////////////////////////////////////////////////////////////////////////////////////////////////////// ajax
      //ref=10&c_position=0&c_title=test&c_type=default
      var insertChatParamType = 'objectPut';
      var insertChatParam = { ref:10, c_position:0, c_type:'default', c_title: message.get('text')};
      var insertChatURL = '/api/rivalWar/ROLE_USER/directChat/addNode.do';
      var insertChatType = 'GET';
      var insertChatReturnType = 'json';
      function beforeSendCallback(){ console.log("beforeSendCallback"); }
      function successCallback (insertChatData) {
        console.log(JSON.stringify(insertChatData));
        this.$("#chat-messages").prepend(view.render().el);
      }
      function errorCallback(){ console.log("errorCallback"); }
      function completeCallback(){ console.log("completeCallback"); }
      callAjax(insertChatParamType, insertChatParam, insertChatURL, insertChatType, insertChatReturnType, beforeSendCallback, successCallback, errorCallback, completeCallback);
      ////////////////////////////////////////////////////////////////////////////////////////////////////////// ajax
    },

    createOnEnter: function(e) {
      if (Messages.length < 10){
        if (e.keyCode != 13) return;
        if (!this.input.val()) return;

        Messages.create({text: this.input.val()});
        this.input.val('');

        var view = this.$("#chat-messages")[0];
        view.scrollTop = view.scrollHeight;
      }
    },

    createOnClick: function(e) {
      if (Messages.length < 10){
        if (!this.input.val()) return;

        Messages.create({text: this.input.val()});
        this.input.val('');

        var view = this.$("#chat-messages")[0];
        view.scrollTop = view.scrollHeight;
      }
    }

  });

  // Finally, we kick things off by creating the **App**.
  var App = new AppView;
});
