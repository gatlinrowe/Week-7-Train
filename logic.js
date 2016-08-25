
// 1. Initialize Firebase
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDFxLVKmCvLvUhjMK8PWVAYfu4_9mkYfak",
    authDomain: "train-time-423c1.firebaseapp.com",
    databaseURL: "https://train-time-423c1.firebaseio.com",
    storageBucket: "train-time-423c1.appspot.com",
  };
  firebase.initializeApp(config);

var database = firebase.database();
// 2. Button for adding Employees
$("#submitBtn").on("click", function(){

	// Grabs user input
	var Name = $("#nameInput").val().trim();
	var Destination = $("#destinationInput").val().trim();
	var First = $("#firstInput").val().trim();
	var Frequency = $("#frequencyInput").val().trim();

	// Creates local "temporary" object for holding Train data
	var newTrain = {
		dataName: Name,
		dataDestination: Destination,
		dataFirst: First,
		dataFrequency: Frequency, 
	}

	// Uploads employee data to the database
	database.ref().push(newTrain);

	// Logs everything to console
	console.log(newTrain.dataName);
	console.log(newTrain.dataDestination);
	console.log(newTrain.dataFirst);
	console.log(newTrain.dataFrequency);

	// Clears all of the text-boxes
	$("#nameInput").val("");
	$("#destinationInput").val("");
	$("#firstInput").val("");
	$("#frequencyInput").val("");

	// Prevents moving to new page
	return false;
});


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry

database.ref().on('child_added', function(snapshot){
	var row = $("<tr>");
	var namerow = $("<td>");
	var destinationRow = $("<td>");
	var frequencyRow = $("<td>");
	var nextRow = $("<td>");
	var minutesRow = $("<td>");
	var firstrun = moment(snapshot.val().dataFirst, 'HH:mm');
	var frequency = snapshot.val().dataFrequency;
	var sincefirst = moment().diff(firstrun, 'minutes');
	var sincelast = sincefirst % frequency;
	var minutesaway = frequency - sincelast;
	var nextarrival = moment().add(minutesaway, 'minutes');
	console.log(nextarrival);
	console.log(firstrun)
	console.log(frequency)
	console.log(sincefirst)
	console.log(sincelast);
	console.log(minutesaway);

	namerow.text(snapshot.val().dataName)
	destinationRow.text(snapshot.val().dataDestination)
	frequencyRow.text(snapshot.val().dataFrequency)
	nextRow.text(moment(nextarrival).format("HH:mm"));
	minutesRow.text(minutesaway)
	namerow.appendTo(row)
	destinationRow.appendTo(row)
	frequencyRow.appendTo(row)
	nextRow.appendTo(row)
	minutesRow.appendTo(row)
	row.appendTo($("#table"))

	}, function(error){
		console.log(error.code);
		console.log(error.message);
	});
// database.ref().on("child_added", function(childsnapshot.val()shot, prevChildKey){

// 	console.log(childsnapshot.val()shot.val());

// 	// Store everything into a variable.
// 	var Name = childsnapshot.val()shot.val().dataName;
// 	var Destination = childsnapshot.val()shot.val().dataDestination;
// 	var First = childsnapshot.val()shot.val().dataFirst;
// 	var Frequency = childsnapshot.val()shot.val().dataFrequency;
// 	var Next = 0;
// 	var Away = 0;
// 	// Employee Info
// 	console.log(Name);
// 	console.log(Destination);
// 	console.log(First);
// 	console.log(Frequency);

// 	// Prettify the employee start
// 	//var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
// 	// Calculate the months worked using hardconre math
// 	// To calculate the months worked
// 	//var empMonths = moment().diff(moment.unix(empStart, 'X'), "months");
// 	//console.log(empMonths);

// 	// Calculate the total billed rate
// 	//var empBilled = empMonths * empRate;
// 	//console.log(empBilled);

// 	// Add each train's data into the table
// 	$("#table > tbody").append("<tr><td>" + Name + "</td><td>" + Destination + "</td><td>" + Frequency + "</td><td>" + Next+ "</td><td>" + Away + "</td><td>");

// });
