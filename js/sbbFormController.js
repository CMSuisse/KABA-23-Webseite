// This script is used in infos.html to
// a) automaticall update the forms time and date fields to the current date and timearrival
// b) to reroute the user to the SBB page once the form has been submitted
function updateDateAndTime(){
    // Get the form elements to be updated
    var time_element = document.getElementById("time");
    var date_element = document.getElementById("date");
    // Get the values to replace the default form element values with
    var current_date_full = new Date();
    var yyyy = current_date_full.getFullYear();
    // For months like January, a leading 0 is required for the form value and the sbb url which isn't returned by Date.getMonth()
    var months = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12")
    var mm = months[current_date_full.getMonth()];
    var dd = current_date_full.getDate();
    var hh = current_date_full.getHours();
    var min = current_date_full.getMinutes();
    // If the time is something like xx:05, min will just be 1 which will not be accepted by the form input field as a value
    // Only figured that one out at 13:01 XD
    if(min <= 9){
        min = String("0" + min);
    }
    // Something similar happened on the 3 of April with the date XD
    if(dd <= 9){
        dd = String("0" + dd);
    }
    var current_date = String(yyyy + "-" + mm + "-" + dd);
    var current_time = String(hh + ":" + min);
    // Update the values
    date_element.value = current_date;
    time_element.value = current_time;
}

// This function is called when the form is submitted and redirects the user to the SBB-Fahrplan page
function callSBB(){
    let sbb_from = document.getElementById("starting-point").value;
    let sbb_to = document.getElementById("destination").value;
    let form_date = document.getElementById("date").value;
    let sbb_time = document.getElementById("time").value;
    // Hey, the SBB wants this to be a string, don't yell at me
    let is_departure_time = "true";
      
    if(document.getElementById("departure").checked) {
        is_departure_time = "false";
    }

    // The date format requested by the SBB server is dd.mm.yyyy whilst the one from the input form is yyyy-mm-dd
    let sbb_date_year = form_date.slice(0 ,4);
    let sbb_date_month = form_date.slice(5, 7);
    let sbb_date_day = form_date.slice(8);
    let sbb_date = sbb_date_day + "." + sbb_date_month + "." + sbb_date_year;

    let url = `https://www.sbb.ch/de/kaufen/pages/fahrplan/fahrplan.xhtml?von=${sbb_from}&nach=${sbb_to}&datum=${sbb_date}&zeit=${sbb_time}&an=${is_departure_time}&suche=true`;
    window.open(url, "_blank");
}

window.onload = updateDateAndTime();