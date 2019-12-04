$(document).ready(function() {
  var newEmail = $("#email-input");
  var newPassword = $("#password-input");

  $("#newPerson").click(function(){
    event.preventDefault();
    newPeople();
    });
    
     function newPeople() { 
      var newUser = {
        email: newEmail.val().trim(),
        password: newPassword.val().trim()
      };
      if (!newUser.email || !newUser.password) {
        alert("Please enter a valid email and password")
        window.location.replace("/signup");
        return;
      }
      console.log(newUser.email)
      console.log(newUser.password)
      $.post("/api/signup", {
        email: newUser.email,
        password: newUser.password
      })
      .then(function(data) {
        alert("Welcome to Fork Yourself! Please log in.");
        window.location.replace("/login");
        console.log(data)
      })
      .catch(handleLoginErr);
      // alert("oops.... looks like we forked up this time")
     }; 

     function handleLoginErr(err) {
      alert("Somethings forked up. Please try again")
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
      window.location.replace("/signup");
    }
  
});
