
setDateandTime();
function setDateandTime() {
    document.getElementById("date").innerHTML = new Date().toLocaleDateString();
    document.getElementById("time").innerHTML = new Date().toLocaleTimeString();    
    setInterval(setDateandTime, 1000);
}

