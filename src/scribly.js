var scribly = {
	
	storeLocally : true,

	editByTag : function(tag, inputType) {
		var elements = document.getElementsByTagName(tag);

		for(i=0; i<elements.length; i++) {
			window.localStorage.setItem(tag + '-' + i, elements[i].innerHTML);
			elements[i].setAttribute('data-sid', tag + '-' + i);
			elements[i].innerHTML = selectEditorInput(inputType, tag + '-' + i);
		}

		for(i=0; i<elements.length; i++) {
			document.getElementById(tag + '-' + i).value = window.localStorage.getItem(tag + '-' + i);
		}

	},
	editByClass : function(className, inputType) {
		var elements = document.getElementsByClassName(className);

		for(i=0; i<elements.length; i++) {
			window.localStorage.setItem(className + '-' + i, elements[i].innerHTML);
			elements[i].setAttribute('data-sid', className + '-' + i);
			elements[i].innerHTML = selectEditorInput(inputType, className + '-' + i);
		}

		for(i=0; i<elements.length; i++) {
			document.getElementById(className + '-' + i).value = window.localStorage.getItem(className + '-' + i);
		}
	},
	editById : function(id, inputType) {
		var element = document.getElementById(id);

		window.localStorage.setItem(id + '-0', element.innerHTML);
		element.setAttribute('data-sid', id + '-0');
		element.innerHTML = selectEditorInput(inputType, id + '-0');
		document.getElementById(id + '-0').value = window.localStorage.getItem(id + '-0');
	},
	save : function(parent) {
		if(parent != null) {
			var openElements = parent.getElementsByTagName('*');
		}
		else {
			var openElements = document.getElementsByTagName('*');
		}

		if(openElements.length > 1) {
			for(i=0; i<openElements.length; i++) {
				if(openElements[i].hasAttribute('data-sid')) {
					var sId = openElements[i].getAttribute('data-sid');
					var openElementInput = openElements[i].children[0];

					var sIdStoredValue = window.localStorage.getItem(sId);
					var sIdNewValue = openElementInput.value;

					if(sIdStoredValue != sIdNewValue) {
						window.localStorage.setItem(sId, sIdNewValue);
					}
					openElements[i].innerHTML = window.localStorage.getItem(sId);

					if(this.storeLocally == false) {
						window.localStorage.removeItem(sId);
					}
				}
			}
		}
		else {
			if(openElements.hasAttribute('data-sid')) {
				var sId = openElements.getAttribute('data-sid');
				var openElementInput = openElements.children[0];

				var sIdStoredValue = window.localStorage.getItem(sId);
				var sIdNewValue = openElementInput.value;

				if(sIdStoredValue != sIdNewValue) {
					window.localStorage.setItem(sId, sIdNewValue);
				}
				openElements[i].innerHTML = window.localStorage.getItem(sId);

				if(this.storeLocally == false) {
					window.localStorage.removeItem(sId);
				}
			}
		}
	},
	cancel : function(parent) {
		if(parent != null) {
			var openElements = parent.getElementsByTagName('*');
		}
		else {
			var openElements = document.getElementsByTagName('*');
		}

		for(i=0; i<openElements.length; i++) {
			if(openElements[i].hasAttribute('data-sid')) {
				var sId = openElements[i].getAttribute('data-sid');
				openElements[i].innerHTML = window.localStorage.getItem(sId);
				window.localStorage.removeItem(sId);
			}
		}
	}
};

function selectEditorInput(type, id) {
	if(type === 'text') {
		return '<input type="text" class="" id="' + id + '"/>';
	}
	else if(type === 'textarea') {
		return '<textarea class="" id="' + id + '"></textarea>';
	}
	else {
		//return a normal text input, catch all
		return '<input type="text" class="" id="' + id + '"/>';
	}
}