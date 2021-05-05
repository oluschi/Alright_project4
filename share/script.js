
// About Page PopUp //
// About Page PopUp //
function aboutPopUp() {
  var about = document.getElementById("aboutPop");
  about.classList.toggle("show");
  //popupAbout.classList.toggle("show");//

// About Draggle function//
//  var aboutdrag = document.addEventListener("click",function(){ //
$(document).ready(function(){
	$( "#dragAbout" ).draggable(); 

		$("#dragAbout").keydown(function(){	
  		});

		$("#dragAbout").keyup(function(){
		});
});
};

// Share Form PopUp//

/*function sharePopUp() {
  console.log("you clicked!");
  var popupShare = document.getElementById("share");
  popupShare.classList.toggle("show");
  console.log("you got to the end of the function!");
};*/


/*Share: Message */

// start of airtable JS 

// load the airtable library
var Airtable = require("airtable");
console.log(Airtable);

// add your API Key 
let base = new Airtable({apiKey: "keygEINsXOj57TR6b"}).base("app3J7I3REkUeJGxY");


document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault();

	base("media").create({
		
		"message": document.getElementById("messageText").value	
		
		
		/*'Title': document.getElementById('message-title').value,
		'message': document.getElementById('messageText').value*/

	}, (err, record) => {
    	if (err) {
	      console.error(err);
    	  return;
	    }
	});
});
;

