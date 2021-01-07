// ----------------------------------
//  GLOBAL VARIABLES 
// ----------------------------------

const galleryNode = document.querySelector('#gallery');


// ----------------------------------
//  EVENT LISTENERS
// ----------------------------------

window.addEventListener('load', () => {
    const gallery = new Gallery;
    gallery.fetchData();
    
});