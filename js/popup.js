$(document).ready(function() {
  $('#home').click(function() {
    chrome.tabs.create({ url: '/home.html' })
  });
});
