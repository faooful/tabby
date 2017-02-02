// TODO: store image in local storage to handle case when home tab isn't open
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
