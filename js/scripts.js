// ----------------------------------
//  GLOBAL VARIABLES 
// ----------------------------------

const galleryNode = document.querySelector('#gallery');
const searchContainerNode = document.querySelector('.search-container');
const personCount = 12;
const personNodes = [];

// ----------------------------------
//  EVENT LISTENERS
// ----------------------------------

window.addEventListener('load', () => {
    const gallery = new Gallery;
    fetch(`https://randomuser.me/api/?results=${personCount}&nat=us`)
        .then(response => response.json())
        .then(json => json.results)
        .then(results => {
            const gallery = new Gallery(results);
            gallery.genPersons();
            gallery.genGallery();
            gallery.genSearch();
            gallery.genListeners();

        })
});

 
