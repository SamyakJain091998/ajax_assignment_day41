let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return "Hrs: " + date.getHours() + ", Mins: " + date.getMinutes() + ", Secs: " + date.getSeconds();
}

function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            // console.log(methodType + " State changed called at: " + showTime() + ", Ready state : " + xhr.readyState + " Status : " + xhr.status);
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
                } else if (xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("xhr failed!!!");
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
    });
}

//Get request
const getURL = "http://localhost:3000/employee_payroll/1";

makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get User data : " + responseText);
    })
    .catch(error => console.log("GET Error status : " + JSON.stringify(error)));

console.log("Made GET Ajax call to server at : " + showTime());

//Delete request
const deleteURL = "http://localhost:3000/employee_payroll/383";

function userDeleted(data) {
    console.log("User deleted : " + showTime() + " ----> " + data);
}

makePromiseCall("DELETE", deleteURL, userDeleted, false);
console.log("Made DELETE Ajax call to server at : " + showTime());

// //Post request
// const postURL = "http://localhost:3000/employee_payroll";
// const emplData = {
//     "name": "Manu",
//     "gender": "M",
//     "startDate": {
//         "year": 2017,
//         "month": 04,
//         "day": 9
//     },
//     "salary": "1234"
// };

// function userAdded(data) {
//     console.log("User added at : " + showTime() + ", data : " + data);
// }

// // makeAjaxCall("POST", postURL, userAdded, true, emplData);
// // console.log("Made POST Ajax call to server at : " + showTime());
