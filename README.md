# project-5-public-api
 Team Treehouse Public API Project 5

*This readme is a mere walkthrough of 1.) the components, and 2.) the order the components are run*

# The Components

## JavaScript.js Files
1. **scripts.js** | *Instantiates a `new Gallery()` object on Page Load*
2. **Gallery.js** | *a `class Gallery{}` instantiates `personCount` number of `new Person()` objects and appends those `Persons` to the DOM*
3. **Person.js**  | *a `class Person{}` adds all the properties to the person object*

## Gallery.js | Class Gallery {}
1. **`genPersons()`** | *creates a `new Person()` for each object in the `fetched()` JSON*
2. **`genGallery()`** | *appends the `Person()` to the DOM for each person*
3. **`genSearch()`** |  *generates a `<form>` node with `<input type='search'> inside*
4. **`genListeners()`** |   *adds event listeners to each of the dynamic elements on the DOM* 
5. **`refreshPage()`** |   *used when the `genSearch()` input is cleared; it removes the `Person.card` and runs `genGallery()` again*
6. **`changeModal()`** |  *Changes which Modal is active when using navigation buttons*

## Person.js | Class Person {}
1. **`genHTML()`** |  *creates the nodes which create the `<div class="card">` for the gallery*
2. **`genModal()`** |  *creates the nodes which create the <div class="modal"> for the gallery*
3. **`getDOB()`** |  *a smaller helper function which formats DOB*
4. **`activateMOdal()`** |  *appends the correct Modal to the DOM*

# The 'Flow' of the Program/Run Stack

## Step 1: Generate the Components
1. `scripts.js` **runs** a `fetch()` on `window.load` and sents the API JSON results to a `new Gallery(results)` object
2. `.then()` **runs** `gallery.genPersons()`
    - `gallery.genPersons()` **stores** a person object to `gallery.persons[]`
2. `.then()` **runs** `gallery.genGallery()` 
    - `.genGallery()` **appends** `Person.HTML` to DOM, `if()` the filter value is met
2. `.then()` **runs** `gallery.genSearch()`
    - `.genSearch()` **creates/appends** nodes to the DOM
2. `.then()` **runs** `gallery.genListeners()` 
    - `.genListeners()` **adds** listener events to the nodes 

## Step 2: Process Interactions 
1. `gallery.genLister()` Events: (there is only 1 actual `click` event; the following is nested within it)
    1. `click` event on `personHTMLNode` 
        - when clicked the `Person.activateModal()` **runs** and either appends or deletes the `modalHTML` 
    2. `click` event on `searchNode`
        - when the search bar is clicked ... 
            - if the input is changed after `click`, assume `x` results is clicked and **run** `Gallery.refreshPage()`
            - if `submit` event, change `Gallery.filter` value and **run** `Gallery.refreshPage()`
    3. `click` event on `document`
        - if `gallery.activeModal` is true, one of the correct behaviors will **run**
             - the Modal will close of `click` is beyond the Modal's `event.target`
             - the Modal will change to either the previous `person.modal` or the next based on which button was `clicked`, either button with ID `modal-prev` or `modal-next`. If either of these buttons is `clicked`, `gallery.changeModal()` **runs** and the rest is history. 

*That's it. That's the program. Simple enough. Way too messy. Until I know better, I'll strive just to make things work.*
