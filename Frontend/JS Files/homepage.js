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