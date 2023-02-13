let regLoginUsername = /^[A-z0-9]{6,10}$/;
let regLoginPassword = /^[A-z0-9@#$%&!*]{8,}$/;
let regName = /^[A-z .]{3,}$/;
let regAddress = /^[A-z ,.0-9]{3,}$/;
let regContactNo = /^(0)[1-9][0-9][0-9]{7}$/;
let regEmail = /^[a-z0-9]{3,}(@)[a-z]{3,}(.)[a-z]{2,3}$/;
let regDrivingLicenceNo = /^(B)[0-9]{7}$/;
let regNicNo = /^[0-9]{9}(V)|[0-9]{12}$/;

let baseUrl = "http://localhost:8080/Back_End_war/";

//block tab key
$('#txtUserName,#txtPassword,#inputName,#inputContactNo,#inputAddress,#inputEmail,#inputDrivingLicence,#inputNIC,#inputUserName,#inputPassword,#inputfile1,#inputfile2,#inputfile3').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$('#txtUserName,#txtPassword').on('blur', function () {
    addLoginFormValidation();
});

//Check Login validation
function addLoginFormValidation() {
    var username = $("#txtUserName").val();
    if (regLoginUsername.test(username)) {
        $("#txtUserName").css('border', '2px solid green');
        $("#userNameError").text("");
        var password = $('#txtPassword').val();
        if (regLoginPassword.test(password)) {
            $("#txtPassword").css('border', '2px solid green');
            $("#passwordError").text("");
            return true;
        } else {
            $("#txtPassword").css('border', '2px solid red');
            $("#passwordError").text("Password is not valid. Enter valid password.");
            return false;
        }
    } else {
        $("#txtUserName").css('border', '2px solid red');
        $("#userNameError").text("Username is not valid. Enter valid username");
        return false;
    }
}