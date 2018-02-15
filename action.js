/* ====== DOM Grab ====== */
var nav = document.querySelector('nav');

var logo = nav.querySelector('#logo');
var nav_titles = Array.from(nav.querySelectorAll('a.nav-title'));
var dropdown_contents = Array.from(nav.querySelectorAll('.dropdown-content'))
var dropdown_background = nav.querySelector('#dropdown-background');


/* ====== Variables ====== */
const initial_nav_top = nav.getBoundingClientRect().top - window.pageYOffset;

const nav_padding = getComputedStyle(nav).getPropertyValue('--dropdown-padding');



/* ====== Functions ====== */
function sticky_nav() {

    if( window.pageYOffset >= initial_nav_top ) {
        nav.style.position = "fixed";
        nav.style.top = 0;
        logo.classList.remove('hidden');
    }
    else {
        nav.style.position = "relative";
        logo.classList.add('hidden');
    }

    adjust_dropdown_background();
}

function dropdown() {
    // Remove .showing from other dropdowns
    let siblings = dropdown_contents.filter( content => content.parentNode != this)
    siblings.forEach( sibling => sibling.classList.remove('showing-content') )

    // Measurements
    let content = this.children[1];
    content.classList.toggle('showing-content');

    let nav_bounds = nav.getBoundingClientRect();
    let content_bounds = content.getBoundingClientRect();

    let nav_bottom = nav_bounds.top + nav_bounds.height;
    

    

    // Position dropdown background based on measurements
    dropdown_background.style.cssText = `
                                top: ${nav_bottom}px;
                                left: ${content_bounds.left}px;
                                height: calc( ${content_bounds.height}px + ${nav_padding} );
                                width: ${content_bounds.width}px;
                                transition: all var(--transition-time);`

}

function adjust_dropdown_background() {

    let showing_content = nav.querySelector('.showing-content');

    if( showing_content ) {
        let content_bounds = showing_content.getBoundingClientRect();

        dropdown_background.style.top = `calc( ${content_bounds.top}px - ${nav_padding})`
        dropdown_background.style.left = `${content_bounds.left}px`
        dropdown_background.style.transition = 'none'
    }  
}


/* ====== Events ====== */

window.addEventListener('scroll', sticky_nav)

nav_titles.forEach( (title) => {
    // TODO: Change to hover
    title.addEventListener('click', e => e.preventDefault() )
    title.parentElement.addEventListener('click', dropdown)
})
