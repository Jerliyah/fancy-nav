/* ====== DOM Grab ====== */
nav = document.querySelector('nav');
logo = document.querySelector('#logo');


/* ====== Variables ====== */
var initial_nav_top = nav.getBoundingClientRect().top



/* ====== Functions ====== */
function sticky_nav() {
    // console.log(window.scrollY)
    // console.log( initial_nav_top)

    if( window.scrollY >= initial_nav_top ) {
        nav.style.position = "fixed";
        logo.classList.remove('hidden')
    }
    else {
        nav.style.position = "relative";
        logo.classList.add('hidden')
    }
    
}


/* ====== Events ====== */
window.addEventListener('scroll', sticky_nav)
