chrome.contextMenus.create({
  title: 'Use URL of image somehow',
  contexts: ['image'],
  onclick: function(info) {
    chrome.tabs.query({
      url: 'chrome-extension://*/home.html'
    }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        url: info.srcUrl
      });
    });
  }
});
