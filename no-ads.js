document.body.style.border = "5px solid red";

browser.runtime.onMessage.addListener((message) => {
    if (message === 'bad') {
        const html = document.querySelector('html')
        console.log(html)
        html.innerHTML = " bajs ";
    }
})