let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return "Hrs: " + date.getHours() + ", Mins: " + date.getMinutes() + ", Secs: " + date.getSeconds();
}

function makeAjaxCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        // console.log(methodType + " State changed called at: " + showTime() + ", Ready state : " + xhr.readyState + " Status : " + xhr.status);
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                callback(xhr.responseText);
            } else if (xhr.status >= 400) {
                console.log("Handle 400 client error or 500 server error at..." + showTime());
            }
        }
    }

    xhr.open(methodType, url, async);
    if (data) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
    console.log(methodType + " request sent to the server at : " + showTime());
}

//Get request
const getURL = "http://localhost:3000/employee_payroll/1";

function getUserDetails(data) {
    console.log("Data at : " + showTime() + " ----> " + data);
}

makeAjaxCall("GET", getURL, getUserDetails, true);
console.log("Made GET Ajax call to server at : " + showTime());

//Delete request
const deleteURL = "http://localhost:3000/employee_payroll/2";

function userDeleted(data) {
    console.log("User deleted : " + showTime() + " ----> " + data);
}

makeAjaxCall("DELETE", deleteURL, userDeleted, false);
console.log("Made DELETE Ajax call to server at : " + showTime());

//Post request
const postURL = "http://localhost:3000/employee_payroll";
const emplData = {
    "name": "Manu",
    "gender": "M",
    "startDate": {
        "year": 2017,
        "month": 04,
        "day": 9
    },
    "salary": "1234"
};

function userAdded(data) {
    console.log("User added at : " + showTime() + ", data : " + data);
}

// makeAjaxCall("POST", postURL, userAdded, true, emplData);
// console.log("Made POST Ajax call to server at : " + showTime());
