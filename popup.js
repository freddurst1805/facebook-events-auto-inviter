
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
        let inviteButtons = false;
        let invitationsRestantesEl = false;
        let invitationsRestantes = 0;
        if(document.querySelectorAll('div[aria-label="Invitez des personnes"]').length > 0) {
            inviteButtons = document.querySelectorAll('div[aria-label="Invitez des personnes"] .x1emribx.x1i64zmx i.x1b0d499.x1d69dk1');
            invitationsRestantesEl = document.querySelector('div[aria-label="Invitez des personnes"] .x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x4zkp8e.x676frb.x1pg5gke.x1sibtaa.x1s688f.xi81zsa');
        }
        else if(document.querySelectorAll('div[aria-label="Invitez des followers"]').length > 0) {
            inviteButtons = document.querySelectorAll('div[aria-label="Invitez des followers"] .x1emribx.x1i64zmx i.x1b0d499.x1d69dk1');
            invitationsRestantesEl = document.querySelector('div[aria-label="Invitez des followers"] .x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x4zkp8e.x676frb.x1pg5gke.x1sibtaa.x1s688f.xi81zsa');
        }
        if(inviteButtons) {
            // Récupère le nombre d'invitations restantes max
            if(invitationsRestantesEl) {
                const invitationsRestantesTexte = invitationsRestantesEl.textContent;
                const chiffres = invitationsRestantesTexte.match(/\d+/)[0];
                invitationsRestantes = parseInt(chiffres, 10);

                let i = 0;
                inviteButtons.forEach(button => {
                    let state = button.closest('a[aria-disabled]');
                    if(!state || state.getAttribute('aria-disabled') !== 'true') {
                        console.log(i, invitationsRestantes);
                        if(i < invitationsRestantes) {
                            button.click();
                            i++;
                        }
                        else {
                            clearInterval(intervalScrollingFB);
                            clearInterval(intervalToggleFB);
                        }
                    }
                });
            }
            else {
                inviteButtons.forEach(button => {
                    button.click();
                });
            }
        }
    }, 200);

    // Scroll le block des contacts vers le bas
    intervalScrollingFB = setInterval(() => {
        let scrollableBlock = false;
        if(document.querySelectorAll('div[aria-label="Invitez des personnes"]').length > 0)
            scrollableBlock = document.querySelector('div[aria-label="Invitez des personnes"] div.x2atdfe.xb57i2i.x1q594ok.x5lxg6s.x78zum5.xdt5ytf.x1n2onr6.x1ja2u2z.xw2csxc.x7p5m3t.x1odjw0f.x1e4zzel');
        else if(document.querySelectorAll('div[aria-label="Invitez des followers"]').length > 0)
            scrollableBlock = document.querySelector('div[aria-label="Invitez des followers"] div.x2atdfe.xb57i2i.x1q594ok.x5lxg6s.x78zum5.xdt5ytf.x1n2onr6.x1ja2u2z.xw2csxc.x7p5m3t.x1odjw0f.x1e4zzel');

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