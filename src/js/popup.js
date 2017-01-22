document.getElementById('home').onclick = function() {
  chrome.tabs.create({ url: '/home.html' })
}
