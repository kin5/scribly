scribly
=======

Scribly is a javascript object made to allow for the dynamic creation of editable text elements within a webpage. It includes storing the values of the edited fields in the `sessionStorage` to send back to the server (yourself). Give the user control over their content and information.

Purpose
=======

I created scribly because I found myself wanting an easy way to make inline text elements editable without utilizing `contenteditable`. A specific scenario in which scribly is helpful would be a users profile on a social-based website. Using scribly you can provide a button for the user to click that will allow them to easily edit their information, inline, without sending them to a new page or an editor. It's fast, simple and easy for both you and your users.

Features
========

Methods
-------

##### edit(*selector*, *inputType*, *parent*)
  * `selector`
   * a CSS selector used to select the element(s) you want to become editable
  * `inputType`
   * the method of input for the editable element, defaults to text. currently the options (with acceptable parameter values highlighted) are:
     * `text` input element
     * `textarea` element
     * select element created by passing an array of strings for options, like: `['option1', 'option2']`
  * `parent`
   * a DOM element used to limit the selector search to only children of that element. defaults to the document
 
##### save(*parent*, *callback*)
  * `parent`
   * a DOM element used to save only children of that element. defaults to document
  * `callback`
   * a callback function to handle the saved data from the sessionStorage

##### cancel(*parent*)
  * `parent`
   * a DOM element used to cancel only children of that element. defaults to document

Use
===

Say you want every `p` element to become editable when a user presses a button, and then saves when the user presses a save button. You would do:
```HTML
<button onclick="scribly.edit('p')">Edit</button>
<button onclick="scribly.save()">Save</button>
```
This code will generate input boxes with a type of text to replace the `innerHTML` property of every element with a `p` tag. When the save button is pressed, scribly will store the newly edited text in the `sessionStorage` using the method described above and update the `innerHTML` of the elements that were edited.

If you would like every `p` element to become editable via a `select` element, you would do so by passing an array of strings for the `inputType` parameter. The strings would then be used to create `option` elements to populate the `select` element. A string is used to provide its respective `option` element with a value and inner text. You could provide a button like this one:
```HTML
<button onclick="scribly.edit('p', ['option1', 'option2'])">Edit</button>
```
This would turn every `p` element into a `select` element populated with `option` elements whose value and text derive from the elements current value and the array you pass in.

To provide the user with an option to opt-out of their current edits, you could provide a cancel button:
```HTML
<button onclick="scribly.cancel()">Cancel</button>
```
This will reset all editable elements and their `innerHTML` providing no changes. It will also not store any of the edits.

Scribly also provides functionality for editing, cancelling and saving certain elements while leaving others unaffected by passing a DOM element to the `parent` parameter (note this is not a practical use, as this would not allow the user any time for editing; just an example of the parent parameter).
```javascript
var div1 = document.getElementById('div1');
scribly.edit('p', 'text', div1); //to edit 
scribly.save(div1); //to save
scrible.cancel(div1); //to cancel
```
This would edit, save, and cancel elements that are only in `div1`, leaving any others open for editing. 
