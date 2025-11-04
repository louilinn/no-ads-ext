// Set red border as test / indication plugin is running
document.body.style.border = "5px solid red";

browser.runtime.onMessage.addListener((message) => {
    console.log(message)
    if (message.block) {
        const html = document.querySelector('html')
        console.log(html)
        html.innerHTML = " Hey, that page wasn't that good anyway. ";

        const backLink = document.createElement("a");
        backLink.href = "javascript:history.back();";
        backLink.textContent = "[Go Back]";

        html.appendChild(backLink)

        const details = createDetailsElement(message)
        html.appendChild(details)
    }
})

function createDetailsElement(message) {
    const details = document.createElement("details")
    const summary = document.createElement("summary")
    const content = document.createElement("p")

    details.open = true
    summary.innerHTML = "details"
    content.innerHTML = ` Page requested ${message.requestUrl} that matched the rule ${message.matchingRule}`

    details.appendChild(summary)
    details.appendChild(content)

    return details
}