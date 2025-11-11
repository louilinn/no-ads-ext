const badUrls = [
    /bonad.io/,
    ]

function detectBadUrl(requestDetails) {
  for (const badUrl of badUrls) {
    const isBad = badUrl.test(requestDetails.url)

    if (isBad) {
      console.log(requestDetails)
      console.log("active rule:", badUrl)
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


async function loadUrls() {
  const url = browser.runtime.getURL('/resources/easylist.txt');
  const response = await fetch(url);
  const text = await response.text();
  for (const line of text.split('\n')) {
    if(line[0] === '!' || line.substring(0, 2) === "@@" || line.includes('#')) continue

    // Note, this is a simple hack to make use of the filters
    // in the easylist. Should probably be revisited later.
    // (I am jinxing it, this will be in the code until the heat death of the universe.)
    let simpleRule = line
      .split('$')[0]
      .replaceAll('.', '\\.')
      .replaceAll('/', '\\/')
      .replaceAll('?', '\\?')
      .replaceAll('[', '\\[')
      .replaceAll(']', '\\]')
      .replaceAll('||', '')
      .replaceAll('|', '')
      .replaceAll('^', '');

    console.log(line, simpleRule)
    if (simpleRule.length === 0) continue
    badUrls.push(new RegExp(simpleRule))
  }
}

loadUrls();

browser.webRequest.onBeforeRequest.addListener(detectBadUrl, {
  urls: ["<all_urls>"],
});