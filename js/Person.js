

class Person {
    constructor (cell, dob, email, gender, location, name, img, index) {
        this.cell = cell; // string
        this.dob = dob; // object
        this.email = email; // string
        this.gender = gender; // string
        this.location = location; // object
        this.name = name; // object
        this.fullName = `${this.name.first} ${this.name.last}`;
        this.img = img; // object
        this.index = `person-${index}`;
        this.active = false;
        this.htmlNode = this.genHTML(); // HTML NODE 
        this.modalNode = this.genModal(); // HTML NODE
        this.modalDOM = null;
    }

    /**
     * - Creates HTML Nodes based on this.properties 
     * @return {HTML NODE OBJ} cardNode | stored in this.htmlNode
     */
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

        // ----------------------------------
        //  ADD META-DATA & INNER TEXT
        // ----------------------------------
        cardNode.className = 'card';
        cardNode.dataset.object = this.index;
        imgContainerNode.className = 'card-img-container';
        imgContainerNode.dataset.object = this.index;
        textContainerNode.className = 'card-img-container';
        textContainerNode.dataset.object = this.index;
        imgNode.className = 'card-img';
        imgNode.dataset.object = this.index;
        imgNode.src = `${this.img.large}`;
        imgNode.alt = 'profile picture';
        h3Node.className = 'card-name cap';
        h3Node.dataset.object = this.index;
        h3Node.id = 'name';
        h3Node.innerText = `${this.fullName}`;
        pEmailNode.className = 'card-text';
        pEmailNode.dataset.object = this.index;
        pEmailNode.innerText = `${this.email}`;
        pCapNode.className = 'card-text cap';
        pCapNode.dataset.object = this.index;
        pCapNode.innerText = `${this.location.city}, ${this.location.state}`;

        // ----------------------------------
        //  APPEND TO DOM
        // ----------------------------------
        // <div class="card">
        //     <div class="card-img-container">
        //         <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
        //     </div>
        //     <div class="card-info-container">
        //         <h3 id="name" class="card-name cap">first last</h3>
        //         <p class="card-text">email</p>
        //         <p class="card-text cap">city, state</p>
        //     </div>
        // </div>
        imgContainerNode.append(imgNode);
        textContainerNode.append(h3Node, pEmailNode, pCapNode);
        cardNode.append(imgContainerNode, textContainerNode);

        return cardNode;
    } // end of genHTML()
   
    /**
     * - Creates Elements, and appends those elements into an HTML Block
     * @returns {HTML NODE OBJ} modalContainerNode | stored in this.modalNode
     */
    genModal() {
        // ----------------------------------
        //  CREATE ELEMENTS
        // ----------------------------------
        const modalContainerNode = document.createElement('div');
        const modalNode = document.createElement('div');
        const btnNode = document.createElement('button');
        const strongNode = document.createElement('strong');
        const infoNode = document.createElement('div');
        const imgNode = document.createElement('img');
        const h3Node = document.createElement('h3');
        const pEmailNode = document.createElement('p');
        const pCityNode = document.createElement('p');
        const hRuleNode = document.createElement('hr');
        const pCellNode = document.createElement('p');
        const pLocationNode = document.createElement('p');
        const pDOBNode = document.createElement('p');
        const btnContainerNode = document.createElement('div');
        const prevNode = document.createElement('button');
        const nextNode = document.createElement('button');

        // ----------------------------------
        //  ADD META-DATA & INNER TEXT
        // ----------------------------------
        modalContainerNode.className = 'modal-container';
        modalContainerNode.dataset.object = `not-an-object`;
        modalNode.className = 'modal';
        modalNode.dataset.object = this.index;
        btnNode.type = 'button';
        btnNode.id = 'modal-close-btn';
        btnNode.className = 'modal-close-btn';
        btnNode.dataset.object = this.index;
        strongNode.innerText = 'X';
        strongNode.dataset.object = this.index;
        infoNode.className = 'modal-info-container';
        infoNode.dataset.object = this.index;
        imgNode.className = 'modal-img';
        imgNode.dataset.object = this.index;
        imgNode.src = `${this.img.large}`;
        imgNode.alt = 'profile-picture';
        h3Node.id = 'name';
        h3Node.dataset.object = this.index;
        h3Node.className = 'modal-name cap';
        h3Node.innerText = `${this.fullName}`;
        pEmailNode.className = 'modal-text';
        pEmailNode.dataset.object = this.index;
        pEmailNode.innerText = `${this.email}`;
        pCityNode.className = `modal-text cap`;
        pCityNode.dataset.object = this.index;
        pCityNode.innerText =  `${this.location.city}, ${this.location.state}`;
        pCellNode.className = 'modal-text';
        pCellNode.innerText = `${this.cell}`;
        pCellNode.dataset.object = this.index;
        pLocationNode.className = `modal-text`;
        pLocationNode.dataset.object = this.index;
        pLocationNode.innerText =  `${this.location.street.number} ${this.location.street.name}, ${this.location.city}, ${this.location.state} ${this.location.postcode}`;
        pDOBNode.className = 'modal-text';
        pDOBNode.dataset.object = this.index;
        pDOBNode.innerText = `Birthday: ${this.getDOB()}`;
        btnContainerNode.className = 'modal-btn-container';
        btnContainerNode.dataset.object = this.index;
        prevNode.type = 'button';
        prevNode.id = 'modal-prev';
        prevNode.className = 'modal-prev btn';
        prevNode.innerHTML = `<i data-object='${this.index}' id='prev-icon' class="fas fa-arrow-alt-circle-left"></i> Prev`; 
        prevNode.dataset.object = this.index; 
        nextNode.type = 'button';
        nextNode.id = 'modal-next';
        nextNode.className = 'modal-next btn';
        nextNode.innerHTML = `Next <i data-object='${this.index}' id='next-icon' class="fas fa-arrow-alt-circle-right"></i>`;
        nextNode.dataset.object = this.index;
        

        // ----------------------------------
        //  APPEND TO DOM - inside to out
        // ----------------------------------
        // <div class="modal-container">
        //         <div class="modal">
        //             <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        //             <div class="modal-info-container">
        //                 <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
        //                 <h3 id="name" class="modal-name cap">name</h3>
        //                 <p class="modal-text">email</p>
        //                 <p class="modal-text cap">city</p>
        //                 <hr>
        //                 <p class="modal-text">(555) 555-5555</p>
        //                 <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
        //                 <p class="modal-text">Birthday: 10/21/2015</p>
        //             </div>
        //         </div>
        //
        //         <div class="modal-btn-container">
        //             <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        //             <button type="button" id="modal-next" class="modal-next btn">Next</button>
        //         </div>
        // </div>
        
        infoNode.append(imgNode, h3Node, pEmailNode, pCityNode, hRuleNode, pCellNode, pLocationNode, pDOBNode);
        modalNode.append(btnNode, infoNode);
        btnContainerNode.append(prevNode, nextNode);
        modalContainerNode.append(modalNode, btnContainerNode);
        return modalContainerNode;
    } // end of genModal()

    // Reformats Date-of-birth
    getDOB() {
        const dob = this.dob.date;
        const year = dob.substring(0, 4);
        const month = dob.substring(5, 7); 
        const day = dob.substring(8, 10);
        return `${month}/${day}/${year}`;
    }

    // appends the modal to the document if this.active is true. Otherwise, removes it. 
    activateModal() {
        if (this.active) {
            galleryNode.insertAdjacentElement("afterend", this.modalNode);
            this.modalDOM = document.querySelector('.modal-container');
        } else {
            this.modalDOM.remove();
        }
    }

}