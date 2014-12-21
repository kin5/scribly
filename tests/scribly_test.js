describe('scribly', function() {
	var parentElement = document.createElement('div');
	var element = document.createElement('p');
	var text = document.createTextNode('text to edit');

	element.setAttribute('id', 'p-id');
	element.setAttribute('class', 'p-class');
	element.appendChild(text);
	parentElement.setAttribute('id', 'div');
	parentElement.appendChild(element);

	describe('scribly.edit()', function() {

		it('should select elements by tag', function() {
			scribly.edit('p', parentElement);
		});

		it('should select elements by id', function() {
			scribly.edit('#p-id', parentElement);
		});

		it('should select elements by class', function() {
			scribly.edit('.p-class', parentElement);
		});

		it('should store elements current value in sessionStorage with an edit sId', function() {
			expect(window.sessionStorage.getItem('edit-p-id-0')).toEqual('text to edit');
		});

	});

	describe('scribly.save()', function() {

		it('should save all scribls', function() {
			scribly.save();
		});

		it('should save scribls in an element', function() {
			scribly.save(parentElement);
		});

		it('should store elements new value in sessionStorage with a final sId', function() {
			expect(window.sessionStorage.getItem('p-id-0')).toEqual(''); //because the input box contained no value, it will be empty
		})

	});

	describe('scribly.cancel()', function() {

		it('should cancel all scribls', function() {
			scribly.cancel();
		});

		it('should cancel scribls in an element', function() {
			scribly.cancel(parentElement);
		});

	});

});