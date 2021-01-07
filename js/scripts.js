// ----------------------------------
//  GLOBAL VARIABLES 
// ----------------------------------

const galleryNode = document.querySelector('#gallery');
const personNodes = [];

// ----------------------------------
//  EVENT LISTENERS
// ----------------------------------

window.addEventListener('load', () => {
    const gallery = new Gallery;
    gallery.fetchData();
});

 
