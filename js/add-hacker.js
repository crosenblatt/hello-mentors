$(document).ready(function() {
    $("#add-hacker").submit(function(event) {
        $.ajax({
            url: "/api/add-hacker",
            type: "POST",
            dataType: "json",
            data: $("#add-hacker").serialize(),
            statusCode: {
            	200: function(data){
            		alert('Hacker Successfully created');
            	},
            	400: function(data){
            		if(data.responseJSON.error != null) {
            			alert(`ERROR: ${data.responseJSON.error}`);
            		}else {
            			alert('ERROR: Name or Email not defined');
            		}
            	},
            	403: function(data){
            		alert("ERROR: Not Authorized to perform this action");
            	},
            	500: function(data){
            		alert('ERROR: Database has encountered an error');
            	},
            	503: function(data){
            		alert('ERROR: Database Connection Error');
            	}
            }
        });
        
        $("#add-hacker").each(function() {
            this.reset();
        });
        event.preventDefault();
    });

});