/* ====== DOM Grab ====== */
var nav = document.querySelector('nav');

var logo = nav.querySelector('#logo');
var nav_titles = Array.from(nav.querySelectorAll('a.nav-title'));
var dropdown_contents = Array.from(nav.querySelectorAll('.dropdown-content'))
var dropdown_background = nav.querySelector('#dropdown-background');


/* ====== Variables ====== */
var initial_nav_top = nav.getBoundingClientRect().top



/* ====== Functions ====== */
function sticky_nav() {

    if( window.scrollY >= initial_nav_top ) {
        nav.style.position = "fixed";
        nav.style.top = 0;
        logo.classList.remove('hidden');
    }
    else {
        nav.style.position = "relative";
        logo.classList.add('hidden');
    }
}

function dropdown() {
    // Remove .showing from other dropdowns
    let siblings = dropdown_contents.filter( content => content.parentNode != this)
    siblings.forEach( sibling => sibling.classList.remove('showing-content') )

    console.log(siblings)

    // Show this dropdown
    let content = this.children[1];
    content.classList.toggle('showing-content');

    // measurements
    let nav_bounds = nav.getBoundingClientRect();
    let content_bounds = content.getBoundingClientRect();

    let nav_bottom = nav_bounds.top + nav_bounds.height;
    let padding = getComputedStyle(nav).getPropertyValue('--dropdown-padding');

    // Position dropdown background based on measurements
    dropdown_background.style.cssText = `
                                top: ${nav_bottom}px;
                                left: ${content_bounds.left}px;
                                height: calc( ${content_bounds.height}px + ${padding} );
                                width: ${content_bounds.width}px;`
}


/* ====== Events ====== */
window.addEventListener('scroll', sticky_nav)

nav_titles.forEach( (title) => {
    title.parentElement.addEventListener('click', dropdown)
})
