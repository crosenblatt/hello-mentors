$(document).ready(function() {
    $("#submit-ticket-form").submit(function(event) {
        $.ajax({
            url: "/api/submit-ticket",
            type: "POST",
            dataType: "json",
            data: $("#submit-ticket-form").serialize(),
            success: function(result) {
                
            },
            error: function(err) {
                
            }
        });
        
        $("#submit-ticket-form").each(function() {
            this.reset();
        })
        event.preventDefault();
    });
})