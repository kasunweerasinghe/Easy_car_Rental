getLastLogUser();

// function for get last log user
function getLastLogUser() {
    $.ajax({
        url: "http://localhost:8080/Back_End_war/api/v1/login/getLastLogin",
        method: "GET",
        success:function (res){
            let login = res.data;
            console.log(login);
            getAllDriverData(login.username,login.password);
        }
    });
}