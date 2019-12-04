$(document).ready(function() {

  var yourEmail = $("#your-email");
  var yourPassword = $("#your-password");

  $("#oldPerson").click(function(){
    event.preventDefault();
    oldPeople();
    });
    
     function oldPeople() { 
      var oldUser = {
        email: yourEmail.val().trim(),
        password: yourPassword.val().trim()
      };
      if (!oldUser.email || !oldUser.password) {
        alert("Please enter a valid email and password")
        window.location.replace("/signup");
        return;
      }
      console.log(oldUser.email)
      console.log(oldUser.password)
      $.post("/api/login", {
        email: oldUser.email,
        password: oldUser.password
      })
      .then(function() {
        window.location.replace("/account");
      })
      .catch(function(err) {
        alert("Please enter a valid email and password")
        console.log(err);
      });
     }; 


});