var config = {
    apiKey: "AIzaSyAFgq_xulFc1kFATdxqaf0N2_dplAKXFr8",
    authDomain: "calendar-a434e.firebaseapp.com",
    databaseURL: "https://calendar-a434e.firebaseio.com",
    projectId: "calendar-a434e",
    storageBucket: "",
    messagingSenderId: "498235520581"
};
firebase.initializeApp(config);
var database = firebase.database();

var calendarItem = {
    name,
    description,
    owner,
    startD,
    startT,
    endD,
    endT,
};
// Push employee record from form -> firebase; clear the form
$(document).on('click','#pushNew',function() {
    event.preventDefault();
    calendarItem.name = $('#name').val().trim();
    calendarItem.description = $('#description').val().trim();
    calendarItem.owner = $('#owner').val().trim();
    calendarItem.startD = moment($('#startD').val().trim(), "MM/DD/YYYY").format("X"); // date -> unix
    calendarItem.startT = moment($('#startT').val().trim(), "H:mm").format("X"); // time -> unix
    
    // calendarItem.concatDT = moment($('#startD' + '#startT').val().trim()).format("X");
    // console.log(calendarItem.concatDT);

    calendarItem.endD = moment($('#endD').val().trim(), "MM/DD/YYYY").format("X"); // date -> unix
    calendarItem.endT = moment($('#endT').val().trim(), "H:mm").format("X"); // time -> unix

    console.log("startD: " + calendarItem.startD);
    console.log("startT: " + calendarItem.startT);
    var testing = calendarItem.startT - calendarItem.startD;
    console.log("testing: " + testing);

    database.ref().push(calendarItem);
    $("#name").val("");
    $("#description").val("");
    $("#owner").val("");
    $("#startD").val("");
    $("#startT").val("");
    $("#endD").val("");
    $("#endT").val("");
});
// Append calendarItem to table when database receives new record 
// database.ref().on('child_added', function(snapshot) {  
//     var calendar = snapshot.val();
//     console.log(calendar);
//     calendarItem.id = snapshot.key;

//     var startDate = moment.unix(calendarItem.startDate).format('M/D/YYYY'); //converts unix -> date
//     var startTime = moment.unix(calendarItem.startTime).format('h:mm a'); //converts unix -> time
//     var endDate = moment.unix(calendarItem.endDate).format('M/D/YYYY'); //converts unix -> date
//     var endTime = moment.unix(calendarItem.endTime).format('h:mm a'); //converts unix -> time
//     var leadTime = moment().diff(moment.unix(calendarItem.startD), "days");

//     var tRow = $('<tr data-id='+calendarItem.id+'><td>' + calendarItem.name + '</td><td>' + calendarItem.description + '</td><td>' + startDate + '</td><td>$' + employee.rate + ' /mo.</td><td>' + totalMonths+' months</td><td>' + '$'+totalPaid + '</td></tr>');
//     $('#tBody').append(tRow);
// });
// // Update table when employee record changes in firebase; remove outdated row; append updated row
// firebase.database().ref().on('child_changed', function(snapshot) {
//     employee = snapshot.val();
//     startDate = moment.unix(employee.start).format('M/D/YYYY'); //converts unix -> date
//     totalMonths = moment().diff(moment.unix(employee.start), "months");
//     totalPaid = employee.rate * totalMonths;

//     var toDelete = $('[data-id='+snapshot.key+']');
//     // var toDelete = $('<tr data-id='+snapshot.key+'>'); //this didn't work
//     toDelete.empty();

//     tRow = $('<tr><td>' + employee.name + '</td><td>' + employee.role + '</td><td>' + startDate + '</td><td>$' + employee.rate + ' /mo.</td><<td>' + totalMonths+' months</td><td>' + '$'+totalPaid + '</td></tr>');
//     $('#tBody').append(tRow);
// });

    // var empStart = moment.unix(employee.start).utc();
    // console.log(empStart); //returns moment object
    // console.log('employee:' + snapshot.val().name);
    // if ($('<tr data-id='+snapshot.key+'>')) {
    // if ($('[data-id='+snapshot.key+']')) {
    //     console.log('true');
    //     $('tr 
    //     $('<tr data-id='+snapshot.key+'> ~ td').empty();
    //     $('tr ~ td').empty();
    //     this.$('<tr>').empty();
    //     $(this.$('<tr>')).empty();
    //     $('<tr data-id='+employee.id+'>').empty()
    // };
