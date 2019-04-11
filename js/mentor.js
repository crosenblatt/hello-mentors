$(document).ready(function() {
    $(".ticketTable tbody").empty();
    $(".ticketTable tbody").append('<tr><td align = "center" data-label = "Name"> Chris </td> <td align = "center" data-label = "Problem Description"> Help </td><td align = "center" data-label = "Location"> Vikkybums Rooms </td> <td align = "center" data-label="status"> <a href = "" class = "claim"> Open </a></td></tr>');

    $(".claim").click(function() {
        $(this).text($(this).text() == 'Open' ? 'Finish' : 'Open');
        return false;
    })
});