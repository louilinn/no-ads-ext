const badUrls = [
    /bonad.io/,
    ]

function detectBadUrl(requestDetails) {
  for (const badUrl of badUrls) {
    const isBad = badUrl.test(requestDetails.url)

    if (isBad) {
      browser.tabs.sendMessage(
        requestDetails.tabId,
        "bad"
      )

      break
    }
  }
}

browser.webRequest.onBeforeRequest.addListener(detectBadUrl, {
  urls: ["<all_urls>"],
});