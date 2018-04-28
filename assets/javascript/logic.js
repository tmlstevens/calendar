// document.addEventListener('DOMContentLoaded', init, false);
// function init(){
//   function message () {
//     alert("Hello!");
//   }
//   var button = document.getElementById('button');
//   button.addEventListener('click', message, true);
// };

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
    date,
    startTime,
    endTime,
};
// fake record generator
$(document).on('click','#dummy',function() {
    // event.preventDefault();
    calendarItem.name = 'name';
    calendarItem.description = 'description';
    calendarItem.owner = 'administrator';
    calendarItem.date = moment().format('X');
    calendarItem.startTime = moment().startOf('day').format('X');
    calendarItem.endTime = moment().endOf('day').format('X');

    console.log("date: " + calendarItem.date);
    console.log("startTime: " + calendarItem.startTime);
    console.log("endTime: " + calendarItem.endTime);

    database.ref().push(calendarItem);

});

//Append calendarItem to table when database receives new record 
database.ref().on('child_added', function(snapshot) {  // how does the page receive the new record??
    calendarItem = snapshot.val();
    console.log(calendarItem);
    calendarItem.id = snapshot.key;

    var now = moment(); //.format('M/D/YYYY');
    var date = moment.unix(calendarItem.date); //.format('M/D/YYYY');
    var daysAway = date.diff(now, 'days');
    var hoursAway = date.diff(now, 'hours');
    console.log('now: ' + now);
    console.log('date: ' + date);
    console.log('daysAway: ' + daysAway);
    console.log('hoursAway: ' + hoursAway);

    date = moment.unix(calendarItem.date).format('M/D/YY'); // convert unix to date
    startTime = moment.unix(calendarItem.startTime).format('h:mm a'); //converts unix -> time
    endTime = moment.unix(calendarItem.endTime).format('h:mm a');

    var tRow =
    $('<tr data-id='+calendarItem.id+'><td data-id='+calendarItem.id+' id="itemName" contenteditable="false">' + calendarItem.name + '</td><td data-id='+calendarItem.id+' id="itemDescription" contenteditable="false">' + calendarItem.description + '</td><td data-id='+calendarItem.id+' id="itemOwner" contenteditable="false">' + calendarItem.owner + '</td><td data-id='+calendarItem.id+' id="itemDate" contenteditable="false">' + date + '</td><td data-id='+calendarItem.id+' id="itemStart" contenteditable="false">' + startTime + '</td><td data-id='+calendarItem.id+' id="itemEnd" contenteditable="false">' + endTime + '</td><td>' + daysAway + '</td><td><button id='+calendarItem.id+' class="edit-save">Edit</button></td></tr>');
    $('#tBody').append(tRow);

    edit();

});
// TO DO: add a listener to the edit/save button when the page loads
function edit() {
    $('.edit-save').click(function() {
        if ($(this).html() === "Edit") {
            $(this).parent().siblings().attr('contenteditable', 'true');
            $(this).html("Save");
        }
        save();
    })
}
// get the value of the <td> where data-id of parent element = 
function save() {
    $('.edit-save').click(function() {
        if ($(this).html() === "Save") {
            $(this).parent().siblings().attr('contenteditable', 'false');
            $(this).html("Edit");
            // var blaname = $('[data-id='+snapshot.key+']')
            var blaname = this;
            var thisItem = $(this).parent().siblings();
            // var blaname = thisItem.itemName;
        }
        if ($(this).attr('data-id') === $(this).siblings().attr('data-id')) {
            calendarItem.name = thisItem.$('#itemName').html();
            // calendarItem.description = $(this).parent().siblings('itemDescription').val();
            // calendarItem.owner = $(this).parent().siblings('itemOwner').val();
            // calendarItem.date = $(this).parent().siblings('itemDate').val();
            // calendarItem.startTime = $(this).parent().siblings('itemStart').val();
            // calendarItem.endTime = $(this).parent().siblings('itemEnd').val();
            console.log(blaname)
        }
        edit();
    });
}

// function saveThisRecord() {
//     $('.edit-save').click(function() {
//         if ($(this).html() === "Save") {
//             calendarItem.name = $(this).parent().siblings('itemName').val();
//             calendarItem.description = $(this).parent().siblings('itemDescription').val();
//             calendarItem.owner = $(this).parent().siblings('itemOwner').val();
//             calendarItem.date = $(this).parent().siblings('itemDate').val();
//             calendarItem.startTime = $(this).parent().siblings('itemStart').val();
//             calendarItem.endTime = $(this).parent().siblings('itemEnd').val();
//             console.log(calendarItem)
//             // database.ref().push(calendarItem);
//         }
//     })
// }

    // calendarItem.name = document.querySelector('#itemName').html();
    // calendarItem.name = $('itemName').val().trim();
    // database.ref().push(calendarItem);
    // train.destination = $('#destination').val().trim();
// };

// document.getElementById('editItem').click = function() {

// $('#editItem').click(function() {
//     console.log('yep');
//     if ($(this).html() === "Edit") {
//         // $(this).html("Save");
//         // $(this).attr('contenteditable', 'true');
//         // $('#editItem').click(function() {
//         //     saveEdit()
//         // })
//     }
//     else if ($(this).html() === "Save") {
//         $(this).html("Edit");
//         // $(this).attr('contenteditable', 'true');
//         // $('#editItem').click(function() {
//     //     //     saveEdit()
//     //     // })
//     }
// })

// document.getElementById('name').onchange = function() {myFunction()};
// function myFunction() {
//     var name = document.getElementById('name');
//     name.value = name.value.toUpperCase();
//     calendarItem.name = name.value;
//     console.log(calendarItem.name);
//     database.ref().push(calendarItem.name);
// };

// Update table when employee record changes in firebase; remove outdated row; append updated row
// firebase.database().ref().on('child_changed', function(snapshot) {
//     calendarItem = snapshot.val();
//     startDate = moment.unix(calendarItem.date).format('M/D/YYYY'); //converts unix -> date
//     totalMonths = moment().diff(moment.unix(employee.start), "months");
//     totalPaid = employee.rate * totalMonths;

//     var toDelete = $('[data-id='+snapshot.key+']');
//     // var toDelete = $('<tr data-id='+snapshot.key+'>'); //this didn't work
//     toDelete.empty();

//     tRow = $('<tr><td>' + employee.name + '</td><td>' + employee.role + '</td><td>' + startDate + '</td><td>$' + employee.rate + ' /mo.</td><<td>' + totalMonths+' months</td><td>' + '$'+totalPaid + '</td></tr>');
//     $('#tBody').append(tRow);
// });

// Push employee record from form -> firebase; clear the form
// $(document).on('click','#pushNew',function() {
//     // event.preventDefault();
//     calendarItem.name = $('#name').val().trim();
//     calendarItem.description = $('#description').val().trim();
//     calendarItem.owner = $('#owner').val().trim();
//     calendarItem.date = moment($('#date').val().trim(), "M/D/YY").format("X"); // date -> unix
//     calendarItem.startTime = moment($('#startTime').val().trim(), "h:mm a").format("H:mm");
//     calendarItem.endTime = moment($('#endTime').val().trim(), "h:mm a").format("H:mm"); // 
    
//     console.log("date: " + calendarItem.date);
//     console.log("startTime: " + calendarItem.startTime);
//     console.log("endTime: " + calendarItem.endTime);

//     database.ref().push(calendarItem);
//     $("#name").val("");
//     $("#description").val("");
//     $("#owner").val("");
//     $("#date").val("");
//     $("#startTime").val("");
//     $("#endTime").val("");
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
