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

    //$(".ticketTable tbody").append('<tr><td align = "center" data-label = "Name"> Chris </td> <td align = "center" data-label = "Problem Description"> Help </td><td align = "center" data-label = "Location"> Vikkybums Rooms </td> <td align = "center" data-label="Tags"> ANDROID </td> <td align = "center" data-label="status"> <a href = "" class = "claim"> Open </a></td></tr>');
});