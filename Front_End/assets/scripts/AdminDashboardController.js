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








