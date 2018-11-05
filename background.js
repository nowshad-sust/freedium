chrome.runtime.onInstalled.addListener(function() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("url to be opened" + request.url);
    chrome.windows.create({
      url: request.url,
      incognito: true
    });
  });
});
