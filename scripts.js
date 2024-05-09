let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");
let events = []; // Array to store events

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
console.log("Event added. Updating calendar...");
showCalendar(currentMonth, currentYear);

    document.getElementById("eventForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission
        console.log("Form submitted!"); // Log a message to indicate that the form is submitted
        let eventDate = document.getElementById("eventDate").value;
        let eventName = document.getElementById("eventName").value;
        console.log("Event date:", eventDate); // Log the event date being added
        console.log("Event name:", eventName); // Log the event name being added
        events.push({ date: eventDate, name: eventName }); // Add event to the array
        showCalendar(currentMonth, currentYear); // Update calendar
    });

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let tbl = document.getElementById("calendar-body"); // body of the calendar
    tbl.innerHTML = ""; // clearing all previous cells
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;
    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                break;
            } else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                let event = events.find(e => e.date === `${year}-${month + 1}-${date}`);
                if (event) {
                    cell.classList.add("event"); // Add event class to the cell if there's an event
                    cell.title = event.name; // Set title attribute to display event name
                }
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row); // appending each row into calendar body.
    }
}
