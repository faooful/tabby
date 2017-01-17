function list(tabs) {
  var pinned = document.getElementById("pinned").checked;
  var contents = '';
  for (var i = 0; i < tabs.length; i++) {
    if (pinned)
      contents += tabs[i].url + '\n';
	else if(!tabs[i].pinned)
	  contents += tabs[i].url + '\n';
  }
  document.getElementById('url-list').value = contents;
}

document.getElementById('copy').addEventListener('click', function(e) {
  chrome.tabs.getAllInWindow(null, list);
  var textarea = document.getElementById('url-list');
  textarea.focus();
  var result = document.execCommand('copy');
  if(result) {
    textarea.select();
    document.getElementById('result').innerHTML = '<span class="success">copied to clipboard!</span>';
  } else {
    document.getElementById('result').innerHTML = '<span class="error">error copying to clipboard</span>';
  }
});
