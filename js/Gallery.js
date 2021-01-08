

class Gallery {
    constructor(data) {
        this.json = data;
        this.persons = []; // will hold an array of Person Objects
        this.filteredPersons = []; // will hold an array of Person Objects that match search result
        this.activePerson = null;
        this.activeModal = false;
        this.formDOM = null;
        this.filter = '';
    }

    // ----------------------------------
    //  METHODS
    // ----------------------------------

    // ! Add a catch above, and then create an error report below 
    reportError() {

    }

    /**
     * - iterates through a JSON object and adds pertaining properties to a `new Person` object
     * - Then pushes the Person object to this.persons
     * @param {json} data | a JSON object from a FETCH request
     */
    genPersons() {
        // console.log(data);
        const json = this.json;
        let cell = '';
        let dob = null;
        let email = '';
        let gender = '';
        let location = null;
        let name = null;
        let img = null;
        json.forEach(person => {
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
        this.filteredPersons = []; // resets who is filtered upon loading
        this.persons.forEach(person => {
            const name = person.fullName.toLowerCase();
            if (name.includes(this.filter)) { // tests name against input.value (this.filter)
                galleryNode.appendChild(person.htmlNode); // appends only children who pass
                this.filteredPersons.push(person); // adds to a new list of filtered person Objects to be used for modal functionality
            } 
            
        }); 
        personNodes.push(document.querySelectorAll('.card')); // stores nodes once page is loaded, which is a global variable stored in 'scripts.js'
    }

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
        this.formDOM = document.querySelector('form');
    }

    /**
     * - adds an event listener to each '.CARD' Node from the global personNodes array, declared in `scripts.js`
     * - if the target === an interated Person from the personsObject array, that person becomes the gallery's `this.activePerson`
     */
    genListeners() {
        // ----------------------------------
        //  ACTIVATES MODAL
        // ----------------------------------
        personNodes[0].forEach(node => {
            node.addEventListener('click', (event) => {
                let targetAttribute = event.target.getAttribute('data-object');
                this.persons.forEach(person => {
                    if(targetAttribute === person.index) {
                        this.activePerson = person;
                        this.activePerson.active = true;
                        this.activePerson.activateModal();
                        this.activeModal = true;
                    }
                });
            });
        });

        // adds another event listener when the Modal is Active to close the modal on 'outside' click
        document.addEventListener('click', (event) => {
            const target = event.target;
            // ----------------------------------
            //  SEARCH BEHAVIOR ON CLICK, for deleting results
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
            //  DEACTIVATES MODAL
            // ----------------------------------
            let targetAttribute = '';
            let activeAttribute = '';

            // for closing modals
            if(this.activeModal) {

                if (target.hasAttribute('data-object')) {
                    targetAttribute = target.getAttribute('data-object');
                }  

                if (this.activePerson !== null) {
                    activeAttribute = this.activePerson.index;
                }

                if(target.id === 'modal-close-btn' || targetAttribute !== activeAttribute) {
                    this.activePerson.active = false;
                    this.activePerson.activateModal();
                    this.activePerson = null;
                    this.activeModal = false;
                }

                if(target.id === 'modal-prev' || target.id === 'prev-icon') {
                    this.changeModal(-1);
                } else if (target.id === 'modal-next' || target.id === 'next-icon') {
                    this.changeModal(1);
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

    changeModal(direction) {
        let complete = false;
        for (let i = 0; i < this.filteredPersons.length; i++) {
            const person = this.filteredPersons[i];
            if(person === this.activePerson && this.filteredPersons.length > 1) {
                const currentIndex = this.filteredPersons.indexOf(person);
                let newIndex = currentIndex + direction;

                if(newIndex === -1) {
                    newIndex = this.filteredPersons.length - 1;
                } else if (newIndex === this.filteredPersons.length) {
                    newIndex = 0;
                } 
             
                this.activePerson.active = false;
                this.activePerson.activateModal();
                this.activePerson = this.filteredPersons[newIndex];
                this.activePerson.active = true;
                this.activePerson.activateModal();
                i = this.filteredPersons.length;
            }
        }
    }
}