
// About Page PopUp //
function aboutPopUp() {
  var about = document.getElementById("aboutPop");
  about.classList.toggle("show");
  //popupAbout.classList.toggle("show");//
}

// Share Form PopUp//

/*function sharePopUp() {
  console.log("you clicked!");
  var popupShare = document.getElementById("share");
  popupShare.classList.toggle("show");
  console.log("you got to the end of the function!");
};*/


/*Share: Message */

/*function myOtherFunction(){
	var share = document.getElementById("otherPopup");
  share.classList.toggle("show");*/

$(function() {
  $.get('/messages', function(messages) {
    messages.forEach(function(message) {
      $('#messages').append('<li>' + message[0] + '</li>');
    });
  });

  $('form').submit(function(event) {
    event.preventDefault();
    var messageText = $('input#messageText').val();
    $.post('/messages?' + $.param({ messageText: messageText, question: 'the question', answer: 'the answer' }), function() {
      $('#messages').append('<li>' + messageText + '</li>');
      $('input#messageText').val('');
      $('input').focus();
    });
  });
});

document.getElementById('message').addEventListener('submit', (event) => {
    event.preventDefault();

	base.create({
		'Title': document.getElementById('message-title').value,
		'Message': document.getElementById('message-body').value
	}, (err, record) => {
    	if (err) {
	      console.error(err);
    	  return;
	    }
	});
});
;
