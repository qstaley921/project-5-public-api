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

/**
 * - fetches API Data on Page Load
 * - Creates a new Gallery Object, passing the API.response
 */
window.addEventListener('load', () => {
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
        .catch(() => {
            galleryNode.innerHTML = `
            <div id="report-error">
                <h3>Yikes! Your results failed to load. Try refreshing the page. </h3>
                <div class="image-frame"></div>
                <button id='reload-btn'><i class="fas fa-redo-alt"></i></button>
            </div>`;

            const button = document.querySelector('#reload-btn');
            button.addEventListener('click', () => {
                location.reload();
            });
        })
});