const badUrls = [
    /bonad.io/,
    ]

function detectBadUrl(requestDetails) {
  console.log(requestDetails)
  for (const badUrl of badUrls) {
    const isBad = badUrl.test(requestDetails.url)

    if (isBad) {
      browser.tabs.sendMessage(
        requestDetails.tabId,
        "bad"
      ).catch((e) => {
        console.log("trying again")
        setTimeout(() => {
          browser.tabs.sendMessage(
            requestDetails.tabId,
            "bad")
          }, 500)
      })

      break
    }
  }
}

browser.webRequest.onBeforeRequest.addListener(detectBadUrl, {
  urls: ["<all_urls>"],
});