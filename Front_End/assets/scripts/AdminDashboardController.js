$(function () {
    // Disable Car update/delete buttons
    $("#updateCar").prop('disabled', true);
    $("#delCar").prop('disabled', true);

    // Disable Driver update/delete buttons
    $("#btnUpdateDriver").prop('disabled', true);
    $("#btnDeleteDriver").prop('disabled', true);

    // Admin Dashboard Section function
    getRegisterCustomersCount();
    getTodayBookingsCount();
    getAvailableCarCount();
    getReservedCarsCount();
    getAvailableDriverCount();
    getOccupiedDriverCount();
    loadTodayBookings();

    // Load All Car Function
    loadAllCars();

    //Customer
    loadPendingCustomers();  //load all pending customers
    loadRegisteredCustomers(); //load all registered customers


    //Driver
    loadAvailableDrivers();
    loadNonAvailableDrivers();
    loadAllDrivers();

    //Rental
    loadAllRentals();




    loadAllAcceptedRentals();


});

let today = new Date().toISOString().slice(0, 10);
let baseUrl = "http://localhost:8080/Back_End_war/";


// -------Regex-----------------
// car Validations
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


//Customer
let regCustomerId = /^(C00-)[0-9]{4}$/;

// Driver
let regLicenceNo = /^(B)[0-9]{7}$/;
let regLoginUsername = /^[A-z0-9]{6,10}$/;
let regLoginPassword = /^[A-z0-9@#$%&!*]{8,}$/;
let regName = /^[A-z .]{3,}$/;
let regAddress = /^[A-z ,.0-9]{3,}$/;
let regContactNo = /^(0)[1-9][0-9][0-9]{7}$/;
let regNicNo = /^[0-9]{9}(V)|[0-9]{12}$/;


//Rental
let regRentId = /^(RT0-)[0-9]{4}$/;
let regDetails = /^[A-z0-9 &.,/]{4,}$/;


$('#txtToday').val(today);
$('#txtTodayDate').val(today);


// ----------------------------------------------------------------------------------------------
// Admin Dashboard Section function
function getRegisterCustomersCount() {
    $.ajax({
        url: baseUrl + "api/v1/customer/count",
        method: "GET",
        success: function (res) {

            if (res.data != 0) {
                if (res.data < 10) {
                    $('#countCust').text("0" + res.data);
                } else {
                    $('#countCust').text(res.data);
                }
            } else {
                $('#countCust').text("00");
            }

        }
    });
}

function getTodayBookingsCount() {
    $.ajax({
        url: baseUrl + "api/v1/CarRent/countTodayBookings/" + today,
        method: "GET",
        success: function (res) {
            if (res.data != 0) {
                if (res.data < 10) {
                    $('#countBookings').text("0" + res.data);
                } else {
                    $('#countBookings').text(res.data);
                }
            } else {
                $('#countBookings').text("00");
            }
        }
    });
}

function getAvailableCarCount() {
    let status = "Available";
    $.ajax({
        url: baseUrl + "api/v1/car/count/" + status,
        method: "GET",
        success: function (res) {
            if (res.data != 0) {
                if (res.data < 10) {
                    $('#countAvailableCars').text("0" + res.data);
                } else {
                    $('#countAvailableCars').text(res.data);
                }
            } else {
                $('#countAvailableCars').text("00");
            }
        }
    })
}

function getReservedCarsCount() {
    let status = "Non-Available";
    $.ajax({
        url: baseUrl + "api/v1/car/count/" + status,
        method: "GET",
        success: function (res) {
            if (res.data != 0) {
                if (res.data < 10) {
                    $('#countReservedCars').text("0" + res.data);
                } else {
                    $('#countReservedCars').text(res.data);
                }
            } else {
                $('#countReservedCars').text("00");
            }
        }
    })
}

function getAvailableDriverCount() {
    let availability = true;
    $.ajax({
        url: baseUrl + "api/v1/driver/count/" + availability,
        method: "GET",
        success: function (res) {
            if (res.data != 0) {
                if (res.data < 10) {
                    $('#countAvailableDrivers').text("0" + res.data);
                } else {
                    $('#countAvailableDrivers').text(res.data);
                }
            } else {
                $('#countAvailableDrivers').text("00");
            }
        }
    })
}

function getOccupiedDriverCount() {
    let availability = false;
    $.ajax({
        url: baseUrl + "api/v1/driver/count/" + availability,
        method: "GET",
        success: function (res) {
            if (res.data != 0) {
                if (res.data < 10) {
                    $('#countOccupiedDrivers').text("0" + res.data);
                } else {
                    $('#countOccupiedDrivers').text(res.data);
                }
            } else {
                $('#countOccupiedDrivers').text("00");
            }
        }
    })
}

function loadTodayBookings() {
    $('#todayBookingTable').empty();
    $.ajax({
        url: baseUrl + "api/v1/CarRent/getTodayBookings/" + today,
        method: "GET",
        success: function (res) {
            for (const booking of res.data) {
                let licence;
                if (booking.driver === null) {
                    licence = "No Driver";
                } else {
                    licence = booking.driver.licenceNo;
                }
                let row = `<tr><td>${booking.rentId}</td><td>${booking.date}</td><td>${booking.pickUpDate}</td><td>${booking.returnDate}</td><td>${booking.customer.customerId}</td><td>${booking.car.registrationNO}</td><td>${licence}</td><td>${booking.status}</td></tr>`;
                $('#todayBookingTable').append(row);
            }
        }
    })
}


// ----------------------------------------------------------------------------------------------
// CAR Section
// Car Reg no
$('#txtRegNo').on('keyup', function (event) {
    var regNo = $('#txtRegNo').val();
    checkRegNo();
    if (event.key === "Enter") {
        if (regRegNo.test(regNo)) {
            $('#txtBrand').focus();
        } else {
            $('#txtRegNo').focus();
        }
    }
});


// Check car Reg no validation
function checkRegNo() {
    var regNo = $('#txtRegNo').val();

    if (regRegNo.test(regNo)) {
        $("#txtRegNo").css('border', '3px solid green').focus();
        return true;
    } else {
        $("#txtRegNo").css('border', '3px solid red').focus();
        return false;
    }
}


// car brand
$('#txtBrand').on('keyup', function (event) {
    var brand = $('#txtBrand').val();
    checkBrand();
    if (event.key === "Enter") {
        if (regBrand.test(brand)) {
            $('#cmbtype').focus();
        } else {
            $('#txtBrand').focus();
        }
    }
});


// Check car Brand validation
function checkBrand() {
    var brand = $('#txtBrand').val();

    if (regBrand.test(brand)) {
        $("#txtBrand").css('border', '3px solid green').focus();
        return true;
    } else {
        $("#txtBrand").css('border', '3px solid red').focus();
        return false;
    }
}


// cmb car type
$('#cmbtype').click(function () {
    checkType();
});


// Check car Type  validation
function checkType() {
    var type = $('#cmbtype').find('option:selected').text();
    if (type != "- Select Car Type -") {
        $("#cmbtype").css('border', '3px solid green').focus();
        return true;
    } else {
        $("#cmbtype").css('border', '3px solid red').focus();
        return false;
    }
}


// no of passengers
$('#txtNoOfPassengers').on('keyup', function (event) {
    var noOfPassengers = $('#txtNoOfPassengers').val();
    checkNoOfPassengers();
    if (event.key === "Enter") {
        if (regNoOfPassengers.test(noOfPassengers)) {
            $('#cmbTransmissionType').focus();
        } else {
            $('#txtNoOfPassengers').focus();
        }
    }
});


// Check No Of passengers validation
function checkNoOfPassengers() {
    var noOfPassengers = $('#txtNoOfPassengers').val();

    if (regNoOfPassengers.test(noOfPassengers)) {
        $("#txtNoOfPassengers").css('border', '3px solid green').focus();
        return true;
    } else {
        $("#txtNoOfPassengers").css('border', '3px solid red').focus();
        return false;
    }
}


// Transmission type
$('#cmbTransmissionType').click(function () {
    checkTransmission();
})


// Check Transmission validation
function checkTransmission() {
    var transType = $('#cmbTransmissionType').find('option:selected').text();
    if (transType != "- Select Transmission -") {
        $("#cmbTransmissionType").css('border', '3px solid green').focus();
        return true;
    } else {
        $("#cmbTransmissionType").css('border', '3px solid red').focus();
        return false;
    }
}


// Fuel Type
$('#cmbfuel').click(function () {
    checkFuel();
})


// Check Fuel Type validation
function checkFuel() {
    var fuel = $('#cmbfuel').find('option:selected').text();
    if (fuel != "- Select Fuel Type -") {
        $("#cmbfuel").css('border', '3px solid green').focus();
        return true;
    } else {
        $("#cmbfuel").css('border', '3px solid red').focus();
        return false;
    }
}


// cmb car color
$('#cmbColor').click(function () {
    checkColor();
})


// Check car color validation
function checkColor() {
    var color = $('#cmbColor').find('option:selected').text();
    console.log(color);
    if (color != "- Select Color -") {
        $("#cmbColor").css('border', '3px solid green').focus();
        return true;
    } else {
        $("#cmbColor").css('border', '3px solid red').focus();
        return false;
    }
}

// daily rate
$('#txtDailyRate').on('keyup', function (event) {
    var dailyRate = $('#txtDailyRate').val();
    checkDailyRate();
    if (event.key === "Enter") {
        if (regDailyRate.test(dailyRate)) {
            $('#txtMonthlyRate').focus();
        } else {
            $('#txtDailyRate').focus();
        }
    }
});


// Check car Daily Rate
function checkDailyRate() {
    var dailyRate = $('#txtDailyRate').val();
    if (regDailyRate.test(dailyRate)) {
        $("#txtDailyRate").css('border', '3px solid green').focus();
        return true;
    } else {
        $("#txtDailyRate").css('border', '3px solid red').focus();
        return false;
    }
}


// car monthly rate
$('#txtMonthlyRate').on('keyup', function (event) {
    var monthlyRate = $('#txtMonthlyRate').val();
    checkMonthlyRate();
    if (event.key === "Enter") {
        if (regMonthlyRate.test(monthlyRate)) {
            $('#txtFreeKmForPrice').focus();
        } else {
            $('#txtMonthlyRate').focus();
        }
    }
});


// Check car Monthly Rate
function checkMonthlyRate() {
    var monthlyRate = $('#txtMonthlyRate').val();
    if (regMonthlyRate.test(monthlyRate)) {
        $("#txtMonthlyRate").css('border', '3px solid green').focus();
        return true;
    } else {
        $("#txtMonthlyRate").css('border', '3px solid red').focus();
        return false;
    }
}


// free km for price
$('#txtFreeKmForPrice').on('keyup', function (event) {
    var freeKmForPrice = $('#txtFreeKmForPrice').val();
    checkFreeKmForPrice();
    if (event.key === "Enter") {
        if (regFreeKmForPrice.test(freeKmForPrice)) {
            $('#txtFreeKmForDuration').focus();
        } else {
            $('#txtFreeKmForPrice').focus();
        }
    }
});


// Check car Free Km For Price
function checkFreeKmForPrice() {
    var freeKmForPrice = $('#txtFreeKmForPrice').val();
    if (regFreeKmForPrice.test(freeKmForPrice)) {
        $("#txtFreeKmForPrice").css('border', '3px solid green').focus();
        return true;
    } else {
        $("#txtFreeKmForPrice").css('border', '3px solid red').focus();
        return false;
    }
}


// free km for the duration
$('#txtFreeKmForDuration').on('keyup', function (event) {
    var freeKmForDuration = $('#txtFreeKmForDuration').val();
    checkFreeKmForDuration();
    if (event.key === "Enter") {
        if (regFreeKmForDuration.test(freeKmForDuration)) {
            $('#txtLossDamageWaiver').focus();
        } else {
            $('#txtFreeKmForDuration').focus();
        }
    }
});


// Check car Free Km For Duration
function checkFreeKmForDuration() {
    var freeKmForDuration = $('#txtFreeKmForDuration').val();
    if (regFreeKmForDuration.test(freeKmForDuration)) {
        $("#txtFreeKmForDuration").css('border', '3px solid green').focus();
        return true;
    } else {
        $("#txtFreeKmForDuration").css('border', '3px solid red').focus();
        return false;
    }
}


// lose damage wavier
$('#txtLossDamageWaiver').on('keyup', function (event) {
    var lossDamageWaiver = $('#txtLossDamageWaiver').val();
    checkLossDamageWaiver();
    if (event.key === "Enter") {
        if (regLossDamageWaiver.test(lossDamageWaiver)) {
            $('#txtPriceForExtraKm').focus();
        } else {
            $('#txtLossDamageWaiver').focus();
        }
    }
});


// Check car Lose Damage Wavier
function checkLossDamageWaiver() {
    var lossDamageWaiver = $('#txtLossDamageWaiver').val();
    if (regLossDamageWaiver.test(lossDamageWaiver)) {
        $("#txtLossDamageWaiver").css('border', '3px solid green').focus();
        return true;
    } else {
        $("#txtLossDamageWaiver").css('border', '3px solid red').focus();
        return false;
    }
}


// price for extra km
$('#txtPriceForExtraKm').on('keyup', function (event) {
    var priceForExtraKm = $('#txtPriceForExtraKm').val();
    checkPriceForExtraKm();
    if (event.key === "Enter") {
        if (regPriceForExtraKm.test(priceForExtraKm)) {
            $('#txtCompleteKm').focus();
        } else {
            $('#txtPriceForExtraKm').focus();
        }
    }
});


// Check car Price for Extra Km
function checkPriceForExtraKm() {
    var priceForExtraKm = $('#txtPriceForExtraKm').val();
    if (regPriceForExtraKm.test(priceForExtraKm)) {
        $("#txtPriceForExtraKm").css('border', '3px solid green').focus();
        return true;
    } else {
        $("#txtPriceForExtraKm").css('border', '3px solid red').focus();
        return false;
    }
}

// car complete km
$('#txtCompleteKm').on('keyup', function () {
    checkCompleteKm();
});


// Check car Complete Km
function checkCompleteKm() {
    var completeKm = $('#txtCompleteKm').val();
    if (regCompleteKm.test(completeKm)) {
        $("#txtCompleteKm").css('border', '3px solid green').focus();
        return true;
    } else {
        $("#txtCompleteKm").css('border', '3px solid red').focus();
        return false;
    }
}

$('#saveCar').click(function () {
    if ($('#txtRegNo').val() != "") {
        if ($('#txtBrand').val() != "") {
            if ($('#cmbtype').val() != "- Select Car Type -") {
                if ($('#txtNoOfPassengers').val() != "") {
                    if ($('#cmbTransmissionType').val() != "- Select Transmission -") {
                        if ($('#cmbfuel').val() != "- Select Fuel Type -") {
                            if ($('#cmbColor').val() != "- Select Color -") {
                                if ($('#imgFrontView').val() != "") {
                                    if ($('#imgBackView').val() != "") {
                                        if ($('#imgSideView').val() != "") {
                                            if ($('#imgInteriorView').val() != "") {
                                                if ($('#txtDailyRate').val() != "") {
                                                    if ($('#txtMonthlyRate').val() != "") {
                                                        if ($('#txtFreeKmForPrice').val() != "") {
                                                            if ($('#txtFreeKmForDuration').val() != "") {
                                                                if ($('#txtLossDamageWaiver').val() != "") {
                                                                    if ($('#txtPriceForExtraKm').val() != "") {
                                                                        if ($('#txtCompleteKm').val() != "") {
                                                                            let res = confirm("Do you want to add this Car?");
                                                                            if (res) {
                                                                                addCar();
                                                                            }
                                                                        } else {
                                                                            alert("Please enter complete kilometers");
                                                                        }
                                                                    } else {
                                                                        alert("Please enter price for extra km");
                                                                    }
                                                                } else {
                                                                    alert("Please enter loss damage waiver");
                                                                }
                                                            } else {
                                                                alert("Please enter free km for duration");
                                                            }
                                                        } else {
                                                            alert("Please enter free km for price");
                                                        }
                                                    } else {
                                                        alert("Please enter monthly rate");
                                                    }
                                                } else {
                                                    alert("Please enter daily rate");
                                                }
                                            } else {
                                                alert("Please upload interior view image");
                                            }
                                        } else {
                                            alert("Please upload side view image");
                                        }
                                    } else {
                                        alert("Please upload back view image");
                                    }
                                } else {
                                    alert("Please upload front view image");
                                }
                            } else {
                                alert("Please select color");
                            }
                        } else {
                            alert("Please select fuel type");
                        }
                    } else {
                        alert("Please select transmission type");
                    }
                } else {
                    alert("Please enter no of passengers");
                }
            } else {
                alert("Please select car type");
            }
        } else {
            alert("Please enter brand");
        }
    } else {
        alert("Please enter registration No");
    }
});

function addCar() {
    let regNo = $('#txtRegNo').val();
    let brand = $('#txtBrand').val();
    let type = $('#cmbtype').find('option:selected').text();
    let noOfPassengers = $('#txtNoOfPassengers').val();
    let transmission = $('#cmbTransmissionType').find('option:selected').text();
    let fuel = $('#cmbfuel').find('option:selected').text();
    let color = $('#cmbColor').find('option:selected').text();
    let dailyRate = $('#txtDailyRate').val();
    let monthlyRate = $('#txtMonthlyRate').val();
    let freeKmForPrice = $('#txtFreeKmForPrice').val();
    let freeKmForDuration = $('#txtFreeKmForDuration').val();
    let lossDamageWavier = $('#txtLossDamageWaiver').val();
    let priceForExtraKm = $('#txtPriceForExtraKm').val();
    let completeKm = $('#txtCompleteKm').val();
    let status = "Available";

    var car = {
        registrationNO: regNo,
        brand: brand,
        type: type,
        noOfPassengers: noOfPassengers,
        transmissionType: transmission,
        fuelType: fuel,
        color: color,
        dailyRate: dailyRate,
        monthlyRate: monthlyRate,
        freeKmForPrice: freeKmForPrice,
        freeKmForDuration: freeKmForDuration,
        lossDamageWaiver: lossDamageWavier,
        priceForExtraKm: priceForExtraKm,
        completeKm: completeKm,
        status: status
    }

    $.ajax({
        url: baseUrl + "api/v1/car",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(car),
        success: function (res) {
            uploadCarImages(regNo);
            loadAllCars();
            getAvailableCarCount();
            swal({
                title: "Confirmation",
                text: "Car Added Successfully",
                icon: "success",
                button: "Close",
                timer: 2000
            });
        },
        error: function (ob) {
            swal({
                title: "Error!",
                text: "Car Not Added Successfully",
                icon: "error",
                button: "Close",
                timer: 2000
            });
        }
    })
}

// upload car image
function uploadCarImages(registrationID) {
    var fileObjectFront = $('#imgFrontView')[0].files[0];
    var fileNameFront = registrationID + "-front-" + $('#imgFrontView')[0].files[0].name;

    var fileObjectBack = $('#imgBackView')[0].files[0];
    var fileNameBack = registrationID + "-back-" + $('#imgBackView')[0].files[0].name;

    var fileObjectSide = $('#imgSideView')[0].files[0];
    var fileNameSide = registrationID + "-side-" + $('#imgSideView')[0].files[0].name;

    var fileObjectInterior = $('#imgInteriorView')[0].files[0];
    var fileNameInterior = registrationID + "-interior-" + $('#imgInteriorView')[0].files[0].name;

    var data = new FormData();
    data.append("frontImg", fileObjectFront, fileNameFront);
    data.append("backImg", fileObjectBack, fileNameBack);
    data.append("interImg", fileObjectInterior, fileNameInterior);
    data.append("sideImg", fileObjectSide, fileNameSide);

    $.ajax({
        url: baseUrl + "api/v1/car/up/" + registrationID,
        method: "PUT",
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function (res) {
            console.log("Uploaded");
            clearAddCarFields();
        }
    })
}

// clear fields function
function clearAddCarFields() {
    $('#txtRegNo').val("");
    $('#txtBrand').val("");
    $('#txtNoOfPassengers').val("");
    $('#txtDailyRate').val("");
    $('#txtMonthlyRate').val("");
    $('#txtFreeKmForPrice').val("");
    $('#txtFreeKmForDuration').val("");
    $('#txtLossDamageWaiver').val("");
    $('#txtPriceForExtraKm').val("");
    $('#txtCompleteKm').val("");
    $('#imgFrontView').val("");
    $('#imgBackView').val("");
    $('#imgSideView').val("");
    $('#imgInteriorView').val("");
    $('#cmbtype').val("");
    $('#cmbTransmissionType').val("");
    $('#cmbfuel').val("");
    $('#cmbColor').val("");
    $('#searchCar').val("");


    $('#txtRegNo').css('border', '1px solid #ced4da');
    $('#txtBrand').css('border', '1px solid #ced4da');
    $('#cmbtype').css('border', '1px solid #ced4da');
    $('#txtNoOfPassengers').css('border', '1px solid #ced4da');
    $('#cmbTransmissionType').css('border', '1px solid #ced4da');
    $('#cmbfuel').css('border', '1px solid #ced4da');
    $('#cmbColor').css('border', '1px solid #ced4da');
    $('#txtDailyRate').css('border', '1px solid #ced4da');
    $('#txtMonthlyRate').css('border', '1px solid #ced4da');
    $('#txtFreeKmForPrice').css('border', '1px solid #ced4da');
    $('#txtFreeKmForDuration').css('border', '1px solid #ced4da');
    $('#txtLossDamageWaiver').css('border', '1px solid #ced4da');
    $('#txtPriceForExtraKm').css('border', '1px solid #ced4da');
    $('#txtCompleteKm').css('border', '1px solid #ced4da');
    $('#searchCar').css('border', '1px solid #ced4da');

    $("#imgFrontView").prop('disabled', false);
    $("#imgBackView").prop('disabled', false);
    $("#imgSideView").prop('disabled', false);
    $("#imgInteriorView").prop('disabled', false);
    $("#updateCar").prop('disabled', true);
    $("#delCar").prop('disabled', true);
    $("#saveCar").prop('disabled', false);
}

// clear fields
$('#clearCar').click(function () {
    clearAddCarFields();
    loadAllCars();
});

// load all cars
function loadAllCars() {
    $('#carTable').empty();
    $.ajax({
        url: baseUrl + "api/v1/car",
        method: "GET",
        success: function (res) {
            for (const car of res.data) {
                let row = `<tr><td>${car.registrationNO}</td><td>${car.brand}</td><td>${car.type}</td><td>${car.noOfPassengers}</td><td>${car.transmissionType}</td><td>${car.fuelType}</td><td>${car.color}</td><td>${car.dailyRate}</td><td>${car.monthlyRate}</td><td>${car.freeKmForPrice}</td><td>${car.freeKmForDuration}</td><td>${car.lossDamageWaiver}</td><td>${car.priceForExtraKm}</td><td>${car.completeKm}</td><td>${car.status}</td></tr>`;
                $('#carTable').append(row);
            }
            bindCarTableClickEvents();
        }
    });
}

// bind event
function bindCarTableClickEvents() {
    $('#carTable>tr').click(function () {
        let regNo = $(this).children().eq(0).text();
        let brand = $(this).children().eq(1).text();
        let type = $(this).children().eq(2).text();
        let passengers = $(this).children().eq(3).text();
        let transmission = $(this).children().eq(4).text();
        let fuel = $(this).children().eq(5).text();
        let color = $(this).children().eq(6).text();
        let daily = $(this).children().eq(7).text();
        let monthly = $(this).children().eq(8).text();
        let kmForPrice = $(this).children().eq(9).text();
        let kmForDura = $(this).children().eq(10).text();
        let ldw = $(this).children().eq(11).text();
        let extraKm = $(this).children().eq(12).text();
        let completeKm = $(this).children().eq(13).text();

        $("#saveCar").prop('disabled', true);
        $("#updateCar").prop('disabled', false);
        $("#delCar").prop('disabled', false);
        $("#imgFrontView").prop('disabled', true);
        $("#imgBackView").prop('disabled', true);
        $("#imgSideView").prop('disabled', true);
        $("#imgInteriorView").prop('disabled', true);

        $('#txtRegNo').val(regNo);
        $('#txtBrand').val(brand);
        $('#cmbtype').find('option:selected').text(type);
        $('#txtNoOfPassengers').val(passengers);
        $('#cmbTransmissionType').find('option:selected').text(transmission);
        $('#cmbfuel').find('option:selected').text(fuel);
        $('#cmbColor').find('option:selected').text(color);
        $('#txtDailyRate').val(daily);
        $('#txtMonthlyRate').val(monthly);
        $('#txtFreeKmForPrice').val(kmForPrice);
        $('#txtFreeKmForDuration').val(kmForDura);
        $('#txtLossDamageWaiver').val(ldw);
        $('#txtPriceForExtraKm').val(extraKm);
        $('#txtCompleteKm').val(completeKm);
    });
}

// update car
$('#updateCar').click(function () {
    updateCar();
    clearAddCarFields();
})


// update car function
function updateCar() {
    let regNo = $('#txtRegNo').val();
    let brand = $('#txtBrand').val();
    let type = $('#cmbtype').find('option:selected').text();
    let noOfPassengers = $('#txtNoOfPassengers').val();
    let transmission = $('#cmbTransmissionType').find('option:selected').text();
    let fuel = $('#cmbfuel').find('option:selected').text();
    let color = $('#cmbColor').find('option:selected').text();
    let dailyRate = $('#txtDailyRate').val();
    let monthlyRate = $('#txtMonthlyRate').val();
    let freeKmForPrice = $('#txtFreeKmForPrice').val();
    let freeKmForDuration = $('#txtFreeKmForDuration').val();
    let lossDamageWavier = $('#txtLossDamageWaiver').val();
    let priceForExtraKm = $('#txtPriceForExtraKm').val();
    let completeKm = $('#txtCompleteKm').val();

    var car = {
        registrationNO: regNo,
        brand: brand,
        type: type,
        noOfPassengers: noOfPassengers,
        transmissionType: transmission,
        fuelType: fuel,
        color: color,
        dailyRate: dailyRate,
        monthlyRate: monthlyRate,
        freeKmForPrice: freeKmForPrice,
        freeKmForDuration: freeKmForDuration,
        lossDamageWaiver: lossDamageWavier,
        priceForExtraKm: priceForExtraKm,
        completeKm: completeKm
    }

    $.ajax({
        url: baseUrl + "api/v1/car",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(car),
        success: function (res) {
            loadAllCars();
            swal({
                title: "Confirmation",
                text: "Car Updated Successfully",
                icon: "success",
                button: "Close",
                timer: 2000
            });
        },
        error: function (ob) {
            swal({
                title: "Error",
                text: "Car Not Updated Successfully",
                icon: "error",
                button: "Close",
                timer: 2000
            });
        }
    })
}


// delete car
$('#delCar').click(function () {
    deleteCar();
    clearAddCarFields();
})


// delete Car function
function deleteCar() {
    let registrationNo = $('#txtRegNo').val();
    $.ajax({
        url: baseUrl + "api/v1/car?registrationNo=" + registrationNo,
        method: "DELETE",
        success: function (res) {
            loadAllCars();
            swal({
                title: "Confirmation!",
                text: "Car Deleted Successfully",
                icon: "success",
                button: "Close",
                timer: 2000
            });
        },
        error: function (ob) {
            swal({
                title: "Error",
                text: "Car Not Deleted Successfully",
                icon: "error",
                button: "Close",
                timer: 2000
            });
        }
    })
}


// search car
$('#searchCar').on('keyup', function (event) {
    checkSearchCar();
    if (event.key === "Enter") {
        searchCar();
    }
})


// check search car
function checkSearchCar() {
    var regNo = $('#searchCar').val();
    if (regRegNo.test(regNo)) {
        $("#searchCar").css('border', '3px solid green');
        return true;
    } else {
        $("#searchCar").css('border', '3px solid red');
        return false;
    }
}


// Search Car
function searchCar() {
    let registrationNo = $('#searchCar').val();
    $.ajax({
        url: baseUrl + "api/v1/car/" + registrationNo,
        method: "GET",
        success: function (res) {
            let car = res.data;
            $('#carTable').empty();
            let row = `<tr><td>${car.registrationNO}</td><td>${car.brand}</td><td>${car.type}</td><td>${car.noOfPassengers}</td><td>${car.transmissionType}</td><td>${car.fuelType}</td><td>${car.color}</td><td>${car.dailyRate}</td><td>${car.monthlyRate}</td><td>${car.freeKmForPrice}</td><td>${car.freeKmForDuration}</td><td>${car.lossDamageWaiver}</td><td>${car.priceForExtraKm}</td><td>${car.completeKm}</td><td>${car.status}</td></tr>`
            $('#carTable').append(row);
        },
        error: function (ob) {
            loadAllCars();
            swal({
                title: "Error",
                text: "Car Not Found",
                icon: "error",
                button: "Close",
                timer: 2000
            });
        }
    })
}


// ----------------------------------------------------------------------------------------------
// CUSTOMER Section

// load pending customers into table
function loadPendingCustomers() {
    $('#tblPendingCustomers').empty();
    $.ajax({
        url: baseUrl + "api/v1/customer/pending",
        method: "GET",
        success: function (res) {
            for (const customer of res.data) {
                let row = `<tr><td>${customer.customerId}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contactNo}</td><td>${customer.email}</td><td>${customer.nicNo}</td><td>${customer.licenceNo}</td><td>${customer.status}</td></tr>`;
                $('#tblPendingCustomers').append(row);
            }
            bindPendingCustomerTblClickEvents();
        }
    });
}

// bind table data into fields when click
function bindPendingCustomerTblClickEvents() {
    $('#tblPendingCustomers>tr').click(function () {
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let contact = $(this).children().eq(3).text();
        let email = $(this).children().eq(4).text();
        let nic = $(this).children().eq(5).text();
        let licence = $(this).children().eq(6).text();

        $('#txtCustomerId').val(id);
        $('#txtCustomerName').val(name);
        $('#txtCustomerAddress').val(address);
        $('#txtCustomerContactNo').val(contact);
        $('#txtCustomerEmail').val(email);
        $('#txtCustomerNICNo').val(nic);
        $('#txtCustomerLicenceNo').val(licence);

        searchAndLoadCustomerImgs(id);

    });
}

// customer nic & license img load into customer data fields
function searchAndLoadCustomerImgs(id) {
    $('#divNICFrontView').empty();
    $('#divNICBackView').empty();
    $('#divLicenceImg').empty();

    $.ajax({
        url: baseUrl + "api/v1/customer/" + id,
        method: "GET",
        success: function (res) {
            let customer = res.data;

            let nicFrontPath = customer.nicFrontImg;
            let nicFrontImg = nicFrontPath.split("/Users/kasunweerasinghe/Desktop/IJSE/AAD/CW/Easy_Car_Rental/Front_End/assets/savedImages//Customers//")[1];
            let nicFrontImgSrc = "assets/savedImages//Customers//" + nicFrontImg;
            console.log(nicFrontImgSrc);

            let nicBackPath = customer.nicBackImg;
            let nicBackImg = nicBackPath.split("/Users/kasunweerasinghe/Desktop/IJSE/AAD/CW/Easy_Car_Rental/Front_End/assets/savedImages//Customers//")[1];
            let nicBackImgSrc = "assets/savedImages//Customers//" + nicBackImg;

            let licencePath = customer.licenceImg;
            let licenceImg = licencePath.split("/Users/kasunweerasinghe/Desktop/IJSE/AAD/CW/Easy_Car_Rental/Front_End/assets/savedImages//Customers//")[1];
            let licenceImgSrc = "assets/savedImages//Customers//" + licenceImg;


            let nicfImg = `<img src=${nicFrontImgSrc} alt="NIC Front" style="background-size: cover;width: 100%;height: 100%">`;
            $('#divNICFrontView').append(nicfImg);

            let nicbImg = `<img src=${nicBackImgSrc} alt="NIC Back" style="background-size: cover;width: 100%;height: 100%">`;
            $('#divNICBackView').append(nicbImg);

            let licImg = `<img src=${licenceImgSrc} alt="Licence" style="background-size: cover;width: 100%;height: 100%">`;
            $('#divLicenceImg').append(licImg);
        }
    })
}


// btn accept customer
$('#btnAcceptCustomer').click(function () {
    if ($('#txtCustomerId').val() != "") {
        let id = $('#txtCustomerId').val();
        acceptCustomer(id);
        clearCustomerFields();
    } else {
        swal({
            title: "Error",
            text: "Customer Not Selected",
            icon: "error",
            button: "Close",
            timer: 2000
        });
    }
});


// btn accept customer
function acceptCustomer(id) {
    $.ajax({
        url: baseUrl + "api/v1/customer/updateStatus/" + id,
        method: "PUT",
        success: function (res) {
            console.log(res.message);
            loadPendingCustomers();
            getRegisterCustomersCount();
            loadRegisteredCustomers();
            swal({
                title: "Confirmation!",
                text: "Customer Accepted",
                icon: "success",
                button: "Close",
                timer: 2000
            });
        }
    })
}


// clear customer fields function
function clearCustomerFields() {
    $('#txtCustomerId').val("");
    $('#txtCustomerName').val("");
    $('#txtCustomerAddress').val("");
    $('#txtCustomerContactNo').val("");
    $('#txtCustomerEmail').val("");
    $('#txtCustomerNICNo').val("");
    $('#txtCustomerLicenceNo').val("");
    $('#divNICFrontView').empty();
    $('#divNICBackView').empty();
    $('#divLicenceImg').empty();
}


// btn clear customer fields
$('#btnClearFields').click(function () {
    clearCustomerFields();
    loadPendingCustomers();
    loadRegisteredCustomers();
});


// btn reject customer
$('#btnRejectCustomer').click(function () {
    if ($('#txtCustomerId').val() != "") {
        let customerId = $('#txtCustomerId').val();
        rejectPendingCustomer(customerId);
    } else {
        swal({
            title: "Error",
            text: "Customer Not Selected",
            icon: "error",
            button: "Close",
            timer: 2000
        });
    }
});


// reject customer function
function rejectPendingCustomer(id) {
    $.ajax({
        url: baseUrl + "api/v1/customer?id=" + id,
        method: "DELETE",
        success: function (res) {
            loadPendingCustomers();
            clearCustomerFields();
            swal({
                title: "Confirmation!",
                text: "Customer rejected",
                icon: "success",
                button: "Close",
                timer: 2000
            });
        }
    })
}


// function for load registered customers into registered table
function loadRegisteredCustomers() {
    $('#tblRegisteredCustomers').empty();
    $.ajax({
        url: baseUrl + "api/v1/customer/accepted",
        method: "GET",
        success: function (res) {
            for (const customer of res.data) {
                console.log(customer.status);
                let row = `<tr><td>${customer.customerId}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contactNo}</td><td>${customer.email}</td><td>${customer.nicNo}</td><td>${customer.licenceNo}</td><td>${customer.status}</td></tr>`;
                $('#tblRegisteredCustomers').append(row);
            }
        }
    })
}


// txt search customer
$('#searchCustomer').on('keyup', function (event) {
    checkSearchCustomers();
    if (event.key === "Enter") {
        searchCustomer();
    }
})


// check customer search validation
function checkSearchCustomers() {
    var customerId = $('#searchCustomer').val();
    if (regCustomerId.test(customerId)) {
        $("#searchCustomer").css('border', '3px solid green');
        return true;
    } else {
        $("#searchCustomer").css('border', '3px solid red');
        return false;
    }
}


// customer search function
function searchCustomer() {
    $('#tblRegisteredCustomers').empty();
    let id = $('#searchCustomer').val();
    $.ajax({
        url: baseUrl + "api/v1/customer/register/" + id,
        method: "GET",
        success: function (res) {
            console.log(res.data);
            for (const customer of res.data) {
                let row = `<tr><td>${customer.customerId}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contactNo}</td><td>${customer.email}</td><td>${customer.nicNo}</td><td>${customer.licenceNo}</td><td>${customer.status}</td></tr>`;
                $('#tblRegisteredCustomers').append(row);
            }
        },
        error: function (ob) {
            loadRegisteredCustomers();
            swal({
                title: "Error",
                text: "Customer Not Found",
                icon: "error",
                button: "Close",
                timer: 2000
            });
        }
    })
}


// ----------------------------------------------------------------------------------------------
// DRIVER Section

// license txt field
$('#txtLicenceNo').on('keyup', function (event) {
    checkLicenceNumber();
    if (regLicenceNo.test($('#txtLicenceNo').val())) {
        if (event.key === "Enter") {
            $("#txtDriverName").focus();
        }
    }
});


// check license no validation function
function checkLicenceNumber() {
    var licenceNo = $('#txtLicenceNo').val();
    if (regLicenceNo.test(licenceNo)) {
        $("#txtLicenceNo").css('border', '2px solid green');
        return true;
    } else {
        $("#txtLicenceNo").css('border', '2px solid red');
        return false;
    }
}


// driver name txt field
$('#txtDriverName').on('keyup', function (event) {
    checkDriverName();
    if (regName.test($('#txtDriverName').val())) {
        if (event.key === "Enter") {
            $("#txtDriverAddress").focus();
        }
    }
});


// check driver name validation function
function checkDriverName() {
    var name = $('#txtDriverName').val();
    if (regName.test(name)) {
        $("#txtDriverName").css('border', '2px solid green');
        return true;
    } else {
        $("#txtDriverName").css('border', '2px solid red');
        return false;
    }
}


// driver address txt field
$('#txtDriverAddress').on('keyup', function (event) {
    checkDriverAddress();
    if (regAddress.test($('#txtDriverAddress').val())) {
        if (event.key === "Enter") {
            $("#txtDriverContactNo").focus();
        }
    }
});


// check driver address validation function
function checkDriverAddress() {
    var address = $('#txtDriverAddress').val();
    if (regAddress.test(address)) {
        $("#txtDriverAddress").css('border', '2px solid green');
        return true;
    } else {
        $("#txtDriverAddress").css('border', '2px solid red');
        return false;
    }
}


// driver contact txt field
$('#txtDriverContactNo').on('keyup', function (event) {
    checkDriverContact();
    if (regAddress.test($('#txtDriverContactNo').val())) {
        if (event.key === "Enter") {
            $("#txtDriverNICNo").focus();
        }
    }
});


// check driver contact validation function
function checkDriverContact() {
    var contact = $('#txtDriverContactNo').val();
    if (regContactNo.test(contact)) {
        $("#txtDriverContactNo").css('border', '2px solid green');
        return true;
    } else {
        $("#txtDriverContactNo").css('border', '2px solid red');
        return false;
    }
}


// driver nic txt field
$('#txtDriverNICNo').on('keyup', function (event) {
    checkDriverNIC();
    if (regNicNo.test($('#txtDriverNICNo').val())) {
        if (event.key === "Enter") {
            $("#txtDriverUserName").focus();
        }
    }
});


// check driver nic validation function
function checkDriverNIC() {
    var nic = $('#txtDriverNICNo').val();
    if (regNicNo.test(nic)) {
        $("#txtDriverNICNo").css('border', '2px solid green');
        return true;
    } else {
        $("#txtDriverNICNo").css('border', '2px solid red');
        return false;
    }
}


// driver username txt field
$('#txtDriverUserName').on('keyup', function (event) {
    checkDriverUsername();
    if (regLoginUsername.test($('#txtDriverUserName').val())) {
        if (event.key === "Enter") {
            $("#txtDriverPassword").focus();
        }
    }
});


// check driver username validation function
function checkDriverUsername() {
    var username = $('#txtDriverUserName').val();
    if (regLoginUsername.test(username)) {
        $("#txtDriverUserName").css('border', '2px solid green');
        return true;
    } else {
        $("#txtDriverUserName").css('border', '2px solid red');
        return false;
    }
}


// driver password txt field
$('#txtDriverPassword').on('keyup', function (event) {
    checkDriverPassword();
});


// clear data txt fields
function clearDriverFields() {
    $('#txtLicenceNo').val("");
    $('#txtDriverName').val("");
    $('#txtDriverAddress').val("");
    $('#txtDriverContactNo').val("");
    $('#txtDriverNICNo').val("");
    $('#txtDriverUserName').val("");
    $('#txtDriverPassword').val("");
    $('#searchDriver').val("");

    $('#txtLicenceNo').css('border', '1px solid #ced4da');
    $('#txtDriverName').css('border', '1px solid #ced4da');
    $('#txtDriverAddress').css('border', '1px solid #ced4da');
    $('#txtDriverContactNo').css('border', '1px solid #ced4da');
    $('#txtDriverNICNo').css('border', '1px solid #ced4da');
    $('#txtDriverUserName').css('border', '1px solid #ced4da');
    $('#txtDriverPassword').css('border', '1px solid #ced4da');
    $('#searchDriver').css('border', '1px solid #ced4da');

    $('#btnUpdateDriver').prop('disabled', true);
    $('#btnDeleteDriver').prop('disabled', true);
    $('#btnSaveDriver').prop('disabled', false);

    loadAvailableDrivers();
    loadNonAvailableDrivers();
    loadAllDrivers();
}


// check driver password validation function
function checkDriverPassword() {
    var password = $('#txtDriverPassword').val();
    if (regLoginPassword.test(password)) {
        $("#txtDriverPassword").css('border', '2px solid green');
        return true;
    } else {
        $("#txtDriverPassword").css('border', '2px solid red');
        return false;
    }
}


// save driver function
function saveDriver() {
    var licenceNo = $('#txtLicenceNo').val();
    var name = $('#txtDriverName').val();
    var address = $('#txtDriverAddress').val();
    var contact = $('#txtDriverContactNo').val();
    var nic = $('#txtDriverNICNo').val();
    var username = $('#txtDriverUserName').val();
    var password = $('#txtDriverPassword').val();
    var availability = true;

    var driver = {
        licenceNo: licenceNo,
        name: name,
        address: address,
        contactNo: contact,
        nicNo: nic,
        username: username,
        password: password,
        availability: availability
    }

    $.ajax({
        url: baseUrl + "api/v1/driver",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(driver),
        success: function (res) {
            getAvailableDriverCount();
            loadAvailableDrivers();
            loadAllDrivers();
            swal({
                title: "Confirmation!",
                text: "Driver Saved Successfully",
                icon: "success",
                button: "Close",
                timer: 2000
            });
        },
        error: function (ob) {
            swal({
                title: "Error!",
                text: "Driver Not Saved Successfully",
                icon: "error",
                button: "Close",
                timer: 2000
            });
        }
    });
}

// btn save driver
$('#btnSaveDriver').click(function (res) {
    if ($('#txtLicenceNo').val() != "") {
        if ($('#txtDriverName').val() != "") {
            if ($('#txtDriverAddress').val() != "") {
                if ($('#txtDriverContactNo').val() != "") {
                    if ($('#txtDriverNICNo').val() != "") {
                        if ($('#txtDriverUserName').val() != "") {
                            if ($('#txtDriverPassword').val() != "") {
                                let res = confirm("Do you want to save this driver?");
                                if (res) {
                                    saveDriver();
                                    clearDriverFields();
                                }
                            } else {
                                alert("Please enter password");
                            }
                        } else {
                            alert("Please enter username");
                        }
                    } else {
                        alert("Please enter your NIC No");
                    }
                } else {
                    alert("Please enter your contact no");
                }
            } else {
                alert("Please enter your address");
            }
        } else {
            alert("Please enter your name");
        }
    } else {
        alert("Please enter licence No");
    }
});


// load available drivers
function loadAvailableDrivers() {
    $('#tblAvailableDrivers').empty();
    $.ajax({
        url: baseUrl + "api/v1/driver/getAllAvailableDrivers",
        method: "GET",
        success: function (res) {
            for (const driver of res.data) {
                let row = `<tr><td>${driver.licenceNo}</td><td>${driver.name}</td><td>${driver.address}</td><td>${driver.contactNo}</td><td>${driver.nicNo}</td><td>${driver.availability}</td></tr>`;
                $('#tblAvailableDrivers').append(row);
            }
        }
    })
}


// load non available drivers
function loadNonAvailableDrivers() {
    $('#tblNonAvailableDrivers').empty();
    $.ajax({
        url: baseUrl + "api/v1/driver/getAllNonAvailableDrivers",
        method: "GET",
        success: function (res) {
            for (const driver of res.data) {
                let row = `<tr><td>${driver.licenceNo}</td><td>${driver.name}</td><td>${driver.address}</td><td>${driver.contactNo}</td><td>${driver.nicNo}</td><td>${driver.availability}</td></tr>`;
                $('#tblNonAvailableDrivers').append(row);
            }
        }
    })
}


// load all drivers
function loadAllDrivers() {
    $('#tblRegisteredDrivers').empty();
    $.ajax({
        url: baseUrl + "api/v1/driver",
        method: "GET",
        success: function (res) {
            for (const driver of res.data) {
                let row = `<tr><td>${driver.licenceNo}</td><td>${driver.name}</td><td>${driver.address}</td><td>${driver.contactNo}</td><td>${driver.nicNo}</td><td>${driver.availability}</td></tr>`;
                $('#tblRegisteredDrivers').append(row);
            }
            bindRegisterDriversClickEvents();
        }
    })
}

// bind event
function bindRegisterDriversClickEvents() {
    $('#tblRegisteredDrivers>tr').click(function () {
        let licenceNo = $(this).children().eq(0).text();
        findDriver(licenceNo);
        $('#btnUpdateDriver').prop('disabled', false);
        $('#btnDeleteDriver').prop('disabled', false);
        $('#btnSaveDriver').prop('disabled', true);
    })
}

// find driver function
function findDriver(licenceNo) {
    $.ajax({
        url: baseUrl + "api/v1/driver/" + licenceNo,
        method: "GET",
        success: function (res) {
            let driver = res.data;
            $('#txtLicenceNo').val(driver.licenceNo);
            $('#txtDriverName').val(driver.name);
            $('#txtDriverAddress').val(driver.address);
            $('#txtDriverContactNo').val(driver.contactNo);
            $('#txtDriverNICNo').val(driver.nicNo);
            $('#txtDriverUserName').val(driver.username);
            $('#txtDriverPassword').val(driver.password);
        }
    })
}

// btn clear driver
$('#btnClearDriver').click(function () {
    clearDriverFields();
})


// btn delete driver
$('#btnDeleteDriver').click(function () {
    if ($('#txtLicenceNo').val() != "") {
        let res = "Do you want to delete this driver?";
        if (res) {
            deleteDriver();
            clearDriverFields();
        }
    }
})


// delete driver function
function deleteDriver() {
    let licenceNo = $('#txtLicenceNo').val();
    $.ajax({
        url: baseUrl + "api/v1/driver?licenceNo=" + licenceNo,
        method: "DELETE",
        success: function (res) {
            loadAvailableDrivers();
            loadNonAvailableDrivers();
            loadAllDrivers();
            swal({
                title: "Confirmation!",
                text: "Driver Deleted Successfully",
                icon: "success",
                button: "Close",
                timer: 2000
            });
        },
        error: function (ob) {
            swal({
                title: "Error!",
                text: "Driver Not Deleted Successfully",
                icon: "error",
                button: "Close",
                timer: 2000
            });
        }
    })
}


// btn update driver
$('#btnUpdateDriver').click(function () {
    if ($('#txtLicenceNo').val() != "") {
        if ($('#txtDriverName').val() != "") {
            if ($('#txtDriverAddress').val() != "") {
                if ($('#txtDriverContactNo').val() != "") {
                    if ($('#txtDriverNICNo').val() != "") {
                        if ($('#txtDriverUserName').val() != "") {
                            if ($('#txtDriverPassword').val() != "") {
                                let res = confirm("Do you want to update this driver?");
                                if (res) {
                                    updateDriver();
                                    clearDriverFields();
                                }
                            } else {
                                alert("Please enter password");
                            }
                        } else {
                            alert("Please enter username");
                        }
                    } else {
                        alert("Please enter your NIC No");
                    }
                } else {
                    alert("Please enter your contact no");
                }
            } else {
                alert("Please enter your address");
            }
        } else {
            alert("Please enter your name");
        }
    } else {
        alert("Please enter licence No");
    }
})


// driver update function
function updateDriver() {
    var licenceNo = $('#txtLicenceNo').val();
    var name = $('#txtDriverName').val();
    var address = $('#txtDriverAddress').val();
    var contact = $('#txtDriverContactNo').val();
    var nic = $('#txtDriverNICNo').val();
    var username = $('#txtDriverUserName').val();
    var password = $('#txtDriverPassword').val();

    var driver = {
        licenceNo: licenceNo,
        name: name,
        address: address,
        contactNo: contact,
        nicNo: nic,
        username: username,
        password: password
    }

    $.ajax({
        url: baseUrl + "api/v1/driver",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(driver),
        success: function (res) {
            loadAllDrivers();
            loadAvailableDrivers();
            loadNonAvailableDrivers();
            swal({
                title: "Confirmation!",
                text: "Driver Updated Successfully",
                icon: "success",
                button: "Close",
                timer: 2000
            });
        },
        error: function (ob) {
            swal({
                title: "Error!",
                text: "Driver Not Updated Successfully",
                icon: "error",
                button: "Close",
                timer: 2000
            });
        }
    })
}


// driver search field
$('#searchDriver').on('keyup', function (event) {
    checkSearchDriver();
    if (event.key === "Enter") {
        searchDriverDetails();
    }
})

// check driver validation
function checkSearchDriver() {
    var search = $('#searchDriver').val();
    if (regLicenceNo.test(search)) {
        $("#searchDriver").css('border', '2px solid green');
        return true;
    } else {
        $("#searchDriver").css('border', '2px solid red');
        return false;
    }
}

// search driver function
function searchDriverDetails() {
    let licenceNo = $('#searchDriver').val();
    $.ajax({
        url: baseUrl + "api/v1/driver/" + licenceNo,
        method: "GET",
        success: function (res) {
            let driver = res.data;
            $('#tblRegisteredDrivers').empty();
            let row = `<tr><td>${driver.licenceNo}</td><td>${driver.name}</td><td>${driver.address}</td><td>${driver.contactNo}</td><td>${driver.nicNo}</td><td>${driver.availability}</td></tr>`;
            $('#tblRegisteredDrivers').append(row);
        },
        error: function (ob) {
            loadAllDrivers();
            swal({
                title: "Error!",
                text: "Driver Not Found",
                icon: "error",
                button: "Close",
                timer: 2000
            });
        }
    })
}


// btn search
$('#btnSearchDriver').click(function () {
    if ($('#searchDriver').val() != "") {
        searchDriverDetails();
    }
})



// ----------------------------------------------------------------------------------------------
// RENTAL Section
// load all rentals
function loadAllRentals() {
    $('#tblCarRentals').empty();
    $.ajax({
        url: baseUrl + "api/v1/CarRent",
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
                $('#tblCarRentals').append(row);
            }
        }
    })
}


// load all accept rentals
function loadAllAcceptedRentals() {
    let status = "Accepted";
    $('#tableCarRental').empty();
    $.ajax({
        url: baseUrl + "api/v1/CarRent/get/" + status,
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
                $('#tableCarRental').append(row);
            }
        }
    })
}



// ----------------------------------------------------------------------------------------------
// PAYMENT Section
// load all payments
function loadAllPayments() {
    $('#tblPayments').empty();
    $.ajax({
        url: baseUrl + "api/v1/payment",
        method: "GET",
        success: function (res) {
            for (const payment of res.data) {
                let row = `<tr><td>${payment.paymentId}</td><td>${payment.date}</td><td>${payment.amount}</td><td>${payment.rental.rentId}</td><td>${payment.customer.customerId}</td></tr>`;
                $('#tblPayments').append(row);
            }
        }
    })
}

// search btn
$('#btnSearchPayment').click(function () {
    if ($('#pickFromDate').val() != "") {
        if ($('#pickToDate').val() != "") {
            searchPaymentByDate();
        } else {
            alert("Please select to date");
        }
    } else {
        alert("Please select from date");
    }
})


// search payment function
function searchPaymentByDate() {
    let fromDate = $('#pickFromDate').val();
    let toDate = $('#pickToDate').val();

    $('#tblPayments').empty();
    $.ajax({
        url: baseUrl + "api/v1/payment/" + fromDate + "/" + toDate,
        method: "GET",
        success: function (res) {
            for (const payment of res.data) {
                let row = `<tr><td>${payment.paymentId}</td><td>${payment.date}</td><td>${payment.amount}</td><td>${payment.rental.rentId}</td><td>${payment.customer.customerId}</td></tr>`;
                $('#tblPayments').append(row);
            }

            if (res.data.length === 0) {
                clearPaymentDateFields();
                swal({
                    title: "Error!",
                    text: "Payments Not Found",
                    icon: "error",
                    button: "Close",
                    timer: 2000
                });
            }
        },
        error: function (ob) {
            clearPaymentDateFields();
            swal({
                title: "Error!",
                text: "Payments Not Found",
                icon: "error",
                button: "Close",
                timer: 2000
            });
        }
    })
}


// btn clear
$('#btnClearDates').click(function () {
    clearPaymentDateFields();
})

// clear function
function clearPaymentDateFields() {
    $('#pickFromDate').val("");
    $('#pickToDate').val("");
    loadAllPayments();
}



// ----------------------------------------------------------------------------------------------
// REQUEST Section
// load all pending rental
function loadPendingRentals() {
    let status = "Pending";

    $('#tblCarRentalRequests').empty();
    $.ajax({
        url: baseUrl + "api/v1/CarRent/get/" + status,
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
                $('#tblCarRentalRequests').append(row);
            }
            bindCarRentalRequestTableClickEvents();
        }
    })
}


// table data bind
function bindCarRentalRequestTableClickEvents() {
    $('#tblCarRentalRequests>tr').click(function () {
        let rentId = $(this).children().eq(0).text();
        let date = $(this).children().eq(1).text();
        let pickupDate = $(this).children().eq(2).text();
        let returnDate = $(this).children().eq(3).text();
        let regNo = $(this).children().eq(4).text();
        let custId = $(this).children().eq(5).text();
        let licenceNo = $(this).children().eq(6).text();
        let status = $(this).children().eq(7).text();

        $('#txtRentId').val(rentId);
        $('#txtDate').val(date);
        $('#txtPickupDate').val(pickupDate);
        $('#txtReturnDate').val(returnDate);
        $('#txtCarRegistrationNo').val(regNo);
        $('#txtCusId').val(custId);
        $('#txtDLicenceNo').val(licenceNo);
        $('#txtRentalStatus').val(status);
    })
}









