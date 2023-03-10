getLastLogUser();

// function for get last log user
function getLastLogUser() {
    $.ajax({
        url: "http://localhost:8080/Back_End_war/api/v1/login/getLastLogin",
        method: "GET",
        success: function (res) {
            let login = res.data;
            console.log(login);
            getAllDriverData(login.username, login.password);
        }
    });
}


// function for get driver data
function getAllDriverData(username, password) {
    $.ajax({
        url: "http://localhost:8080/Back_End_war/api/v1/driver/set/" + username + "/" + password,
        method: "GET",
        success: function (res) {
            let driver = res.data;
            console.log(driver);
            loadDriverSchedule(driver.licenceNo);
        }
    })
}


// load data into driver table
function loadDriverSchedule(licenceNo){
    $('#bookingScheduleTable').empty();
    let status = "Accepted";
    $.ajax({
        url: "http://localhost:8080/Back_End_war/api/v1/CarRent/getCarRents/" + status + "/" + licenceNo,
        method:"GET",
        success:function (res) {
            for (let carRent of res.data) {
                let row = `<tr><td>${carRent.customer.customerId}</td><td>${carRent.customer.name}</td><td>${carRent.customer.contactNo}</td><td>${carRent.rentId}</td><td>${carRent.car.registrationNO}</td><td>${carRent.pickUpDate}</td><td>${carRent.returnDate}</td></tr>`;
                $('#bookingScheduleTable').append(row);
            }
        }
    })
}

