

class Gallery {
    constructor() {
        this.personCount = '12';
        this.persons = []; // will hold an array of Person Objects
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
            this.persons.push(new Person(cell, dob, email, gender, location, name, img));
        }); 
    }

    // ! Add a catch above, and then create an error report below 
    reportError() {

    }

    genGallery() {
        this.persons.forEach(person => {
            galleryNode.appendChild(person.htmlNode);
        }); 
    }
}

