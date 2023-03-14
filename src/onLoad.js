import timeNow from "./timeCycle";

$(document).ready(function () {
    var date = new Date();
    text = timeNow(date);
    $("#time").text(text);
});