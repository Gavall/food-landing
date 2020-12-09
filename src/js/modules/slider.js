function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    //-------------------------------------------
    // Создание Слайдера
    //-------------------------------------------

    const sliderPrev = document.querySelector(prevArrow),
          sliderNext = document.querySelector(nextArrow),
          currentSliders = document.querySelector(currentCounter),
          totalSliders = document.querySelector(totalCounter),
          slider = document.querySelector(container),
          slides = document.querySelectorAll(slide),
          sliderWrapper = slider.querySelector(wrapper),
          sliderInner = document.querySelector(field),
          sliderWidth = window.getComputedStyle(sliderWrapper).width;

    let slideIndex = 1, 
        offset = 0;
 
    function lengthSlider (slider) {
        if(slider.length < 10) {
            currentSliders.textContent = `0${slideIndex}`;
        } else {
            currentSliders.textContent = slideIndex;
        }
    };

    function showActiveDots () {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex -1].style.opacity = 1;
    };
    
    lengthSlider(slides);

    if(slides.length < 10) {
        totalSliders.textContent = `0${slides.length}`;
    } else {
        totalSliders.textContent = slides.length;
    }

    sliderInner.style.width = 100 * slides.length + '%';
    sliderInner.style.display = 'flex';
    sliderInner.style.transition = '0.5s all';

    sliderWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = sliderWidth;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);

        if(i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteTextReplace (str) {
        return +str.replace(/\D/g, '');
    };

    sliderNext.addEventListener('click', () => {
        if(offset == deleteTextReplace(sliderWidth) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteTextReplace(sliderWidth);
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        lengthSlider(slides);

        showActiveDots ();
    });

    sliderPrev.addEventListener('click', () => {
        if(offset == 0) {
            offset = deleteTextReplace(sliderWidth) * (slides.length - 1);
        } else {
            offset -= deleteTextReplace(sliderWidth);
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        lengthSlider(slides);

        showActiveDots ();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteTextReplace(sliderWidth) * (slideTo - 1);

            sliderInner.style.transform = `translateX(-${offset}px)`;

            lengthSlider(slides);

            showActiveDots ();
        });
    });
}

export default slider;