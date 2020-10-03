    const Slider = {
        $selector: null,
        $slides: null,
        $dots: null, 
        index: 0,
        isError: false,
        widthSlide: 0,
        init: function({$selector, $dots}){

            this.$selector = this._getSelector($selector);
            this.$dotsWrap = this._getSelector($dots);
            this.$dots = this.$dotsWrap.children;

            if(this.isError) return false;

            this.$slides = this.$selector.children;

            this.widthSlide = this.$selector.parentElement.offsetWidth;
            this.$selector.style.width = this.widthSlide*this.$slides.length + 'px';
    
            for(let i=0; i<this.$slides.length; i++){
                this.$slides[i].style.width = this.widthSlide + 'px';
            }
            this.$dotsWrap.addEventListener('click', e => {
                const slideTo = e.target.getAttribute('data-slide-to');
                if(slideTo !== null)
                    this.showSlide(slideTo-1);
            });

            window.addEventListener('resize', this.init.bind(this, {$selector, $dots}));
            return this.showSlide();

        },

        _getSelector(selector){
          if(typeof(selector) === 'string'){
              selector = document.querySelector(selector);
          }  
          if(selector && selector.tagName){
              return selector;
          }else{
            this.isError = true;
            console.log('Error selector');
            return null;
          }
        },
        showSlide(slideIndex) {
            if(slideIndex === undefined){
                slideIndex = this.index;
            }else{
                this.$dots[this.index].classList.remove('price__dot_active');
            }
         
            this.$dots[slideIndex].classList.add('price__dot_active');
            this.$selector.style.transform = 'translateX(-'+(100/this.$slides.length*slideIndex)+'%)';
            this.index = slideIndex;

            return this;
        }
    };
   
    if(isMobile){
        Slider.init({
            $selector: '.price__blocks', 
            $dots: '.price__dots'
        });
    }