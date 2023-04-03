// This script is used in infos.html to
// a) automaticall update the forms time and date fields to the current date and timearrival
// b) to reroute the user to the SBB page once the form has been submitted
function updateDateAndTime(){
    // Get the form elements to be updated
    var timeElement = document.getElementById("time");
    var dateElement = document.getElementById("date");
    // Get the values to replace the default form element values with
    var currentDateFull = new Date();
    var yyyy = currentDateFull.getFullYear();
    // For months like January, a leading 0 is required for the form value and the sbb url which isn't returned by Date.getMonth()
    var months = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12")
    var mm = months[currentDateFull.getMonth()];
    var dd = currentDateFull.getDate();
    var hh = currentDateFull.getHours();
    var min = currentDateFull.getMinutes();
    // If the time is something like xx:05, min will just be 1 which will not be accepted by the form input field as a value
    // Only figured that one out at 13:01 XD
    if(min <= 9){
        min = String("0" + min);
    }
    // Something similar happened on the 3 of April with the date XD
    if(dd <= 9){
        dd = String("0" + dd);
    }
    var currentDate = String(yyyy + "-" + mm + "-" + dd);
    var currentTime = String(hh + ":" + min);
    // Update the values
    dateElement.value = currentDate;
    timeElement.value = currentTime;
}

// This function is called when the form is submitted and redirects the user to the SBB-Fahrplan page
function callSBB(){
    let sbbFrom = document.getElementById("starting-point").value;
    let sbbTo = document.getElementById("destination").value;
    let formDate = document.getElementById("date").value;
    let sbbTime = document.getElementById("time").value;
    // Hey, the SBB wants this to be a string, don't yell at me
    let isDepartureTime = "true";
      
    if(document.getElementById("departure").checked) {
        isDepartureTime = "false";
    }

    // The date format requested by the SBB server is dd.mm.yyyy whilst the one from the input form is yyyy-mm-dd
    let sbbDateYear = formDate.slice(0 ,4);
    let sbbDateMonth = formDate.slice(5, 7);
    let sbbDateDay = formDate.slice(8);
    let sbbDate = sbbDateDay + "." + sbbDateMonth + "." + sbbDateYear;

    let url = `https://www.sbb.ch/de/kaufen/pages/fahrplan/fahrplan.xhtml?von=${sbbFrom}&nach=${sbbTo}&datum=${sbbDate}&zeit=${sbbTime}&an=${isDepartureTime}&suche=true`;
    window.open(url, "_blank");
}

window.onload = updateDateAndTime();