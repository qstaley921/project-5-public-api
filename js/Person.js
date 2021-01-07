

class Person {
    constructor (cell, dob, email, gender, location, name, img) {
        this.cell = cell; // string
        this.dob = dob; // object
        this.email = email; // string
        this.gender = gender; // string
        this.location = location; // object
        this.name = name; // object
        this.img = img; // object
        this.htmlNode = this.genHTML(); // object
    }

    genHTML() {
        // ----------------------------------
        //  CREATE ELEMENTS
        // ----------------------------------
        const cardNode = document.createElement('div');
        const imgContainerNode = document.createElement('div');
        const textContainerNode = document.createElement('div');
        const imgNode = document.createElement('img');
        const h3Node = document.createElement('h3');
        const pEmailNode = document.createElement('p');
        const pCapNode = document.createElement('p');

        // add meta-data
        cardNode.className = 'card';
        imgContainerNode.className = 'card-img-container';
        textContainerNode.className = 'card-img-container';
        imgNode.className = 'card-img';
        imgNode.src = `${this.img.large}`;
        imgNode.alt = 'profile picture';
        h3Node.className = 'card-name cap';
        h3Node.id = 'name';
        h3Node.innerText = `${this.name.first} ${this.name.last}`;
        pEmailNode.className = 'card-text';
        pEmailNode.innerText = `${this.email}`;
        pCapNode.className = 'card-text cap';
        pCapNode.innerText = `${this.location.city}, ${this.location.state}`;

        // append nodes together, from the inside out ...
        imgContainerNode.appendChild(imgNode);
        textContainerNode.appendChild(h3Node);
        textContainerNode.appendChild(pEmailNode);
        textContainerNode.appendChild(pCapNode);
        cardNode.appendChild(imgContainerNode);
        cardNode.appendChild(textContainerNode);

        return cardNode;
    }
   

}