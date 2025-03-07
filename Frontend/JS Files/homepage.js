const userId = sessionStorage.getItem("userId");
console.log(userId);

getUser(userId);
updateCalendar();


setDateandTime();
function setDateandTime() {
    document.getElementById("date").innerHTML = new Date().toLocaleDateString();
    document.getElementById("time").innerHTML = new Date().toLocaleTimeString();
    setInterval(setDateandTime, 1000);
}


function getUser(userId) {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`http://localhost:8080/user/get-user/${userId}`, requestOptions)
        .then((response) => response.json())
        .then((user) => {
            console.log(user);
            // welcome message
            document.getElementById("welcomeMzg").innerHTML = "Welcome " + user.username;

        })
        .catch((error) => console.error(error));
}


function updateCalendar() {
    
    var currentMonth = new Date().getMonth();
    var currentYear = new Date().getFullYear();
    var currentDate = new Date().getDate();

    console.log(currentMonth, currentYear, currentDate);


    var totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    var firstDay = new Date(currentYear, currentMonth, 1).getDay();
    var calendarContainer = document.getElementById("calenderDates");
    
    calendarContainer.innerHTML = "";


    for (let i = 0; i < firstDay; i++) {
        calendarContainer.innerHTML += `<div class="day col-sm p-2"></div>`;
    }

    for (let i = 1; i <= totalDays; i++) {
        let dayOfWeek = new Date(currentYear, currentMonth, i).toLocaleString('en-us', { weekday: 'long' });

        calendarContainer.innerHTML += `
        <div class="day col-sm p-2 border border border-left-0 border-top-0 text-truncate" style="width:100px; height:100px">
            <h5 class="row align-items-center">
                <span class="date col-1">${i}</span>
                <small class="col d-sm-none text-center text-muted">${dayOfWeek}</small>
                <span class="col-1"></span>
            </h5>
        </div>`;


        if ((i + firstDay) % 7 === 0) {
            calendarContainer.innerHTML += `<div class="w-100"></div>`;
        }
    }

    for (let i = 0; i < 7 - ((totalDays + firstDay) % 7); i++) {
        calendarContainer.innerHTML += `<div class="day col-sm p-2"></div>`;
    }
}

