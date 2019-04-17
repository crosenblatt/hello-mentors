$(document).ready(function() {
    $("#add-mentor").submit(function(event) {
    	var mentorData = {
    		name:  $('#name').val(),
    		email: $('#email').val(),
    		tags:  $('#tags').val().join(',')
    	};
    	
        $.ajax({
            url: "/api/add-mentor",
            type: "POST",
            dataType: "json",
            data: mentorData,
            statusCode: {
            	200: function(data){
            		alert('Mentor Successfully created');
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
        
        $("#add-mentor").each(function() {
            this.reset();
        });
        event.preventDefault();
    });

});