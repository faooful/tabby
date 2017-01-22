function copyToClipboard(str) {
    var obj=document.getElementById("clipboard");

    if( obj ) {
        obj.value = str;
        obj.select();
        document.execCommand("copy", false, null);
    }
}

document.getElementById("copyToTabby").onclick = function copyURL() {
  chrome.tabs.getSelected(null, function(tab) {
    copyToClipboard(tab.url);
  });
}
