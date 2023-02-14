generateRentId();
getLastLoginUser();
generatePaymentId();

let baseUrl = "http://localhost:8080/Back_End_war/";
let today = new Date().toISOString().slice(0, 10);
$('#txtCarTodayDate').val(today);

// regex
let regRegNo = /^[A-z ]{1,3}(-)[0-9]{4}$/;
let regBrand = /^[A-z, |0-9:./]*\b$/;
let regNoOfPassengers = /^[0-9]{1,2}$/;
let regDailyRate = /^[0-9.]{1,}$/;
let regMonthlyRate = /^[0-9.]{1,}$/;
let regFreeKmForPrice = /^[0-9.]{1,}$/;
let regFreeKmForDuration = /^[0-9.]{1,}$/;
let regLossDamageWaiver = /^[0-9.]{1,}$/;
let regPriceForExtraKm = /^[0-9.]{1,}$/;
let regCompleteKm = /^[0-9.]{1,}$/;
let regCustomerId = /^(C00-)[0-9]{4}$/;
let regLicenceNo = /^(B)[0-9]{7}$/;
let regLoginUsername = /^[A-z0-9]{6,10}$/;
let regLoginPassword = /^[A-z0-9@#$%&!*]{8,}$/;
let regName = /^[A-z .]{3,}$/;
let regAddress = /^[A-z ,.0-9]{3,}$/;
let regContactNo = /^(0)[1-9][0-9][0-9]{7}$/;
let regNicNo = /^[0-9]{9}(V)|[0-9]{12}$/;
let regRentId = /^(RT0-)[0-9]{4}$/;
let regEmail = /^[a-z0-9]{3,}(@)[a-z]{3,}(.)[a-z]{2,3}$/;
let regAmount = /^[0-9.]{1,}$/;


// ---------------PROFILE-----------------------------
// My Personal Details
function getLastLoginUser() {
    $.ajax({
        url: "http://localhost:8080/Back_End_war/api/v1/login/getLastLogin",
        method: "GET",
        success: function (res) {
            let login = res.data;
            console.log(login);
            getAllUserData(login.username, login.password)
        }

    });

    function getAllUserData(username, password) {
        $.ajax({
            url: "http://localhost:8080/Back_End_war/api/v1/customer/set/" + username + "/" + password,
            method: "GET",
            success: function (res) {
                let customer = res.data;
                setCustomerDetails(customer);
                loadMyCarRentsToTable(customer.customerId);
            }
        })
    }
}

function loadMyAllPayments(customerId) {
    $('#paymentsTable').empty();
    $.ajax({
        url: "http://localhost:8080/Back_End_war/api/v1/payment/getAll/" + customerId,
        method: "GET",
        success: function (res) {
            console.log("Payments");
            for (let payment of res.data) {
                console.log(payment);
                let row = `<tr><td>${payment.paymentId}</td><td>${payment.date}</td><td>${payment.amount}</td><td>${payment.rental.rentId}</td><td>${payment.customer.customerId}</td></tr>`;
                $('#paymentsTable').append(row);
            }
        }
    })
}

// bind click event to my car rent table
function bindBookingResponsesTableCliskEvents() {
    $('#bookingResponsesTable>tr').click(function () {
        let rentId = $(this).children().eq(0).text();
        let date = $(this).children().eq(1).text();
        let pickUpDate = $(this).children().eq(2).text();
        let returnDate = $(this).children().eq(3).text();
        let regNo = $(this).children().eq(4).text();
        let custId = $(this).children().eq(5).text();
        let licenceNo = $(this).children().eq(6).text();
        let status = $(this).children().eq(7).text();

        $('#txtRentId').val(rentId);
        $('#txtDate').val(date);
        $('#txtPickupDate').val(pickUpDate);
        $('#txtReturnDate').val(returnDate);
        $('#txtRegistrationNo').val(regNo);
        $('#txtLicenceNo').val(licenceNo);
        $('#txtRentStatus').val(status);
        $('#txtRentCustId').val(custId);
    })
}

// set customer fields data
function setCustomerDetails(customer) {
    $('#txtCustId').val(customer.customerId);
    $('#txtCusId').val(customer.customerId);
    $('#txtCusName').val(customer.name);
    $('#txtCusAddress').val(customer.address);
    $('#txtCusEmail').val(customer.email);
    $('#txtCusContactNo').val(customer.contactNo);
    $('#txtCusNIC').val(customer.nicNo);
    $('#txtCusLicenceNo').val(customer.licenceNo);
    $('#txtCusUsername').val(customer.username);
}


// load rent data into table
function loadMyCarRentsToTable(customerId) {
    $('#allCarRentalsTable').empty();
    $('#bookingResponsesTable').empty();

    $.ajax({
        url: "http://localhost:8080/Back_End_war/api/v1/CarRent/getMyCarRents/" + customerId,
        method: "GET",
        success: function (res) {
            for (const carRent of res.data) {
                let licence;
                if (carRent.driver === null) {
                    licence = "No Driver";
                } else {
                    licence = carRent.driver.licenceNo;
                }
                let row = `<tr><td>${carRent.rentId}</td><td>${carRent.date}</td><td>${carRent.pickUpDate}</td><td>${carRent.returnDate}</td><td>${carRent.car.registrationNO}</td><td>${carRent.customer.customerId}</td><td>${licence}</td><td>${carRent.status}</td></tr>`;
                $('#allCarRentalsTable').append(row);
                $('#bookingResponsesTable').append(row);
            }
            bindBookingResponsesTableCliskEvents();
            loadMyAllPayments(customerId);
        }
    })
}

// customer name
$('#txtCusName').on('keyup', function (event) {
    checkCusName();
    if (event.key === "Enter") {
        if (regName.test($('#txtCusName').val())) {
            $('#txtCusAddress').focus();
        } else {
            $('#txtCusName').focus();
        }
    }
})


// function to check customer name validation
function checkCusName() {
    let name = $('#txtCusName').val();
    if (regName.test(name)) {
        $("#txtCusName").css('border', '2px solid green');
        return true;
    } else {
        $("#txtCusName").css('border', '2px solid red');
        return false;
    }
}

// customer address
$('#txtCusAddress').on('keyup', function (event) {
    checkCusAddress();
    if (event.key === "Enter") {
        if (regAddress.test($('#txtCusAddress').val())) {
            $('#txtCusEmail').focus();
        } else {
            $('#txtCusAddress').focus();
        }
    }
})


// function to check customer address validation
function checkCusAddress() {
    let address = $('#txtCusAddress').val();
    if (regAddress.test(address)) {
        $("#txtCusAddress").css('border', '2px solid green');
        return true;
    } else {
        $("#txtCusAddress").css('border', '2px solid red');
        return false;
    }
}


// customer email
$('#txtCusEmail').on('keyup', function (event) {
    checkCusEmail();
    if (event.key === "Enter") {
        if (regEmail.test($('#txtCusEmail').val())) {
            $('#txtCusContactNo').focus();
        } else {
            $('#txtCusEmail').focus();
        }
    }
})


// function to check customer email validation
function checkCusEmail() {
    let email = $('#txtCusEmail').val();
    if (regEmail.test(email)) {
        $("#txtCusEmail").css('border', '2px solid green');
        return true;
    } else {
        $("#txtCusEmail").css('border', '2px solid red');
        return false;
    }
}


// customer contact no
$('#txtCusContactNo').on('keyup', function (event) {
    checkCusContact();
    if (event.key === "Enter") {
        if (regContactNo.test($('#txtCusContactNo').val())) {
            $('#txtCusNIC').focus();
        } else {
            $('#txtCusContactNo').focus();
        }
    }
})


// function to check customer contact no validation
function checkCusContact() {
    let contact = $('#txtCusContactNo').val();
    if (regContactNo.test(contact)) {
        $("#txtCusContactNo").css('border', '2px solid green');
        return true;
    } else {
        $("#txtCusContactNo").css('border', '2px solid red');
        return false;
    }
}

// customer nic
$('#txtCusNIC').on('keyup', function (event) {
    checkCusNIC();
    if (event.key === "Enter") {
        if (regNicNo.test($('#txtCusNIC').val())) {
            $('#txtCusLicenceNo').focus();
        } else {
            $('#txtCusNIC').focus();
        }
    }
})


// function to check customer NIC validation
function checkCusNIC() {
    let nic = $('#txtCusNIC').val();
    if (regNicNo.test(nic)) {
        $("#txtCusNIC").css('border', '2px solid green');
        return true;
    } else {
        $("#txtCusNIC").css('border', '2px solid red');
        return false;
    }
}


// customer license
$('#txtCusLicenceNo').on('keyup', function (event) {
    checkCusLicence();
    if (event.key === "Enter") {
        if (regLicenceNo.test($('#txtCusLicenceNo').val())) {
            let res = confirm("Do you want to update your details?");
            if (res) {
                updateCustomer();
            }
        } else {
            $('#txtCusLicenceNo').focus();
        }
    }
})



// function to check customer license validation
function checkCusLicence() {
    let licence = $('#txtCusLicenceNo').val();
    if (regLicenceNo.test(licence)) {
        $("#txtCusLicenceNo").css('border', '2px solid green');
        return true;
    } else {
        $("#txtCusLicenceNo").css('border', '2px solid red');
        return false;
    }
}

// update Customer
function updateCustomer() {
    let customerId = $('#txtCusId').val();
    let name = $('#txtCusName').val();
    let address = $('#txtCusAddress').val();
    let email = $('#txtCusEmail').val();
    let contact = $('#txtCusContactNo').val();
    let nic = $('#txtCusNIC').val();
    let licenceNo = $('#txtCusLicenceNo').val();

    var customer = {
        customerId: customerId,
        name: name,
        address: address,
        contactNo: contact,
        email: email,
        nicNo: nic,
        licenceNo: licenceNo
    }

    $.ajax({
        url: baseUrl + "api/v1/customer",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(customer),
        success: function (res) {
            getLastLoginUser();
            clearCustomerDetails();
            swal({
                title: "Confirmation!",
                text: "Customer Updated Successfully",
                icon: "success",
                button: "Close",
                timer: 2000
            });
        },
        error: function (ob) {
            swal({
                title: "Error!",
                text: "Customer Not Updated Successfully",
                icon: "error",
                button: "Close",
                timer: 2000
            });
        }
    })
}


// btn update
$('#btnUpdateCustomer').click(function () {
    if ($('#txtCusId').val() != "") {
        let res = confirm("Do you want to update your details?");
        if (res) {
            updateCustomer();
        }
    }
})


// btn refresh
$('#btnRefreshCustomer').click(function () {
    getLastLoginUser();
    clearCustomerDetails();
})



// clear customer data fields
function clearCustomerDetails() {
    $('#txtCusId').css('border','2px solid #ced4da');
    $('#txtCusName').css('border','2px solid #ced4da');
    $('#txtCusAddress').css('border','2px solid #ced4da');
    $('#txtCusEmail').css('border','2px solid #ced4da');
    $('#txtCusContactNo').css('border','2px solid #ced4da');
    $('#txtCusNIC').css('border','2px solid #ced4da');
    $('#txtCusLicenceNo').css('border','2px solid #ced4da');
}


// ---------------BOOKING REQUEST-----------------------------
// Car and Driver Details
// get car type from combo
$('#cmbType').change(function () {
    let type = $('#cmbType').find('option:selected').text();
    clearRentalFields();
    $('#cmbRegistrationNo').empty();
    $('#cmbRegistrationNo').append(new Option("-Select Registration No-", ""));
    $.ajax({
        url: baseUrl + "api/v1/car/getRegNo/" + type,
        method: "GET",
        success: function (res) {
            let i = 0;
            for (let regNo of res.data) {
                $('#cmbRegistrationNo').append(new Option(regNo, i));
                i++;
            }
        }
    })
})


// get car reg no from combo
$('#cmbRegistrationNo').change(function () {
    let registrationNo = $('#cmbRegistrationNo').find('option:selected').text();
    $.ajax({
        url: baseUrl + "api/v1/car/" + registrationNo,
        method: "GET",
        success: function (res) {
            let car = res.data;
            setCarDataToFields(car);
        },
        error: function (ob) {
            clearRentalFields();
        }
    })
})

function setCarDataToFields(car) {
    $('#divCarFrontView').empty();
    $('#divCarBackView').empty();
    $('#divCarSideView').empty();
    $('#divCarInteriorView').empty();

    $('#txtCarBrand').val(car.brand);
    $('#txtCarColor').val(car.color);
    $('#txtCarFuel').val(car.fuelType);
    $('#txtCarTransmission').val(car.transmissionType);
    $('#txtCarNoOfPassengers').val(car.noOfPassengers);
    $('#txtCarDailyRate').val(car.dailyRate);
    $('#txtCarMonthlyRate').val(car.monthlyRate);
    $('#txtCarFreeKmForPrice').val(car.freeKmForPrice);
    $('#txtCarFreeKmForDuration').val(car.freeKmForDuration);
    $('#txtCarLossDamageWavier').val(car.lossDamageWaiver);
    $('#txtCarPriceForExtraKm').val(car.priceForExtraKm);
    $('#txtCarCompleteKm').val(car.completeKm);


    let frontViewPath = car.frontView;
    let frontViewImg = frontViewPath.split("/Users/kasunweerasinghe/Desktop/IJSE/AAD/CW/Easy_Car_Rental/Front_End/assets/savedImages/Cars/")[1];
    let FrontViewImgSrc = "assets/savedImages/Cars" + frontViewImg;

    let backViewPath = car.backView;
    let backViewImg = backViewPath.split("/Users/kasunweerasinghe/Desktop/IJSE/AAD/CW/Easy_Car_Rental/Front_End/assets/savedImages/Cars/")[1];
    let backViewImgSrc = "assets/savedImages/Cars" + backViewImg;

    let sideViewPath = car.sideView;
    let sideViewImg = sideViewPath.split("/Users/kasunweerasinghe/Desktop/IJSE/AAD/CW/Easy_Car_Rental/Front_End/assets/savedImages/Cars/")[1];
    let sideViewImgSrc = "assets/savedImages/Cars" + sideViewImg;

    let interiorViewPath = car.internalView;
    let interiorViewImg = interiorViewPath.split("/Users/kasunweerasinghe/Desktop/IJSE/AAD/CW/Easy_Car_Rental/Front_End/assets/savedImages/Cars/")[1];
    let interiorViewImgSrc = "assets/savedImages/Cars" + interiorViewImg;

    let fvImg = `<img src=${FrontViewImgSrc} alt="NIC Front" style="background-size: cover;width: 100%;height: 100%">`;
    $('#divCarFrontView').append(fvImg);

    let bvImg = `<img src=${backViewImgSrc} alt="NIC Front" style="background-size: cover;width: 100%;height: 100%">`;
    $('#divCarBackView').append(bvImg);

    let svImg = `<img src=${sideViewImgSrc} alt="NIC Front" style="background-size: cover;width: 100%;height: 100%">`;
    $('#divCarSideView').append(svImg);

    let ivImg = `<img src=${interiorViewImgSrc} alt="NIC Front" style="background-size: cover;width: 100%;height: 100%">`;
    $('#divCarInteriorView').append(ivImg);
}

function clearRentalFields() {
    $('#divCarFrontView').empty();
    $('#divCarBackView').empty();
    $('#divCarSideView').empty();
    $('#divCarInteriorView').empty();

    $('#txtCarBrand').val("");
    $('#txtCarColor').val("");
    $('#txtCarFuel').val("");
    $('#txtCarTransmission').val("");
    $('#txtCarNoOfPassengers').val("");
    $('#txtCarDailyRate').val("");
    $('#txtCarMonthlyRate').val("");
    $('#txtCarFreeKmForPrice').val("");
    $('#txtCarFreeKmForDuration').val("");
    $('#txtCarLossDamageWavier').val("");
    $('#txtCarPriceForExtraKm').val("");
    $('#txtCarCompleteKm').val("");
}



// ---------------BOOKING REQUEST-----------------------------
//Rental Details

// generate rental Id
function generateRentId() {
    $.ajax({
        url: "http://localhost:8080/Back_End_war/api/v1/CarRent/generateRentId",
        method: "GET",
        success: function (res) {
            $('#txtCarRentId').val(res.data);
        }
    })
}

// need a driver check box
$('#needDriver').click(function () {
    if ($(this).is(":checked")) {
        searchRandomDriverForRent();
    } else {
        clearRentalDriverFields();
    }
})

// search random driver
function searchRandomDriverForRent() {
    $.ajax({
        url: baseUrl + "api/v1/driver/getRandomDriver",
        method: "GET",
        success: function (res) {
            for (let driver of res.data) {
                $('#txtDriverLicenceNo').val(driver.licenceNo);
                $('#txtDriverName').val(driver.name);
                $('#txtDriverAddress').val(driver.address);
                $('#txtDriverContactNo').val(driver.contactNo);
                $('#txtDriverNIC').val(driver.nicNo);
            }
        },
        error: function (ob) {
            swal({
                title: "Error!",
                text: "Drivers are not available in this time.Please try again shortly",
                icon: "error",
                button: "Close",
                timer: 2000
            });
        }
    })
}

// clear rental details
function clearRentalDriverFields() {
    $('#txtDriverLicenceNo').val("");
    $('#txtDriverName').val("");
    $('#txtDriverAddress').val("");
    $('#txtDriverContactNo').val("");
    $('#txtDriverNIC').val("");
}