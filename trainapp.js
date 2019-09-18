var firebaseConfig = {
    apiKey: "AIzaSyAqD1NZVkvEQ91qCkv-TZ6DDPy4IuXRCI4",
    authDomain: "bootcamp-ceff5.firebaseapp.com",
    databaseURL: "https://bootcamp-ceff5.firebaseio.com",
    projectId: "bootcamp-ceff5",
    storageBucket: "",
    messagingSenderId: "443678622316",
    appId: "1:443678622316:web:edc0a4cb43f595eccf8e49"
  };

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#add-train-btn").on("click", function(event){
 event.preventDefault();
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainTime = moment($("#train-time-input").val().trim(), "HH:mm").subtract(1, "years").format("x");
    var frequency = $("#frequency-input").val().trim();
    
    // console.log(firstTrainTime);
    // return false;

    var newTrain = {
        train: trainName,
        dest: destination,
        time: firstTrainTime,
        freq: frequency
}

 database.ref().push(newTrain);

//  console.log(newTrain.train);
//  console.log(netrain.dest);
//  console.log(newTrain.time);
//  console.log(newTrain.freq);

 $("#train-name-input").val("");
 $("#destination-input").val("");
 $("#train-time-input").val("");
 $("#frequency-input").val("");
})

database.ref().on("child_added", function(childSnapshot) {
 
//  console.log(childSnapshot.val());

 var trainName = childSnapshot.val().train;
 var destination = childSnapshot.val().dest;
 var firstTrainTime = childSnapshot.val().time;
 var frequency = childSnapshot.val().freq;

 var remainder = moment().diff(moment.unix(firstTrainTime), "minutes")%frequency;
 var minutes = frequency - remainder;
 var arrival = moment().add(minutes, "m").format("HH:mm a");

 $("#train-schedule > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");

})
