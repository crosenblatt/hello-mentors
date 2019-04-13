function claimTicket(ticket) {
	$.ajax({
		url: "/api/claim-ticket",
		type: "POST",
		data: { id : ticket },
		dataType: "json",
		success: function(data) {
			if(!data.claimed) {
				alert("Ticket Unavailable");
				$(".ticketTable tbody").empty();
				$.ajax({
					url: "/api/get-open-tickets",
					type: "GET",
					dataType: "json",
					success: function(data){
						console.log(data);
						$.each(data, function(index, item){
							var date = new Date(item.submit_time);
							$("<tr>").append(
							$("<td align = \"center\" data-label = \"Ticket ID\">").text(item.id),
							$("<td align = \"center\" data-label = \"Name\">").text(item.name),
							$("<td align = \"center\" data-label = \"Problem\">").text(item.message),
							$("<td align = \"center\" data-label = \"Location\">").text(item.location),
							$("<td align = \"center\" data-label = \"Tags\">").text(item.tags),
							$("<td align = \"center\" data-label = \"Time Submitted\">").text(`${date.toLocaleTimeString('en-US', {hour:'numeric', minute:'numeric', hour12:true})}`),
							$("<td align = \"center\" data-label = \"Status\">").html(`<input type=\"submit\" value=\"Claim\" id = \"claim\" class=\"btn float-center ticket_btn\" onclick = \"claimTicket(${item.id})\">`)
							).appendTo("#open-tickets tbody");
						});
					}
				});
			} else {
				$(".ticketTable tbody").empty();
				$.ajax({
					url: "/api/get-open-tickets",
					type: "GET",
					dataType: "json",
					success: function(data){
						console.log(data);
						$.each(data, function(index, item){
							var date = new Date(item.submit_time);
							$("<tr>").append(
							$("<td align = \"center\" data-label = \"Ticket ID\">").text(item.id),
							$("<td align = \"center\" data-label = \"Name\">").text(item.name),
							$("<td align = \"center\" data-label = \"Problem\">").text(item.message),
							$("<td align = \"center\" data-label = \"Location\">").text(item.location),
							$("<td align = \"center\" data-label = \"Tags\">").text(item.tags),
							$("<td align = \"center\" data-label = \"Time Submitted\">").text(`${date.toLocaleTimeString('en-US', {hour:'numeric', minute:'numeric', hour12:true})}`),
							$("<td align = \"center\" data-label = \"Status\">").html(`<input type=\"submit\" value=\"Claim\" id = \"claim\" class=\"btn float-center ticket_btn\" onclick = \"claimTicket(${item.id})\">`)
							).appendTo("#open-tickets tbody");
						});
					}
				});
			}
		}
	});
}

$(document).ready(function() {
    $(".ticketTable tbody").empty();

    $.ajax({
    		url: "/api/get-open-tickets",
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
    				$("<td align = \"center\" data-label = \"Status\">").html(`<input type=\"submit\" value=\"Claim\" id = \"claim\" class=\"btn float-center ticket_btn\" onclick = \"claimTicket(${item.id})\">`)
    				).appendTo("#open-tickets tbody");
    			});
    		}
    	});

    //$(".ticketTable tbody").append('<tr><td align = "center" data-label = "Name"> Chris </td> <td align = "center" data-label = "Problem Description"> Help </td><td align = "center" data-label = "Location"> Vikkybums Rooms </td> <td align = "center" data-label="Tags"> ANDROID </td> <td align = "center" data-label="status"> <a href = "" class = "claim"> Open </a></td></tr>');
});