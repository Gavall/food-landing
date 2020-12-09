function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    //----------------------------------------
    // Переключение табов и их анимация
    //----------------------------------------

    const tabsParent = document.querySelector(tabsParentSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabs = document.querySelectorAll(tabsSelector);

    function hideTabsContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('showe', 'fade_tabcontent');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    };

    function showeTabsContent(i = 0) {
        tabsContent[i].classList.add('showe', 'fade_tabcontent');
        tabsContent[i].classList.remove('hide');

        tabs[i].classList.add(activeClass);
    }

    hideTabsContent();
    showeTabsContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabsContent();
                    showeTabsContent(i);
                }
            });
        };
    });
}

export default tabs;