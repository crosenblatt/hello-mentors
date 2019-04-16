$(document).ready(function() {
    $("#new-pw-form").submit(function(event) {
        if($('#password').val() !== $('#confirm-password').val()) {
            alert("Passwords Do Not Match");
        } else {
            $.ajax({
                url: window.location.href.substring(window.location.href.indexOf("/change-password")),
                type: "POST",
                dataType: "json",
                data: { password: $("#password").val() },
                success: function(data, textStatus) {
                    console.log(data);
                    if(data.redirect) {
                        window.location.href = data.redirect;
                    } else {

                    }
                },

                complete: function(data, textStatus) {
                    console.log(data);
                    if(data.status == 200) {
                        window.location.search = "";
                        window.location.pathname = "/login";
                    } else {
                        window.location.pathname = "/invalid-token";
                    }
                }
            });
            //alert(window.location.href.substring(window.location.href.indexOf("/change-password")));
        }

        event.preventDefault();
    })
})