var scribly = {

	//	selector: string. required. A CSS selector to choose which objects to edit
	//
	//	parent: DOM element. optional. The parent element to create editables in.
	//	Defaults to document
	//
	//	inputType: string. optional. The type of editable input to use with your element.
	//	Current options are 'text' and 'textarea'. Defaults to 'text'
	edit: function(selector, parent, inputType) {
		var elements, parentElement, editSId, elementSId, elementSIdName, elementInput; //SId is short for Scribly ID

		if(parent != null)
			parentElement = parent;
		else
			parentElement = document;

		elements = parentElement.querySelectorAll(selector);

		var i = 0;
		for(i=0; i<elements.length; i++) {

			//this section attempts to create a specific-as-possible
			//ID for Scribly to use when storing the data in the session
			if(elements[i].hasAttribute('id')) {
				elementSIdName = elements[i].getAttribute('id');
			}
			else if(elements[i].hasAttribute('class')) {
				elementSIdName = elements[i].getAttribute('class');
			}
			else {
				//if no id or class exists on the element, use tag
				elementSIdName = elements[i].tagName;
			}

			editSId = 'edit-' + elementSIdName + '-' + i;
			elementSId = elementSIdName + '-' + i;

			if(window.sessionStorage.getItem(editSId))
				continue;

			window.sessionStorage.setItem(editSId, elements[i].innerHTML);
			elements[i].setAttribute('data-sid', elementSId);

			//this section decides which editable element
			//to place in the selected element(s)
			if(inputType === 'text') {
				elementInput = document.createElement('input');
				elementInput.setAttribute('type', 'text');
				elementInput.setAttribute('id', elementSId);
			}
			else if(inputType === 'textarea') {
				elementInput = document.createElement('textarea');
				elementInput.setAttribute('id', elementSId);
			}
			else {
				elementInput = document.createElement('input');
				elementInput.setAttribute('type', 'text');
				elementInput.setAttribute('id', elementSId);
			}
			elements[i].innerHTML = "";
			elements[i].appendChild(elementInput);
			elementInput.value = window.sessionStorage.getItem('edit-' + elementSId);
		}
	},

	//	parent: optional. An HTML element. Defaults to the document
	save: function(parent) {
    	var openElements, sId, openElementInput, sIdStoredValue, sIdNewValue;

    	//can use a parent element object to sift through to decrease workload
    	//or to only save edited fields in a specific place while preserving others
		if(parent != null) {
			openElements = parent.getElementsByTagName('*');
		}
		else {
			openElements = document.getElementsByTagName('*');
		}

		if(openElements.length > 1) {
			
			var i = 0;
			for(i=0; i<openElements.length; i++) {
				if(!openElements[i].hasAttribute('data-sid') || openElements[i].children.length == 0) {
					continue;
				}
				
				elementSId = openElements[i].getAttribute('data-sid');
				sId = 's-' + elementSId;
				openElementInput = openElements[i].children[0];

				sIdStoredValue = window.sessionStorage.getItem('edit-' + elementSId);
				sIdNewValue = openElementInput.value;

				if(sIdStoredValue != sIdNewValue) {
					window.sessionStorage.setItem(sId, sIdNewValue);
					window.sessionStorage.removeItem('edit-' + elementSId);
				}
				openElements[i].innerHTML = window.sessionStorage.getItem(sId);
			}
		}
		else {
			if(openElements.hasAttribute('data-sid')) {
				elementSId = openElements[i].getAttribute('data-sid');
				sId = 's-' + elementSId;
				openElementInput = openElements.children[0];

				sIdStoredValue = window.sessionStorage.getItem('edit-' + elementSId);
				sIdNewValue = openElementInput.value;

				if(sIdStoredValue != sIdNewValue) {
					window.sessionStorage.setItem(sId, sIdNewValue);
				}
				openElements.innerHTML = window.sessionStorage.getItem(sId);
			}
		}
	},

	//	parent: optional. An HTML element. Defaults to the document
	cancel: function(parent) {
    	var openElements;

    	//parent capability similar to save
		if(parent != null) {
			openElements = parent.getElementsByTagName('*');
		}
		else {
			openElements = document.getElementsByTagName('*');
		}

		var i = 0;
		for(i=0; i<openElements.length; i++) {
			if(openElements[i].hasAttribute('data-sid')) {
				var sId = openElements[i].getAttribute('data-sid');
				openElements[i].innerHTML = window.sessionStorage.getItem('edit-' + sId);
				window.sessionStorage.removeItem('edit-' + sId);
			}
		}
	}
};