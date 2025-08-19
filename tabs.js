const tabLists = document.querySelector('[role="tablist"]');
const tabs = tabLists.querySelectorAll('[role="tab"]');


tabLists.addEventListener('keydown', changeTabFocus);
tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
});


let tabFocus = 0;
function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;

    /* Change the tabindex of the current tab to -1 */
    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);

        if (e.keyCode === keydownRight) {
            tabFocus++;
            if (tabFocus >= tabs.length) {
                tabFocus = 0;
            }
        } else {
            tabFocus--;
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        }

        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus();
    }
}

function changeTabPanel(e) {
    /* A Space is also considered as a click! */
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute('aria-controls');
    const targetImage = targetTab.getAttribute('data-image');

    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;

    tabContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute('aria-selected', false);

    targetTab.setAttribute('aria-selected', true);


    // mainContainer
    //     .querySelectorAll('[role="tabpanel"]')
    //     .forEach((panel) => panel.setAttribute("hidden", true));
    hideContent(mainContainer, '[role="tabpanel"]');

    // mainContainer.querySelector([`#${targetPanel}`]).removeAttribute('hidden');
    showContent(mainContainer, [`#${targetPanel}`]);



    // mainContainer
    //     .querySelectorAll('picture')
    //     .forEach((picture) => {
    //         picture.setAttribute('hidden', true);
    //     })
    hideContent(mainContainer, 'picture');


    // mainContainer.querySelector([`#${targetImage}`]).removeAttribute('hidden');
    showContent(mainContainer, [`#${targetImage}`]);


    console.log(targetImage);
}

function hideContent(parent, content) {
    parent
        .querySelectorAll(content)
        .forEach((item) => {
            item.setAttribute('hidden', true);
        })
}

function showContent(parent, content) {
    parent.querySelector(content).removeAttribute('hidden');
}