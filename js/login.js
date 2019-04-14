$(document).ready(function() {
    var check = location.search;
    if(check === "?err") {
        alert("Login Failed. Try Again.");
    }
})