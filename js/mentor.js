
var refresh;

function fetchData() {
	$.ajax({
		url: "/api/get-open-tickets",
		type: "GET",
		dataType: "json",
		success: function(data){
			//console.log(data);
			$("#open-tickets tbody").empty();
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

	$.ajax({
		url: "/api/get-mentor-tickets",				
		type: "GET",
		dataType: "json",
		success: function(data) {
			$("#mentor-tickets tbody").empty();
			$.each(data, function(index, item){
				var date = new Date(item.submit_time);
				$("<tr>").append(
				$("<td align = \"center\" data-label = \"Ticket ID\">").text(item.id),
				$("<td align = \"center\" data-label = \"Name\">").text(item.name),
				$("<td align = \"center\" data-label = \"Problem\">").text(item.message),
				$("<td align = \"center\" data-label = \"Location\">").text(item.location),
				$("<td align = \"center\" data-label = \"Tags\">").text(item.tags),
				$("<td align = \"center\" data-label = \"Time Submitted\">").text(`${date.toLocaleTimeString('en-US', {hour:'numeric', minute:'numeric', hour12:true})}`),
				$("<td align = \"center\" data-label = \"Release\">").html(`<input type=\"submit\" value=\"Release\" id = \"release\" class=\"btn float-center ticket_btn\" onclick = \"releaseTicket(${item.id})\">`),
				$("<td align = \"center\" data-label = \"Close\">").html(`<input type=\"submit\" value=\"Close\" id = \"close\" class=\"btn float-center ticket_btn\" onclick = \"closeTicket(${item.id})\">`),
				).appendTo("#mentor-tickets tbody");
			});
		}
	});
}

function claimTicket(ticket) {
	$.ajax({
		url: "/api/claim-ticket",
		type: "POST",
		data: { id : ticket },
		dataType: "json",
		success: function(data) {
			if(!data.claimed) {
				alert("Ticket Unavailable");
				//$(".ticketTable tbody").empty();
				$.ajax({
					url: "/api/get-open-tickets",
					type: "GET",
					dataType: "json",
					success: function(data){
						//console.log(data);
						$("#open-tickets tbody").empty();
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
				//$(".ticketTable tbody").empty();
				clearInterval(refresh);
				$.ajax({
					url: "/api/get-open-tickets",
					type: "GET",
					dataType: "json",
					success: function(data){
						//console.log(data);
						$("#open-tickets tbody").empty();
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

				$.ajax({
					url: "/api/get-mentor-tickets",
					type: "GET",
					dataType: "json",
					success: function(data) {
						$("#mentor-tickets tbody").empty();
						$.each(data, function(index, item){
							var date = new Date(item.submit_time);
							$("<tr>").append(
							$("<td align = \"center\" data-label = \"Ticket ID\">").text(item.id),
							$("<td align = \"center\" data-label = \"Name\">").text(item.name),
							$("<td align = \"center\" data-label = \"Problem\">").text(item.message),
							$("<td align = \"center\" data-label = \"Location\">").text(item.location),
							$("<td align = \"center\" data-label = \"Tags\">").text(item.tags),
							$("<td align = \"center\" data-label = \"Time Submitted\">").text(`${date.toLocaleTimeString('en-US', {hour:'numeric', minute:'numeric', hour12:true})}`),
							$("<td align = \"center\" data-label = \"Release\">").html(`<input type=\"submit\" value=\"Release\" id = \"release\" class=\"btn float-center ticket_btn\" onclick = \"releaseTicket(${item.id})\">`),
							$("<td align = \"center\" data-label = \"Close\">").html(`<input type=\"submit\" value=\"Close\" id = \"close\" class=\"btn float-center ticket_btn\" onclick = \"closeTicket(${item.id})\">`),
							).appendTo("#mentor-tickets tbody");
						});
					}
				});
				refresh = setInterval(fetchData, 10000);
			}
		}
	});
}

function releaseTicket(ticket) {
	$.ajax({
		url: "/api/unclaim-ticket",
		type: "POST",
		data: { id: ticket },
		dataType: "json",
		success: function(data) {
			if(!data.unclaimed) {
				alert("Try Again");
			} else {
				clearInterval(fetchData, 10000);
				$.ajax({
					url: "/api/get-mentor-tickets",
					type: "GET",
					dataType: "json",
					success: function(data){
						//console.log(data);
						$("#mentor-tickets tbody").empty();
						$.each(data, function(index, item){
						var date = new Date(item.submit_time);
						$("<tr>").append(
						$("<td align = \"center\" data-label = \"Ticket ID\">").text(item.id),
						$("<td align = \"center\" data-label = \"Name\">").text(item.name),
						$("<td align = \"center\" data-label = \"Problem\">").text(item.message),
						$("<td align = \"center\" data-label = \"Location\">").text(item.location),
						$("<td align = \"center\" data-label = \"Tags\">").text(item.tags),
						$("<td align = \"center\" data-label = \"Time Submitted\">").text(`${date.toLocaleTimeString('en-US', {hour:'numeric', minute:'numeric', hour12:true})}`),
						$("<td align = \"center\" data-label = \"Release\">").html(`<input type=\"submit\" value=\"Release\" id = \"release\" class=\"btn float-center ticket_btn\" onclick = \"releaseTicket(${item.id})\">`),
						$("<td align = \"center\" data-label = \"Close\">").html(`<input type=\"submit\" value=\"Close\" id = \"close\" class=\"btn float-center ticket_btn\" onclick = \"closeTicket(${item.id})\">`),
						).appendTo("#mentor-tickets tbody");
						});
					}
				});

				$.ajax({
					url: "/api/get-open-tickets",
					type: "GET",
					dataType: "json",
					success: function(data){
						//console.log(data);
						$("#open-tickets tbody").empty();
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
				refresh = setInterval(fetchData, 10000);
			}
		}
	})	
}

function closeTicket(ticket) {
	$.ajax({
		url: "/api/close-ticket",
		type: "POST",
		data: { id: ticket },
		dataType: "json",
		success: function(data) {
			if(!data.unclaimed) {
				alert("Try Again");
			} else {
				$.ajax({
					url: "/api/get-mentor-tickets",
					type: "GET",
					dataType: "json",
					success: function(data){
						//console.log(data);
						$("#mentor-tickets tbody").empty();
						$.each(data, function(index, item){
						var date = new Date(item.submit_time);
						$("<tr>").append(
						$("<td align = \"center\" data-label = \"Ticket ID\">").text(item.id),
						$("<td align = \"center\" data-label = \"Name\">").text(item.name),
						$("<td align = \"center\" data-label = \"Problem\">").text(item.message),
						$("<td align = \"center\" data-label = \"Location\">").text(item.location),
						$("<td align = \"center\" data-label = \"Tags\">").text(item.tags),
						$("<td align = \"center\" data-label = \"Time Submitted\">").text(`${date.toLocaleTimeString('en-US', {hour:'numeric', minute:'numeric', hour12:true})}`),
						$("<td align = \"center\" data-label = \"Release\">").html(`<input type=\"submit\" value=\"Release\" id = \"release\" class=\"btn float-center ticket_btn\" onclick = \"releaseTicket(${item.id})\">`),
						$("<td align = \"center\" data-label = \"Close\">").html(`<input type=\"submit\" value=\"Close\" id = \"close\" class=\"btn float-center ticket_btn\" onclick = \"closeTicket(${item.id})\">`),
						).appendTo("#mentor-tickets tbody");
						});
					}
				});
			}
		}
	})
}

$(document).ready(function() {
	refresh = setInterval(fetchData, 10000);
    $.ajax({
		url: "/api/get-open-tickets",
		type: "GET",
		dataType: "json",
		success: function(data){
			//console.log(data);
			$("#open-tickets tbody").empty();
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
	
	$.ajax({
		url: "/api/get-mentor-tickets",
		type: "GET",
		dataType: "json",
		success: function(data) {
			$("#mentor-tickets tbody").empty();
			$.each(data, function(index, item){
				var date = new Date(item.submit_time);
				$("<tr>").append(
				$("<td align = \"center\" data-label = \"Ticket ID\">").text(item.id),
				$("<td align = \"center\" data-label = \"Name\">").text(item.name),
				$("<td align = \"center\" data-label = \"Problem\">").text(item.message),
				$("<td align = \"center\" data-label = \"Location\">").text(item.location),
				$("<td align = \"center\" data-label = \"Tags\">").text(item.tags),
				$("<td align = \"center\" data-label = \"Time Submitted\">").text(`${date.toLocaleTimeString('en-US', {hour:'numeric', minute:'numeric', hour12:true})}`),
				$("<td align = \"center\" data-label = \"Release\">").html(`<input type=\"submit\" value=\"Release\" id = \"release\" class=\"btn float-center ticket_btn\" onclick = \"releaseTicket(${item.id})\">`),
				$("<td align = \"center\" data-label = \"Close\">").html(`<input type=\"submit\" value=\"Close\" id = \"close\" class=\"btn float-center ticket_btn\" onclick = \"closeTicket(${item.id})\">`),
				).appendTo("#mentor-tickets tbody");
			});
		}
	})

    //$(".ticketTable tbody").append('<tr><td align = "center" data-label = "Name"> Chris </td> <td align = "center" data-label = "Problem Description"> Help </td><td align = "center" data-label = "Location"> Vikkybums Rooms </td> <td align = "center" data-label="Tags"> ANDROID </td> <td align = "center" data-label="status"> <a href = "" class = "claim"> Open </a></td></tr>');
});