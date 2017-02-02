chrome.contextMenus.create({
  title: 'Use URL of image somehow',
  contexts: ['image'],
  onclick: function(info) {
    alert(info.srcUrl)
  }
});
