$(document).ready(function() {
  $('#home').click(function() {
    console.log('something happened')
    chrome.tabs.create({ url: '/home.html' })
  });
});
