$(document).ready(function() {
    $("#new-pw-form").submit(function(event) {
        var match = $('#password').val() == $('#confirm-password').val();
        if(!match) {
            alert("Passwords Do Not Match");
            event.preventDefault();
        }
    })
})