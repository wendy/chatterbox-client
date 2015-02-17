var app ={};
app.dataStore;
app.server = 'https://api.parse.com/1/classes/chatterbox?order=-createdAt';
app.init = function (){};
app.send = function (message){  //this is sendMsg()
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });

  $('#chats').append('<div></div>');
};
app.fetch = function (){ //this is getMSG()
    $.ajax({
      // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
      type: 'GET',
      data: 'JSON',
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Get work');
        app.dataStore = data.results;

      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Get no work');
      }
    });
};
app.clearMessages = function (){
  $('#chats').text('');
};
app.addMessage = function (message){
  this.send(message);
};
app.addRoom = function (room){
  $('#roomSelect').append('<div>'+ room + '</div>');

};

$(document).ready(function (){
  // YOUR CODE HERE:
  // var postLots = function (){
  //   for (var i = 0; i<100; i++){
  //     var message = {
  //       'username': 'Cyber Police',
  //       'roomname': '4chan'
  //     };
  //     message.text = "SAY NO TO CYBER BULLYING!";
  //     console.log(message);
  //     sendMsg(message);
  //   }
  // };

   $(".post").click(function (){
    var message = {
      'username': 'WaterBottle',
      'roomname': '4chan'
    };
    message.username= $(".userName").val();
    message.text = $(".textbox").val();
    message.roomname=$(".roomName").val();
    console.log(message);
    app.send(message);
  });





 var rooms = {};

  $(".refresh").click(function(e){
    e.preventDefault();
    // var oldLength = dataStore.length;
    app.fetch();
    callMsg();
  });
  app.fetch();
  var callMsg = function(num){
    num = num || 0;

    for (var i  = num; i< app.dataStore.length; i++){
      var rName = app.dataStore[i].objectId;

      if( !rooms.hasOwnProperty(rName)){
        rooms[rName] = 1;
      } else {
        rooms[rName] += 1;
      }
      $('.messages').append('<div class="msgs"></div');
      $($('.msgs')[i]).text(app.dataStore[i].username+" "+ app.dataStore[i].createdAt).append('<p></p>');
      $($('p')[i]).text(app.dataStore[i].text);
      // $('.messages').append('<div>' + filter(app.dataStore[i].username)+ " : "+ filter(app.dataStore[i].createdAt) + '<p>'+ filter(app.dataStore[i].text)+'</p>'+'</div>');
    }

    for( var key in rooms ){
      console.log(key);
      $('.dropList').append('<option>'+ key +'</option>');
    }
  }
 setTimeout(function(){
  callMsg();
 },3000);


  // postLots();

});


