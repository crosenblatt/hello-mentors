$(document).ready(function() {
    $(".ticketTable tbody").empty();
    $(".ticketTable tbody").append('<tr><td align = "center"> Chris </td> <td align = "center"> Help </td><td align = "center"> Vikkybums Rooms </td> <td align = "center"> <a href = "" class = "claim"> Open </a></td></tr>');

    $(".claim").click(function() {
        $(this).text($(this).text() == 'Open' ? 'Finish' : 'Open');
        return false;
    })
});