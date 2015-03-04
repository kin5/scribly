var scribly = {

	//	selector: string. required. A CSS selector to choose which objects to edit
	//
	//	parent: DOM element. optional. The parent element to create editables in.
	//	Defaults to document
	//
	//	inputType: string or array. optional. The type of editable input to use with your element.
	//	Current options are an array for a select elements options, 'text' and 'textarea'. Defaults to 'text'
	edit: function(selector, inputType, parent) {
		var elements, parentElement, editSId, elementSId, elementSIdName, elementInput; //SId is short for Scribly ID

		if(arguments[1] != undefined && arguments[1].tagName) {
			parentElement = arguments[1];
			inputType = 'text';
		}
		else {
			parentElement = parent || document;
			inputType = inputType || 'text';
		}

    	if(arguments[0].tagName && arguments[0].parentNode === parentElement)
    		elements = [arguments[0]];
    	else
			elements = parentElement.querySelectorAll(selector);

		var i = 0;
		for(i=0; i<elements.length; i++) {

			//this section attempts to create a specific-as-possible
			//ID for Scribly to use when storing the data in the session
			if(elements[i].hasAttribute('id')) {
				elementSIdName = elements[i].getAttribute('id');
				editSId = 'edit-' + elementSIdName;
				elementSId = elementSIdName;
			}
			else if(elements[i].hasAttribute('class')) {
				elementSIdName = elements[i].getAttribute('class');
				editSId = 'edit-' + elementSIdName + '-' + i;
				elementSId = elementSIdName + '-' + i;
			}
			else {
				//if no id or class exists on the element, use tag
				elementSIdName = elements[i].tagName;
				editSId = 'edit-' + elementSIdName + '-' + i;
				elementSId = elementSIdName + '-' + i;
			}

			if(elements[i].hasAttribute('data-sid'))
				continue;

			window.sessionStorage.setItem(editSId, elements[i].innerHTML);
			elements[i].setAttribute('data-sid', elementSId);

			//this section decides which editable element
			//to place in the selected element(s)
			if(inputType === 'text') {
				elementInput = document.createElement('input');
				elementInput.setAttribute('type', 'text');
			}
			else if(inputType === 'textarea') {
				elementInput = document.createElement('textarea');
			}
			else if(inputType != null && Array.isArray(inputType)) {
				var optionNum, option;

				optionNum = inputType.length;

				elementInput = document.createElement('select');

				var j = 0;
				for(j=0; j<=inputType.length; j++) {
					option = document.createElement('option');

					if(j == 0) {
						option.setAttribute('selected', '');
						option.setAttribute('value', window.sessionStorage.getItem('edit-' + elementSId));
						option.innerHTML = window.sessionStorage.getItem('edit-' + elementSId);
					}
					else {
						option.setAttribute('value', inputType[j - 1]);
						option.innerHTML = inputType[j - 1];
					}
				
					elementInput.appendChild(option);
				}
			}
			elements[i].innerHTML = "";
			elements[i].appendChild(elementInput);
			elementInput.value = window.sessionStorage.getItem('edit-' + elementSId);
			
			//This is to enable you to make links editable
			//ran into a problem where clicking the input box would take you to the linked page
			//solution to current problem; no known issues YET
			elements[i].addEventListener("click", function(e) {
				e.preventDefault();
			});
		}
	},

	//	parent: optional. A DOM element. Defaults to the document
	//
	//	callback: optional. A callback function to be executed after elements new data
	//	is retrieved and stored in sessionStorage under its appropriate sID
	save: function(parent, callback) {
    	var openElements, sId, openElementInput, sIdStoredValue, sIdNewValue;

    	if(Object.prototype.toString.call(arguments[0]) == "[object Function]") {
    		callback = arguments[0];
    		parent = document;
    	}
    	else {
	    	callback = callback || function() {};
	    	parent = parent || document;
    	}

    	//can use a parent element object to sift through to decrease workload
    	//or to only save edited fields in a specific place while preserving others
		openElements = parent.getElementsByTagName('*');

		if(openElements.length > 1) {
			
			var i = 0;
			for(i=0; i<openElements.length; i++) {
				if(!openElements[i].hasAttribute('data-sid') || openElements[i].children.length == 0) {
					continue;
				}
				
				sId = openElements[i].getAttribute('data-sid');
				openElementInput = openElements[i].children[0];

				sIdStoredValue = window.sessionStorage.getItem('edit-' + sId);
				sIdNewValue = openElementInput.value;

				window.sessionStorage.setItem(sId, sIdNewValue);
				window.sessionStorage.removeItem('edit-' + sId);
				
				openElements[i].innerHTML = window.sessionStorage.getItem(sId);
				openElements[i].removeAttribute('data-sid');
				openElements[i].removeEventListener("click");
			}
		}
		else {
			if(openElements.hasAttribute('data-sid')) {
				sId = openElements.getAttribute('data-sid');
				openElementInput = openElements.children[0];

				sIdStoredValue = window.sessionStorage.getItem('edit-' + sId);
				sIdNewValue = openElementInput.value;

				window.sessionStorage.setItem(sId, sIdNewValue);
				window.sessionStorage.removeItem('edit-' + sId);

				openElements.innerHTML = window.sessionStorage.getItem(sId);
				openElements.removeAttribute('data-sid');
				openElements.removeEventListener("click");
			}
		}
		callback();
	},

	//	parent: optional. A DOM element. Defaults to the document
	cancel: function(parent) {
    	var openElements, sId;

    	parent = parent || document;

    	//parent capability similar to save
		openElements = parent.getElementsByTagName('*');

		var i = 0;
		for(i=0; i<openElements.length; i++) {
			if(openElements[i].hasAttribute('data-sid')) {
				sId = openElements[i].getAttribute('data-sid');
				openElements[i].innerHTML = window.sessionStorage.getItem('edit-' + sId);
				openElements[i].removeAttribute('data-sid');
				openElements[i].removeEventListener("click");
				window.sessionStorage.removeItem('edit-' + sId);
			}
		}
	}
};
