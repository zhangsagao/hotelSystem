$(function () {

    $("#pid").ready(function () {
        $("#pid").text("id = "+getUrlQueryString("id"));
    })

    $("#train").bind("click",function () {
        $("#show").append($("<div > </div>"));
    })

    $("#order").bind("click",function () {
    })

    $("#ticket").bind("click",function () {
    })

})