$(function (){
    loadCarDetails();
});

let baseUrl = "http://localhost:8080/Back_End_war/";

function loadCarDetails(){
    $('#divGeneral').empty();
    $('#divPremium').empty();
    $('#divLuxury').empty();
    $.ajax({
        url:baseUrl + "api/v1/car",
        method:"GET",
        success:function (res){

        }
    });



}