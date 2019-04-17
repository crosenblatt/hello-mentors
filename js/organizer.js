
function fetchData(){
    $.ajax({
            url: "/api/get-all-tickets",
            type: "GET",
            dataType: "json",
            success: function(data){
                //console.log(data);
                $("#all-tickets tbody").empty();
                $.each(data, function(index, item){
                    if(item.status === "Closed") {
                        return;
                    }
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

    $.ajax({
            url: "/api/get-current-mentors",
            type: "GET",
            dataType: "json",
            success: function(data) {
                //console.log(data);
                $("#current-mentors tbody").empty();
                $.each(data, function(index, item){
                    var date = new Date(item.start_time);
                    var status;
                    if (item.status == 1) {status = "BUSY";} 
                    else {status = "AVAILABLE";}
                    $("<tr>").append(
                    $("<td align = \"center\" data-label = \"Name\">").text(item.name),
                    $("<td align = \"center\" data-label = \"Email\">").text(item.email),
                    $("<td align = \"center\" data-label = \"Skills\">").text(item.skills),
                    $("<td align = \"center\" data-label = \"Status\">").text(status),
                    $("<td align = \"center\" data-label = \"Start Time\">").text(`${date.toLocaleTimeString('en-US', {hour:'numeric', minute:'numeric', hour12:true})}`),
                    $("<td align = \"center\" data-label = \"Elapsed Time\">").text(item.elapsed_time)
                    ).appendTo("#current-mentors tbody");
                });
            }
        });
}

$(document).ready(function() {
    var refresh = setInterval(fetchData, 10000);

    $.ajax({
    		url: "/api/get-all-tickets",
    		type: "GET",
    		dataType: "json",
    		success: function(data){
    			//console.log(data);
                $("#all-tickets tbody").empty();
    			$.each(data, function(index, item){
                    if(item.status === "Closed") {
                        return;
                    }
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

        $.ajax({
            url: "/api/get-current-mentors",
            type: "GET",
            dataType: "json",
            success: function(data) {
                //console.log(data);
                $("#current-mentors tbody").empty();
                $.each(data, function(index, item){
                    var date = new Date(item.start_time);
                    var status;
                    if (item.status == 1) {status = "BUSY";} 
                    else {status = "AVAILABLE";}
                    $("<tr>").append(
                    $("<td align = \"center\" data-label = \"Name\">").text(item.name),
                    $("<td align = \"center\" data-label = \"Email\">").text(item.email),
                    $("<td align = \"center\" data-label = \"Skills\">").text(item.skills),
                    $("<td align = \"center\" data-label = \"Status\">").text(status),
                    $("<td align = \"center\" data-label = \"Start Time\">").text(`${date.toLocaleTimeString('en-US', {hour:'numeric', minute:'numeric', hour12:true})}`),
                    $("<td align = \"center\" data-label = \"Elapsed Time\">").text(item.elapsed_time)
                    ).appendTo("#current-mentors tbody");
                });
            }
        });

    $("#sign-in-mentor-form").submit(function(event) {
        clearInterval(refresh);
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

        $.ajax({
            url: "/api/get-current-mentors",
            type: "GET",
            dataType: "json",
            success: function(data) {
                $("#current-mentors tbody").empty();
                $.each(data, function(index, item){
                    var date = new Date(item.start_time);
                    var status;
                    if (item.status == 1) {status = "BUSY";} 
                    else {status = "AVAILABLE";}
                    $("<tr>").append(
                    $("<td align = \"center\" data-label = \"Name\">").text(item.name),
                    $("<td align = \"center\" data-label = \"Email\">").text(item.email),
                    $("<td align = \"center\" data-label = \"Skills\">").text(item.skills),
                    $("<td align = \"center\" data-label = \"Status\">").text(status),
                    $("<td align = \"center\" data-label = \"Start Time\">").text(`${date.toLocaleTimeString('en-US', {hour:'numeric', minute:'numeric', hour12:true})}`),
                    $("<td align = \"center\" data-label = \"Elapsed Time\">").text(item.elapsed_time)
                    ).appendTo("#current-mentors tbody");
                });
            }
        })
        
        event.preventDefault();
        refresh = setInterval(fetchData, 10000);
    });

    $("#sign-out-mentor-form").submit(function(event) {
        clearInterval(refresh);
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

        
        $.ajax({
            url: "/api/get-current-mentors",
            type: "GET",
            dataType: "json",
            success: function(data) {
                $("#current-mentors tbody").empty();
                $.each(data, function(index, item){
                    var date = new Date(item.start_time);
                    var status;
                    if (item.status == 1) {status = "BUSY";} 
                    else {status = "AVAILABLE";}
                    $("<tr>").append(
                    $("<td align = \"center\" data-label = \"Name\">").text(item.name),
                    $("<td align = \"center\" data-label = \"Email\">").text(item.email),
                    $("<td align = \"center\" data-label = \"Skills\">").text(item.skills),
                    $("<td align = \"center\" data-label = \"Status\">").text(status),
                    $("<td align = \"center\" data-label = \"Start Time\">").text(`${date.toLocaleTimeString('en-US', {hour:'numeric', minute:'numeric', hour12:true})}`),
                    $("<td align = \"center\" data-label = \"Elapsed Time\">").text(item.elapsed_time)
                    ).appendTo("#current-mentors tbody");
                });
            }
        })
        
        event.preventDefault();
        refresh = setInterval(fetchData, 10000);
    });
});