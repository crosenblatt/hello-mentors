$(document).ready(function() {
    $("#email-form").submit(function(event) {
        $.ajax({
            url: "/api/request-password-reset",
            type: "POST",
            dataType: "json",
            data: { email: $("input[name=email]").val() }, 
            success: function() {
                //alert("Email Sent, Check Your Inbox");
            },
            error: function(err) {
                //alert(err);
            }
        });

        $("#email-form").each(function() {
            this.reset();
        });
        alert("Email Sent, Check Your Inbox");
        event.preventDefault();
    });
})