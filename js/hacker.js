

function fetchData() {
    $.ajax({
        url: "/api/get-hacker-tickets",
        type: "GET",
        dataType: "json",
        success: function(data) {
            $("#hacker-tickets tbody").empty();
            $.each(data, function(index, item){
                var date = new Date(item.submit_time);
                var name;
                if(item.name == null) {
                    name = "N/A"
                } else {
                    name = item.name;
                }
                $("<tr>").append(
                $("<td align = \"center\" data-label = \"Problem\">").text(item.message),
                $("<td align = \"center\" data-label = \"Tags\">").text(item.tags),
                $("<td align = \"center\" data-label = \"Time Submitted\">").text(`${date.toLocaleTimeString('en-US', {hour:'numeric', minute:'numeric', hour12:true})}`),
                $("<td align = \"center\" data-label = \"Status\">").text(item.status),
                $("<td align = \"center\" data-label = \"Mentor\">").text(name)
                ).appendTo("#hacker-tickets tbody");
            });
        }
    })

    $.ajax({
        url: "/api/get-current-mentors",
        type: "GET",
        dataType: "json",
        success: function(data) {
            $("#current-mentors tbody").empty();
            $.each(data, function(index, item){
                var status;
                if (item.status == 1) {status = "BUSY";} 
                else {status = "AVAILABLE";}
                $("<tr>").append(
                $("<td align = \"center\" data-label = \"Name\">").text(item.name),
                $("<td align = \"center\" data-label = \"Skills\">").text(item.skills),
                $("<td align = \"center\" data-label = \"Status\">").text(status),
                ).appendTo("#current-mentors tbody");
            });
        }
    })
}

$(document).ready(function() {
    var refresh = setInterval(fetchData, 10000);

    $.ajax({
        url: "/api/get-hacker-tickets",
        type: "GET",
        dataType: "json",
        success: function(data) {
            $("#hacker-tickets tbody").empty();
            $.each(data, function(index, item){
                var date = new Date(item.submit_time);
                var name;
                if(item.name == null) {
                    name = "N/A"
                } else {
                    name = item.name;
                }
                $("<tr>").append(
                $("<td align = \"center\" data-label = \"Problem\">").text(item.message),
                $("<td align = \"center\" data-label = \"Tags\">").text(item.tags),
                $("<td align = \"center\" data-label = \"Time Submitted\">").text(`${date.toLocaleTimeString('en-US', {hour:'numeric', minute:'numeric', hour12:true})}`),
                $("<td align = \"center\" data-label = \"Status\">").text(item.status),
                $("<td align = \"center\" data-label = \"Mentor\">").text(name)
                ).appendTo("#hacker-tickets tbody");
            });
        }
    })

    $.ajax({
        url: "/api/get-current-mentors",
        type: "GET",
        dataType: "json",
        success: function(data) {
            $("#current-mentors tbody").empty();
            $.each(data, function(index, item){
                var status;
                if (item.status == 1) {
                    status = "BUSY";
                } else if(item.status == 0) {
                    status = "AVAILABLE";
                } 
                else {status = "OPEN";}
                $("<tr>").append(
                $("<td align = \"center\" data-label = \"Name\">").text(item.name),
                $("<td align = \"center\" data-label = \"Skills\">").text(item.skills),
                $("<td align = \"center\" data-label = \"Status\">").text(status),
                ).appendTo("#current-mentors tbody");
            });
        }
    })

    $("#submit-ticket-form").submit(function(event) {
        clearInterval(refresh);
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
        });

        $.ajax({
            url: "/api/get-hacker-tickets",
            type: "GET",
            dataType: "json",
            success: function(data) {
                $("#hacker-tickets tbody").empty();
                $.each(data, function(index, item){
                    var date = new Date(item.submit_time);
                    var name;
                    if(item.name == null) {
                        name = "N/A"
                    } else {
                        name = item.name;
                    }
                    $("<tr>").append(
                    $("<td align = \"center\" data-label = \"Problem\">").text(item.message),
                    $("<td align = \"center\" data-label = \"Tags\">").text(item.tags),
                    $("<td align = \"center\" data-label = \"Time Submitted\">").text(`${date.toLocaleTimeString('en-US', {hour:'numeric', minute:'numeric', hour12:true})}`),
                    $("<td align = \"center\" data-label = \"Status\">").text(item.status),
                    $("<td align = \"center\" data-label = \"Mentor\">").text(name)
                    ).appendTo("#hacker-tickets tbody");
                });
            }
        })
        event.preventDefault();
        refresh = setInterval(fetchData, 10000);
    });
})

