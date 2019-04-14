$(document).ready(function() {
    $(".table-striped tbody").empty();

    $.ajax({
    		url: "/api/get-all-tickets",
    		type: "GET",
    		dataType: "json",
    		success: function(data){
    			console.log(data);
    			$.each(data, function(index, item){
    				var date = new Date(item.submit_time);
    				$("<tr>").append(
    				$("<td align = \"center\" data-label = \"Ticket ID\">").text(item.id),
    				$("<td align = \"center\" data-label = \"Name\">").text(item.name),
    				$("<td align = \"center\" data-label = \"Project Description\">").text(item.message),
    				$("<td align = \"center\" data-label = \"Location\">").text(item.location),
    				$("<td align = \"center\" data-label = \"Tags\">").text(item.tags),
    				$("<td align = \"center\" data-label = \"Time Submitted\">").text(`${date.toLocaleTimeString('en-US', {hour:'numeric', minute:'numeric', hour12:true})}`),
    				$("<td align = \"center\" data-label = \"Status\">").text(item.status)
    				).appendTo("#all-tickets tbody");
    			});
    		}
    	});

    $("#sign-in-mentor-form").submit(function(event) {
        $.ajax({
            url: "/api/checkin-mentor",
            type: "POST",
            dataType: "json",
            data: $("#sign-in-mentor-form").serialize(),
            success: function(result) {
                //console.log(result);
                if (result.success == true) {alert("Mentor signed in");}
                else {alert("Invalid email or Mentor already signed in");}
            },
            error: function(err) {
                //console.log(err);
            }
        });
        
        $("#sign-in-mentor-form").each(function() {
            this.reset();
        })

        /* USED TO UPDATE CURRENT MENTORS
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
        */
        event.preventDefault();
    });

    $("#sign-out-mentor-form").submit(function(event) {
        $.ajax({
            url: "/api/checkout-mentor",
            type: "POST",
            dataType: "json",
            data: $("#sign-out-mentor-form").serialize(),
            success: function(result) {
                //console.log(result);
                if (result.success == true) {alert("Mentor signed out");}
                else {alert("Invalid email or Mentor already signed out");}
            },
            error: function(err) {
                //console.log(err);
            }
        });
        
        $("#sign-out-mentor-form").each(function() {
            this.reset();
        })

        /* USED TO UPDATE CURRENT MENTORS
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
        */
        event.preventDefault();
    });
});