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

$('#txtUserName').on('keyup', function (event) {
    setLoginButtonDisableOrNot();
    if (event.key === "Enter") {
        checkIfLoginUserFormValid();
    }
});

$('#txtPassword').on('keyup', function (event) {
    setLoginButtonDisableOrNot();
    if (event.key === "Enter") {
        checkIfLoginUserFormValid();
    }
});

// check user from combo
$('#cmbUserType').change(function () {
    var userType = $('#cmbUserType').find('option:selected').text();
    var username = $('#txtUserName').val();
    var password = $('#txtPassword').val();
    console.log(userType);
    if (userType != "-Select User Type-" && username != "" && password != "") {
        $("#btnLogin").prop('disabled', false);
    } else {
        $("#btnLogin").prop('disabled', true);
    }
});

// disable sign in btn until fields fill
function setLoginButtonDisableOrNot() {
    let check = addLoginFormValidation();
    var type = $("#cmbUserType").find('option:selected').text();
    if (check && type != "-Select User Type-") {
        $("#btnLogin").prop('disabled', false);
    } else {
        $("#btnLogin").prop('disabled', true);
    }
}

// check username and pass valid to unlock sign in btn
function checkIfLoginUserFormValid() {
    var username = $('#txtUserName').val();
    if (regLoginUsername.test(username)) {
        $('#txtPassword').focus();
        var password = $('#txtPassword').val();
        var response = regLoginPassword.test(password);
        var type = $('#cmbUserType').find('option:selected').text();
        if (response && type != "-Select User Type-") {
            loginUser();
        } else {
            $('#txtPassword').focus();
        }
    } else {
        $('#txtUserName').focus();
    }
}

// check which user select
$('#inputUserType').change(function () {
    var userType = $('#inputUserType').find('option:selected').text();
    if (userType === "Admin") {
        $("#inputName").prop('disabled', false);
        $("#inputAddress").prop('disabled', false);
        $("#inputContactNo").prop('disabled', false);
        $("#inputEmail").prop('disabled', false);
        $("#inputUserName").prop('disabled', false);
        $("#inputPassword").prop('disabled', false);
        $("#inputDrivingLicence").prop('disabled', true);
        $("#inputNIC").prop('disabled', true);
        $("#inputfile1").prop('disabled', true);
        $("#inputfile2").prop('disabled', true);
        $("#inputfile3").prop('disabled', true);
        generateAdminId();
    } else if (userType === "Customer") {
        $("#inputName").prop('disabled', false);
        $("#inputAddress").prop('disabled', false);
        $("#inputContactNo").prop('disabled', false);
        $("#inputEmail").prop('disabled', false);
        $("#inputUserName").prop('disabled', false);
        $("#inputPassword").prop('disabled', false);
        $("#inputDrivingLicence").prop('disabled', false);
        $("#inputNIC").prop('disabled', false);
        $("#inputfile1").prop('disabled', false);
        $("#inputfile2").prop('disabled', false);
        $("#inputfile3").prop('disabled', false);
        generateCustomerId();
    } else {
        disableAllComponents();
    }
});

function disableAllComponents() {
    $("#inputName").prop('disabled', true);
    $("#inputAddress").prop('disabled', true);
    $("#inputContactNo").prop('disabled', true);
    $("#inputEmail").prop('disabled', true);
    $("#inputUserName").prop('disabled', true);
    $("#inputPassword").prop('disabled', true);
    $("#inputDrivingLicence").prop('disabled', true);
    $("#inputNIC").prop('disabled', true);
    $("#inputfile1").prop('disabled', true);
    $("#inputfile2").prop('disabled', true);
    $("#inputfile3").prop('disabled', true);
    $('#txtId').val("");
}

// generate Admin IDs
function generateAdminId() {
    $.ajax({
        url: baseUrl + "api/v1/admin/generateAdminID",
        method: "GET",
        success: function (res) {
            $('#txtId').val(res.data);
        }
    });
}

// generate Customer IDs
function generateCustomerId() {
    $.ajax({
        url: baseUrl + "api/v1/customer/generateCustomerId",
        method: "GET",
        success: function (res) {
            $('#txtId').val(res.data);
        }
    })
}


$('#inputName,#inputAddress,#inputContactNo,#inputNIC,#inputDrivingLicence,#inputEmail,#inputUserName,#inputPassword').on('keyup', function (event) {
    if (event.key == "Enter") {
        checkIfSignUpUserFormValid();
    }
});

// signup validation
function checkIfSignUpUserFormValid() {
    var name = $('#inputName').val();
    if (regName.test(name)) {
        $('#inputContactNo').focus();
        var contactNo = $('#inputContactNo').val();
        if (regContactNo.test(contactNo)) {
            $('#inputAddress').focus();
            var address = $('#inputAddress').val();
            if (regAddress.test(address)) {
                $('#inputEmail').focus();
                var email = $('#inputEmail').val();
                if (regEmail.test(email)) {
                    let usertype = $("#inputUserType").find('option:selected').text();
                    if (usertype === "Customer") {
                        $('#inputDrivingLicence').focus();
                        var drivingLicence = $('#inputDrivingLicence').val();
                        if (regDrivingLicenceNo.test(drivingLicence)) {
                            $('#inputNIC').focus();
                            var nicNo = $('#inputNIC').val();
                            if (regNicNo.test(nicNo)) {
                                $('#inputUserName').focus();
                                var username = $('#inputUserName').val();
                                if (regLoginUsername.test(username)) {
                                    $('#inputPassword').focus();
                                    var password = $('#inputPassword').val();
                                    if (regLoginPassword.test(password)) {
                                        if ($('#inputfile1').val() != "" && $('#inputfile2').val() != "" && $('#inputfile3').val() != "") {
                                            let res = confirm("Do you want to add this customer?");
                                            if (res) {
                                                addCustomer();
                                            }
                                        } else {
                                            alert("Please fill all fields of customer...")
                                        }
                                    } else {
                                        $('#inputPassword').focus();
                                    }
                                } else {
                                    $('#inputUserName').focus();
                                }
                            } else {
                                $('#inputNIC').focus();
                            }
                        } else {
                            $('#inputDrivingLicence').focus();
                        }
                    } else if (usertype === "Admin") {
                        $('#inputUserName').focus();
                        var username = $('#inputUserName').val();
                        if (regLoginUsername.test(username)) {
                            $('#inputPassword').focus();
                            var password = $('#inputPassword').val();
                            if (regLoginPassword.test(password)) {
                                let res = confirm("Do you want to add this admin?");
                                if (res) {
                                    addAdmin();
                                }
                            } else {
                                $('#inputPassword').focus();
                            }
                        } else {
                            $('#inputUserName').focus();
                        }

                    }
                } else {
                    $('#inputEmail').focus();
                }
            } else {
                $('#inputAddress').focus();
            }
        } else {
            $('#inputContactNo').focus();
        }
    } else {
        $('#inputName').focus();
    }
}

