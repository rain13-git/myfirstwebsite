import {getZero} from './timer';

function slider({container, slide, nextArrow, prevArrow, totalCounter, currCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        counter = document.querySelector('.offer__slider-counter'),
        prev =  counter.querySelector(prevArrow),
        next = counter.querySelector(nextArrow),
        count = counter.querySelector(currCounter),
        total = counter.querySelector(totalCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideId = 1;
    let offset = 0;

    slidesField.style.width = 100 * slides.length + '%';
    slides.forEach(item => {
        item.style.width = width;
    });


    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        indicators.append(dot);
        if (i == 0) {
            dot.classList.add('isKnow');
        }

        dots.push(dot);
    }

    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    
    slidesWrapper.style.overflow = 'hidden';



    function paintSlideCount(offset) {
        dots.forEach(dot => dot.classList.remove('isKnow'));
        dots[offset / 650].classList.add('isKnow');
        count.textContent = getZero(offset / 650 + 1);     
        slidesField.style.transform = `translateX(-${offset}px)`;
    }
    count.textContent = getZero(offset / 650 + 1);        

    function strToN(str) {
        return +str.replace(/\D/g, '');
    }


    next.addEventListener('click', () => {
        if (offset == strToN(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += strToN(width);
        }
        paintSlideCount(offset);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = strToN(width) * (slides.length - 1);
        } else {
            offset -= strToN(width);
        }
        paintSlideCount(offset);
    });

    dots.forEach((dot, id) => {
        dot.addEventListener('click', () => {
            offset = 650 * id;
            paintSlideCount(offset);
        });
    });

    // showSlides(slideId);
    // total.textContent = getZero(slides.length);

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideId = 1;
    //     }

    //     if (n < 1) {
    //         slideId = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');

    //     slides[slideId - 1].style.display = 'block';
    //     count.textContent = getZero(slideId);
    // }

    // function plusSlides(n) {
    //     showSlides(slideId += n);
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });

}

export default slider;