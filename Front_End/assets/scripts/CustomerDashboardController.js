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

function getLastLoginUser() {
    $.ajax({
        url: "http://localhost:8080/Back_End_war//api/v1/login/getLastLogin",
        method: "GET",
        success:function (res){
            let login = res.data;
            console.log(login);
            getAllUserData(login.username, login.password)
        }

    });

    function getAllUserData(){

    }
}