const userId = sessionStorage.getItem("userId");
console.log(userId);

getUser(userId);

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


function updatedate() {
    const now = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(now);
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(now);

    document.getElementById("weekday").textContent = now.toLocaleDateString('en-US', { weekday: 'long' });
    document.getElementById("date").textContent = formattedDate;
    document.getElementById("time").textContent = formattedTime;
}

updatedate();

