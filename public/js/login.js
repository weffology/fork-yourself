$(document).ready(function () {

  var emailInput = $("#userEmail").val().trim();
  var passwordInput = $("#userPassword").val().trim();

  $("#submitBtn").click(function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput,
      password: passwordInput
    };

    if (!userData.email || !userData.password) {
      return;
    }

    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function () {
        window.location.replace("/account");
      })
      .catch(function (err) {
        console.log(err);
      });
  };

});
