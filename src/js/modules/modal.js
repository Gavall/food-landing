function showModal(modalSelector, setTimeOutModal) { // Показать формы
    const modalForm = document.querySelector(modalSelector);

    modalForm.classList.add('show');
    document.body.style.overflow = 'hidden';

    console.log(setTimeOutModal);
    if(setTimeOutModal) {
        clearTimeout(setTimeOutModal); // Отмена показа формы при скролле до конца страницы
    }
}

function closeModal(modalSelector) { // Функция закрытия модальной формы
    const modalForm = document.querySelector(modalSelector);

    modalForm.classList.remove('show');
    document.body.style.overflow = '';
};

function modal(triggerSelector, modalSelector, setTimeOutModal) {
    //----------------------------------------
    // Модальное окно
    //----------------------------------------

    const modalForm = document.querySelector(modalSelector),
          modalBtn = document.querySelectorAll(triggerSelector);

    modalBtn.forEach(btn => { // Перебор всех триггеров форм
        btn.addEventListener('click', () => showModal(modalSelector, setTimeOutModal));
    });

    modalForm.addEventListener('click', (e) => { // Закрыть модальную форму при нажатии на крестик или вне формы
        if(e.target === modalForm || e.target.getAttribute('data-closemodal') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => { // Закрыть модальную форму при нажатии escape
        if (e.code === "Escape" && modalForm.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });
    
    function showeModalFormByScroll() {// Показать форму при скролле до конца страницы
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(modalSelector, setTimeOutModal);
            window.removeEventListener('scroll', showeModalFormByScroll);// Отмена обработчика "Показать форму при скролле до конца страницы"
        }
    };

    window.addEventListener('scroll', showeModalFormByScroll);// Обработчик "Показать форму при скролле до конца страницы"
}

export default modal;

export {showModal, closeModal};