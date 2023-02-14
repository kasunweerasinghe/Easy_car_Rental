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


});

let today = new Date().toISOString().slice(0, 10);
let baseUrl = "http://localhost:8080/Back_End_war/";

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

$('#clearCar').click(function () {
    clearAddCarFields();
    loadAllCars();
});

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

function bindCarTableClickEvents(){
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