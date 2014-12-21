scribly
=======

Scribly is a javascript object made to allow for the dynamic creation of editable text elements within a webpage. It includes storing the values of the edited fields in the `sessionStorage` to send back to the server (yourself). Use it to give the user control over their content without messing with the bulk of a CMS.

Features
========

The object comes with several methods:

* `edit(selector, inputType)`
  * provide the CSS selector of the element(s) that you want editable
  * use `text` or `textarea` for the inputType, defaults to `text`

* `save(parent)`
  * updates the elements text, saves the edited portions to the `sessionStorage`
  * provide a parent element (must be HTML element object) to search through or leave blank to save all within the document

* `close(parent)`
  * reverts the elements back to their original state, saves no edits
  * provide a parent element (must be HTML element object) to search through or leave blank to save all within the document

Use
===

Say you want every `p` element to become editable when a user presses a button, and then saves when the use presses a save button. You would do:
```HTML
<button onclick="scribly.edit('p')">Edit</button>
<button onclick="scribly.save()">Save</button>
```
This code will generate input boxes with a type of text to replace the `innerHTML` property of every element with a `p` tag. When the save button is pressed, scribly will store the newly edited text in the `sessionStorage` and update the `innerHTML` of the elements that were edited.

To provide the user with an option to opt-out of their current edits, you could provide a cancel button:
```HTML
<button onclick="scribly.cancel()">Cancel</button>
```
This will reset all editable elements and their `innerHTML` providing no changes. It will also not store any of the edits.

Scribly also provides functionality for cancelling or saving certain editable elements while leaving others open by passing a DOM element to the `parent` parameter.
```javascript
var div1 = document.getElementById('div1');
scribly.save(div1);
```
This would save all of the editable elements only in `div1`, leaving any others open for editing.
