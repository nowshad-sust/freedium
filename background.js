chrome.runtime.onInstalled.addListener(function() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    const { url, method } = request;

    if (method === "incognito") {
      chrome.windows.create({
        url: request.url,
        incognito: true
      });
    } else {
      chrome.tabs.create({ url: request.url });
    }
  });
});
