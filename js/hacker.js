$(document).ready(function() {

    $("#hacker-tickets tbody").empty();
    $.ajax({
        url: "/api/get-hacker-tickets",
        type: "GET",
        dataType: "json",
        success: function(data) {
            $("#hacker-tickets tbody").empty();
            $.each(data, function(index, item){
                var date = new Date(item.submit_time);
                $("<tr>").append(
                $("<td align = \"center\" data-label = \"Problem\">").text(item.message),
                $("<td align = \"center\" data-label = \"Tags\">").text(item.tags),
                $("<td align = \"center\" data-label = \"Time Submitted\">").text(`${date.toLocaleTimeString('en-US', {hour:'numeric', minute:'numeric', hour12:true})}`),
                ).appendTo("#hacker-tickets tbody");
            });
        }
    })


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

        $.ajax({
            url: "/api/get-hacker-tickets",
            type: "GET",
            dataType: "json",
            success: function(data) {
                $("#hacker-tickets tbody").empty();
                $.each(data, function(index, item){
                    var date = new Date(item.submit_time);
                    $("<tr>").append(
                    $("<td align = \"center\" data-label = \"Problem\">").text(item.message),
                    $("<td align = \"center\" data-label = \"Tags\">").text(item.tags),
                    $("<td align = \"center\" data-label = \"Time Submitted\">").text(`${date.toLocaleTimeString('en-US', {hour:'numeric', minute:'numeric', hour12:true})}`),
                    ).appendTo("#hacker-tickets tbody");
                });
            }
        })
        event.preventDefault();
    });
})