'use strict';
window.addEventListener('resize', onResize);
onResize();

function onResize(){
 
    window.isMobile = (device.mobile() || (device.tablet() && device.portrait())) && window.innerWidth < 769;

     document.documentElement.classList.add(window.isMobile ? 'mobile': 'desktop');
     document.documentElement.classList.remove(!window.isMobile ? 'mobile': 'desktop');
}