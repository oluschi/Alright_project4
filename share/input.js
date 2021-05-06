/*Share: Message */
// start of airtable JS
// load the airtable library
var Airtable = require("airtable");
	console.log(Airtable);
// add your API Key
	let base = new Airtable({
		apiKey: "keygEINsXOj57TR6b"}).base("app3J7I3REkUeJGxY");
	
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
			window.location.href = '../index.html';
	});

});;

