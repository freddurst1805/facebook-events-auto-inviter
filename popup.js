
// Menu Popup
document.getElementById('toggle').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: startApp
        });
    });
});
document.getElementById('stop').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: stopApp
        });
    });
});

let intervalToggleFB;
let intervalScrollingFB;

function startApp() {
    let lastHeight = 0;

    // Coche tous les contacts
    intervalToggleFB = setInterval(() =>{
        const inviteButtons = document.querySelectorAll('div[aria-label="Invitez des personnes"] .x1emribx.x1i64zmx i.x1b0d499.x1d69dk1');
        inviteButtons.forEach(button => {
            button.click();
        });
    }, 200);

    // Scroll le block des contacts vers le bas
    intervalScrollingFB = setInterval(() => {
        const scrollableBlock = document.querySelector('div[aria-label="Invitez des personnes"] div.x2atdfe.xb57i2i.x1q594ok.x5lxg6s.x78zum5.xdt5ytf.x1n2onr6.x1ja2u2z.xw2csxc.x7p5m3t.x1odjw0f.x1e4zzel');

        if(scrollableBlock) {
            scrollableBlock.scrollTop = scrollableBlock.scrollHeight;
            const newHeight = scrollableBlock.scrollHeight;

            if (newHeight > lastHeight) {
                lastHeight = newHeight;
            }
        }
    }, 200);

}

function stopApp() {
    clearInterval(intervalScrollingFB);
    clearInterval(intervalToggleFB);
}