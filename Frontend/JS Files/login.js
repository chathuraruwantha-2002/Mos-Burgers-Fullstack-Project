document.getElementById("loginButton").addEventListener("click", function (e) {
    e.preventDefault();
  
    // Get the input values
    const userId = document.getElementById("userId").value.trim();
    const password = document.getElementById("password").value.trim();
  
    // valid user id and password
    const validUserId = "chathura";
    const validPassword = "user";
  
    // Validation with strict equality for high protection
    if (userId === validUserId && password === validPassword) {
      window.location.href = "homepage.html";//redirect to homepage
    } else {
      alert("Invalid User ID or Password. Please try again.");
    }
  });
  