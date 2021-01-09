

class Gallery {
    constructor(data) {
        this.json = data;
        this.persons = []; // will hold an array of Person Objects
        this.filteredPersons = []; // will hold an array of Person Objects that match search result (`this.filter`)
        this.activePerson = null; // will hold the Person Object whose MODAL is active
        this.activeModal = false; 
        this.formDOM = null; // will hold the Search Bar Form Node
        this.filter = ''; // will hold the string value of the Search Bar Input.value
    }

    // ----------------------------------
    //  METHODS
    // ----------------------------------

    /**
     * - iterates through  this.json (api.results), creating a Initializing a Person Object on each iteration
     * - those Person Objects are stored in this.persons[]
     */
    genPersons() {
        let cell = '';
        let dob = null;
        let email = '';
        let gender = '';
        let location = null;
        let name = null;
        let img = null;
        this.json.forEach(person => {
            for (const prop in person) {
                if (prop === 'cell') cell = person[`${prop}`];
                if (prop === 'dob') dob = person[`${prop}`];
                if (prop === 'email') email = person[`${prop}`];
                if (prop === 'gender') gender = person[`${prop}`];
                if (prop === 'location') location = person[`${prop}`];
                if (prop === 'name') name = person[`${prop}`];
                if (prop === 'picture') img = person[`${prop}`];
            }
            const index = this.persons.length;
            const newPerson = new Person(cell, dob, email, gender, location, name, img, index);
            this.persons.push(newPerson);
        }); 
    }


    /**
     * - append a PersonHTML Node to the GalleryNode for each person in persons[]
     * - select each person '.card' node and push() to personNodes[] (global-variable)
     */
    genGallery() {
        let success = false; // for storing if any Persons were appended, starts empty
        galleryNode.innerHTML = ''; // resets page before load.
        this.filteredPersons = []; // resets who is filtered upon loading
        this.persons.forEach(person => {
            const name = person.fullName.toLowerCase();
            if (name.includes(this.filter)) { // tests name against input.value (this.filter)
                galleryNode.appendChild(person.htmlNode); // appends only children who pass
                this.filteredPersons.push(person); // adds to a new list of filtered person Objects to be used for modal functionality
                success = true; // at least one person was appeneded
            } 
        }); 
        personNodes.push(document.querySelectorAll('.card')); // stores nodes once page is loaded, which is a global variable stored in 'scripts.js'

        /**
         * Appends an Error Message if no cards are loaded just above
         */
        if (!success) { 
            galleryNode.innerHTML = `
            <div id="report-error">
                <h3>Yikes! Delete and try again. </h3>
                <div class="image-frame"></div>
                <button id='reload-btn'><i class="fas fa-backspace"></i></button>
            </div>`;

            const button = document.querySelector('#reload-btn');
            const input = document.querySelector('#search-input');
            button.addEventListener('click', () => {
                this.filter = '';
                input.value = '';
                this.genGallery();
            });
            
        }
    }

    /**
     * - Generates a search bar, appends it to the page
     */
    genSearch() {
        // ----------------------------------
        //  CREATE ELEMENTS
        // ----------------------------------
        const formNode = document.createElement('form');
        const inputNode = document.createElement('input');
        const submitNode = document.createElement('button');
        const iconNode = document.createElement('i');

        // ----------------------------------
        //  ADD META-DATA & INNER TEXT
        // ----------------------------------
        formNode.action = '#'; 
        formNode.method = 'get';
        inputNode.type = 'search';
        inputNode.id = 'search-input';
        inputNode.className = 'search-input';
        inputNode.placeholder = 'Search Name . . . ';
        submitNode.type = 'submit';
        submitNode.id = 'search-submit';
        submitNode.class = 'search-submit';
        iconNode.className = 'fas fa-search';

        // ----------------------------------
        //  APPEND TO DOM
        // ----------------------------------
        // <form action="#" method="get">
        //     <input type="search" id="search-input" class="search-input" placeholder="Search...">
        //     <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit fas fa-camera">
        // </form>
        submitNode.append(iconNode);
        formNode.append(inputNode, submitNode);
        searchContainerNode.append(formNode);
        this.formDOM = document.querySelector('form'); // saves the Node to be used in Event.Listeners
    }

    /** GENLISTENERS() STRUCTURE:
     * 1.) Adds click event to each Person Card
     * 2.) Adds click event to the Page
     *      a.) if search bar is clicked
     *      b.) if click is made while MODAL is active
     * 3.) Adds click event to Search Form Search BTN on 'Submit' 
     */
    genListeners() {
        // ----------------------------------
        //  1.) ACTIVATES MODAL
        // ----------------------------------

        /**
         * The HTML Nodes are Linked to their respective Person Object via <data-object: person-${index}>
         * - if the Event.target.data.object = persons.person.index, then that Person was the person 'clicked' and:
         *  - Person clicked is made 1.) active, 2.) activatesModal(), 3.) activeModal = True
         */
        personNodes[0].forEach(node => {
            node.addEventListener('click', (event) => {
                let targetAttribute = event.target.getAttribute('data-object'); 
                this.persons.forEach(person => {
                    if(targetAttribute === person.index) { // if the <data-object: person-[]> = target
                        this.activePerson = person;
                        this.activePerson.active = true;
                        this.activePerson.activateModal();
                        this.activeModal = true;
                    }
                });
            });
        });

        // ----------------------------------
        //  2.) PAGE CLICK EVENT
        // ----------------------------------
        /**
            * Handles all CLICK events on the Page
            *   - a.) if Search Bar is clicked
            *   - b.) if there is a click when Modal is Active
        */
        document.addEventListener('click', (event) => {
            const target = event.target;
            // ----------------------------------
            //  1.) SEARCH BEHAVIOR ON CLICK, for deleting results
            // ----------------------------------
            if(target === this.formDOM.firstChild) { // if the form's input is clicked
                if(event.target.value.length > 0) { // i.e. if there is input text
                    this.formDOM.firstChild.addEventListener('input', () => { // if the input is changed
                        if(this.formDOM.firstChild.value.length < 1) { // if the input is empty
                            this.filter = ''; // reset the filter results to filter nothing
                            this.refreshPage(); // reset the page
                        }
                    });
                }
            }
            
            // ----------------------------------
            //  2.) DEACTIVATES MODAL
            // ----------------------------------
            
            if(this.activeModal) {
                let targetAttribute = ''; // the data.object attribute of the thing clicked
                let activeAttribute = ''; // the current Modal's data.object attribute 

                if (target.hasAttribute('data-object')) {
                    targetAttribute = target.getAttribute('data-object'); 
                }  

                if (this.activePerson !== null) {
                    activeAttribute = this.activePerson.index;
                }

                // if the `close-btn` is clicked, or something other than the modal was clicked, close Modal
                if(target.id === 'modal-close-btn' || targetAttribute !== activeAttribute) {
                    this.activePerson.active = false;
                    this.activePerson.activateModal();
                    this.activePerson = null;
                    this.activeModal = false;
                }

                // if the modal next/prev buttons or icons are clicked
                if(target.id === 'modal-prev' || target.id === 'prev-icon') {
                    this.changeModal(-1); // move -1 in modal array index
                } else if (target.id === 'modal-next' || target.id === 'next-icon') {
                    this.changeModal(1); // move +1 in modal array index
                }
            }
        });   

        // adds a listener to the form
        this.formDOM.addEventListener('submit', (event) => {
            const input = this.formDOM.querySelector('input:first-of-type');
            const value = input.value;
            
            this.filter = value.toLowerCase();
            this.refreshPage();
            event.preventDefault();
        });

    } // end of gen Listeners

    /**
     * Refreshes the page, clears all cards, then recalls genGallery()
     */
    refreshPage() {
        const cards = document.querySelectorAll('.card');
            
        cards.forEach(card => {
            card.remove();
        });

        this.genGallery();
    }

    /**
     * - Makes the active modal either the next person, or the previous person
     * @param {integer} direction | refers the the direction of the `this.filteredPersons[]` index, either +1 or -1
     */
    changeModal(direction) {
        for (let i = 0; i < this.filteredPersons.length; i++) {
            const person = this.filteredPersons[i];
            if(person === this.activePerson && this.filteredPersons.length > 1) {
                const currentIndex = this.filteredPersons.indexOf(person);
                let newIndex = currentIndex + direction;

                if(newIndex === -1) { // if at the beginning
                    newIndex = this.filteredPersons.length - 1; // return to the end
                } else if (newIndex === this.filteredPersons.length) { // if at the end
                    newIndex = 0; // return to the beginning
                } 
             
                this.activePerson.active = false;
                this.activePerson.activateModal();
                this.activePerson = this.filteredPersons[newIndex];
                this.activePerson.active = true;
                this.activePerson.activateModal();
                i = this.filteredPersons.length; // method ends once a Modal is changed
            }
        }
    }
}