// ------------------------------------------
// start of airtable JS 

// load the airtable library
var Airtable = require("airtable");
console.log(Airtable);

// add your API Key 
let base = new Airtable({apiKey: "keyxzRGZmL7bzSL5C"}).base("app3J7I3REkUeJGxY");

// get our collection base, select all records
base("media").select({}).eachPage(gotPageOfContent, gotAllContent); 
console.log("testing");


// an empty array to hold our data
var inspiration = [];

// callback function that receives our data
function gotPageOfContent(records, fetchNextPage) {
  console.log("gotPageOfContent()");
  // add the records from this page to our array
  inspiration.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllContent(err) {
  console.log("gotAllContent()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading data");
    console.error(err);
    return;
  }

  // call functions to log and show the books
  consoleLogContent();
  showContent();
}

// just loop through the Inspiration and console.log them
function consoleLogContent() {
  console.log("consoleLogContent()");
  inspiration.forEach(inspiration => {
    console.log("Record:", inspiration);
  });
}

function showContent() {
  console.log("This Works!");
  inspiration.forEach(inspiration => {

  })
}