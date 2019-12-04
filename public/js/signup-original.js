$(document).ready(function () {

    var user = {};

    function getValues() {
        var userName = $("#userName").val().trim();
        var userEmail = $("#userEmail").val().trim();
        var userTel = $("#userTel").val().trim();
        var userPassword1 = $("#userPassword1").val().trim();
        var userPassword2 = $("#userPassword2").val().trim();
        if (userPassword1 === userPassword2) {
            user.user_name = userName, 
            user.user_email = userEmail, 
            user.user_telephone = userTel,
            user.user_password = userPassword1
        } else {
            alert("Passwords must match!")
        }
    };

    $("#submitBtn").click(function (event) {
        event.preventDefault();
        getValues();
        console.log(user);
    });

});
