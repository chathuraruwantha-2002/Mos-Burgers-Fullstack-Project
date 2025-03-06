document.getElementById("loginButton").addEventListener("click", function (e) {
  e.preventDefault();
  validateUserCredentials();
});

function validateUserCredentials() {
  const userId = document.getElementById("userId").value.trim();
  let password = document.getElementById("password").value.trim();

  //fetch from database
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch(`http://localhost:8080/user/get-user/${userId}/${password}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {

      console.log(result);
      if (result === "true") {
        //send the user id to the homepage
        sessionStorage.setItem("userId", userId);
        window.location.href = "homepage.html";//redirect to homepage
      } else {
        alert("Invalid Email or Password. Please try again.");
      }
    })
    .catch((error) => console.error(error));
}
