var callMsg;
var app ={};
app.dataStore;
app.server = 'https://api.parse.com/1/classes/chatterbox?order=-createdAt';
app.init = function (){
  $(document).ready(function(){
    app.fetch();
    setTimeout(function(){
      callMsg();
    },3000);
  })
};
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
  $('.messages').text('');
};
app.addMessage = function (message){
  this.send(message);
};
app.addRoom = function (room){
  $('#roomSelect').append('<div>'+ room + '</div>');
};

app.addFriend = function(name){
  var collection = $('.username')
  console.log('friend added');
  for (var i =0; i< collection.length; i++){
    if (collection[i].innerHTML === name){
      $(collection[i]).siblings().toggleClass('bold');
    }
  }
  var restore = function(){};
}
app.addFriend.called = function(){ return true; };

app.handleSubmit =function(){
    var message = {
      'username': 'WaterBottle',
      'roomname': '4chan'
    };
    message.username= $(".userName").val();
    message.text = $(".textbox").val();
    message.roomname=$(".roomName").val();
    app.send(message);

}
app.callMsg = function(){

}

 var rooms = {};



$(document).ready(function (){
  app.init();
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

  $(".submit").submit(function (){
    app.handleSubmit();
  });





  $(".refresh").click(function(e){
    e.preventDefault();
    // var oldLength = dataStore.length;
    rooms = {};
    $('.dropList').text('')
    console.log(rooms);
    app.fetch();
    callMsg();
  });


  callMsg = function(filter){
    filter = filter || true;

    for (var i  = 0; i< app.dataStore.length; i++){
      var rName = app.dataStore[i].roomname;

      if( !rooms.hasOwnProperty(rName)){
        rooms[rName] = 1;
      } else {
        rooms[rName] += 1;
      }
      if( filter === rName || filter === true){
        $('.messages').append('<div class="msgs"></div');
        $($('.msgs')[i]).append('<span class="username"></span><p></p>')
        $( $('.username')[i] ).text(app.dataStore[i].username).on('click', function() {
          app.addFriend(this.innerHTML);
        });
        $($('p')[i]).text(app.dataStore[i].text);
      }
    }

    // $('.username').on('click', function(){
    //   app.addFriend(this.innerHTML);
    // })
    var i = 0;
    for( var key in rooms ){
      $('.dropList').append('<option class="rooms"></option>');
      $($('.rooms')[i]).text(key);
      i += 1;
    }
  }

  $('select').on('change', function(){
    var roomname = this.options[this.selectedIndex].innerHTML;
    app.clearMessages();
    console.log('heere')
    callMsg(roomname);

  });

  // postLots();

});


