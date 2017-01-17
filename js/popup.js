document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
});

_.templateSettings.variable = "element";
var tpl = _.template($("#alertTemplate").html());
var info = 'success';
var warning = 'warning';
var error = "error";

$(".addAlert").on("click", function (e) {
    e.preventDefault();
    addAlert(info, "Alert Message");
});

function addAlert(type, message) {
    var tplData = {
        message: message,
        type: type

    };
    $("#mainContainer").append(tpl(tplData));
}
