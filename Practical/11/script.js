// Registration
if (document.getElementById("registerForm")) {
    document.getElementById("registerForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        mobile: document.getElementById("mobile").value,
        dob: document.getElementById("dob").value,
        city: document.getElementById("city").value,
        address: document.getElementById("address").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
      };
  
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(() => {
        alert("Registration successful. Please login.");
        window.location.href = "login.html";
      });
    });
  }
  
  // Login
  if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value;
      const password = document.getElementById("loginPassword").value;
  
      fetch("http://localhost:3000/users")
        .then(res => res.json())
        .then(users => {
          const user = users.find(u => u.username === username && u.password === password);
          if (user) {
            localStorage.setItem("loggedInUser", user.id);
            window.location.href = "profile.html";
          } else {
            alert("Invalid credentials");
          }
        });
    });
  }
  