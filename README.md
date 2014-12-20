scribly
=======

Scribly is a javascript object made to allow for the dynamic creation of editable text elements within a webpage. It includes functionality for storing the values of the edited fields locally to send back to the server (yourself), or to opt-out of local storage all together.

Use
===

The object comes with one property and several methods:
* ```javascript
* storeLocally()
* ```
  * this tells scribly whether to store the edits in local storage
  * by default this is set to true

* `editByTag(tag, inputType)`
  * provide the HTML tag of the elements that you want editable
  * use `text` or `textarea` for the inputType, defaults to `text`

* `editByClass(class, inputType)`
  * provide the class selector of the elements you want editable

* `editById(id, inputType)`
  * provide the id selector of the element you want editable

* `save(parent)`
  * updates the elements text
  * provide a parent element (must be HTML element object) to search through or leave blank to save all within the document

* `close(parent)`
  * reverts the elements back to their original state, saves no edits
  * provide a parent element (must be HTML element object) to search through or leave blank to save all within the document
