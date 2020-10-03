
document.addEventListener('DOMContentLoaded', () => {


    const menu = document.querySelector('.header__menu'),
    hamburger = document.querySelector('.header__hamburger');

    hamburger.addEventListener('click', () => {
        document.body.classList.toggle('menu-active')
    });
    menu.addEventListener('click', (e)=>{
        if(e.target.tagName === 'A'){
            document.body.classList.remove('menu-active');
        }
    })

    window.addEventListener('load', () => {
        setTimeout(()=>{
            document.body.classList.add('loaded');
        }, 400)
        
});

    const tabsParent = document.querySelector('.service__tabs'),
            tabs = document.querySelectorAll('.service__tab'),
            slides = document.querySelectorAll('.service__slide');

    hideTabsContent();
    showTabsContent();

    function hideTabsContent() {
        slides.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        })

        tabs.forEach(item => {
            item.classList.remove('service__tab_active');
        });
    }

    function showTabsContent(i = 1) {
        slides[i].classList.add('show', 'slideIn', 'fade');
        slides[i].classList.remove('hide');

        tabs[i].classList.add('service__tab_active');
    }

    tabsParent.addEventListener('click', () => {
        const target = event.target;

        if(target && target.classList.contains('service__tab')){
            tabs.forEach((item, i) => {
                if(target === item) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            })
        }
    })


    class Slider {
        constructor (selector, dotsSelector) {
            this.selector = selector;
            this.dotsSelector = dotsSelector;
            this.index = 0;
            this.widthSlide  = 0
            this.isError = false;
        }
        render() {
    
            this.selector = this.getSelector(this.selector);
            this.dotsSelector = this.getSelector(this.dotsSelector);
    
            if(this.isError) return false;
    
            this.dots = this.dotsSelector.children;
            this.slides = this.selector.children;
    
            this.widthSlide = this.selector.parentElement.offsetWidth;
            this.selector.style.width = this.widthSlide * this.slides.length + 'px';
        
    
            for(let i=0; i<this.slides.length; i++){
                this.slides[i].style.width = this.widthSlide + 'px';
            }
    
            this.dotsSelector.addEventListener('click', e => {
                const slideTo = e.target.getAttribute('data-slide-to');
                if(slideTo !== null)
                    this.showSlide(slideTo - 1);
            });
    
            this.showSlide();
    
            
        }
    
        getSelector(selector) {
            if(typeof(selector) === 'string') {
                selector = document.querySelector(selector);
            }
    
            if (selector && selector.tagName) {
                return selector;
            } else {
              this.isError = true;
              console.log('Error selector');
              return null;
            } 
    
        }
    
        showSlide(slideIndex) {
            if (slideIndex === undefined) {
                slideIndex = this.index;
            } else {
                this.dots[this.index].classList.remove('price__dot_active');
            }
    
                this.dots[slideIndex].classList.add('price__dot_active');
                this.selector.style.transform = 'translateX(-'+(100/this.slides.length * slideIndex)+'%)';
                this.index = slideIndex;
        }
        
    }
    
    if(isMobile) {
        new Slider('.price__blocks', '.price__dots').render();
    }


    const modal = document.querySelector('.modal'),
        modalBtn = document.querySelector('[data-modal'),
        closeBtn = document.querySelector('[data-close]');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    modalBtn.addEventListener('click', openModal);
    
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);


    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            closeModal();
        }
    })

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    })
 
})
