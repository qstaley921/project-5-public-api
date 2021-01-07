

class Gallery {
    constructor() {
        this.personCount = '12';
        this.persons = []; // will hold an array of Person Objects
        this.activePerson = null;
        this.activeModal = false;
    }

    // ----------------------------------
    //  METHODS
    // ----------------------------------

    fetchData() {
        fetch(`https://randomuser.me/api/?results=${this.personCount}&nat=us`)
            .then(response => response.json())
            // .then(data => console.log(data.results))
            .then(data => this.genPersons(data.results))
            .then(() => this.genGallery())
            .then(() => this.genSearch())
            .then(() => this.genListeners())
    }

    // ! Add a catch above, and then create an error report below 
    reportError() {

    }

    /**
     * - iterates through a JSON object and adds pertaining properties to a `new Person` object
     * - Then pushes the Person object to this.persons
     * @param {json} data | a JSON object from a FETCH request
     */
    genPersons(data) {
        // console.log(data);
        const json = data;
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
        this.persons.forEach(person => {
            galleryNode.appendChild(person.htmlNode);
        }); 
        personNodes.push(document.querySelectorAll('.card'));
    }

    /**
     * - adds an event listener to each '.CARD' Node from the global personNodes array, declared in `scripts.js`
     * - if the target === an interated Person from the personsObject array, that person becomes the gallery's `this.activePerson`
     */
    genListeners() {
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

        document.addEventListener('click', (event) => {
            const target = event.target;
            const targetAttribute = target.getAttribute('data-object');
            const activeAttribute = this.activePerson.index;
            console.log(target);
            if(this.activeModal) {
                if(target.nodeName === 'BUTTON' || targetAttribute !== activeAttribute) {
                    this.activePerson.active = false;
                    this.activePerson.activateModal();
                    this.activePerson = null;
                    this.activeModal = false;
                }
            }
        });
    } // end of gen Listeners

    genSearch() {

    }
}

