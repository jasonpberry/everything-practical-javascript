(function() {

	var App = {
		todos: this.todos || [],

		init: function() {
			this.initialDisplay = true;
			console.log('App Started, You can populate todos to get started....');
			this.displayTodos();
			// this.populate();
		},
		populate: function() {
			var initialBoolValue = false
				todoCount = this.getTodoCount();
			
			for (var i = todoCount; i < todoCount + 5; i++) {
				initialBoolValue = !initialBoolValue;
				var newTodoObject = {
					text: 'Todo number ' + i,
					isCompleted: !initialBoolValue
				};
				this.todos.push(newTodoObject);	
			}
			this.displayTodos();			
		},
		displayTodos: function() {

			if(!this.initialDisplay) {
				console.clear();
			}

			this.initialDisplay = false;

			var todoListUl = document.getElementById('todoListUl'),
				toggleAllTodosButton = document.getElementById('toggleAllTodosButton'),
				clearAllTodosButton = document.getElementById('deleteAllTodosButton');

			todoListUl.innerHTML = '';

			if (this.todos.length) {
				toggleAllTodosButton.removeAttribute('disabled');
				clearAllTodosButton.removeAttribute('disabled');

				this.todos.forEach(function displayingTodo(todo, index) {

					var li = document.createElement('li');
					
					if (todo.isCompleted) {
						li.innerHTML = '[ X ] - ' + todo.text + ' - <a href="" class="linkToggleTodo" data-id="' + index + '">Toggle</a>' + ' |  <a href="" class="linkRemoveTodo" data-id="' + index + '">Remove</a>';
						console.log('[ X ] - ' + todo.text);
					} else {
						li.innerHTML = '[  &nbsp;&nbsp;&nbsp; ] - ' + todo.text + ' - <a href="" class="linkToggleTodo" data-id="' + index + '">Toggle</a>' + ' |  <a href="" class="linkRemoveTodo" data-id="' + index + '">Remove</a>';
						console.log('[   ] - ' + todo.text);
					}
					todoListUl.appendChild(li);
				});
			} else {
				toggleAllTodosButton.setAttribute('disabled','disabled');
				clearAllTodosButton.setAttribute('disabled','disabled');
				console.log('There are no todos');
			}
		},
		getTodoCount: function() {
			return this.todos.length;
		},
		addTodo: function(todoText) {

			var newTodoField = document.getElementById('newTodoText'),
				newTodoText = newTodoField.value;

			if(newTodoText.length) {
				var newTodo = {
					text: newTodoText,
					isCompleted: false
				};
				this.todos.push(newTodo);
				newTodoField.value = '';
				this.displayTodos();
			}
			newTodoField.focus();

		},
		changeTodo: function(position, todoText, isCompleted) {
			this.todos[position].text = todoText;
			this.todos[position].isCompleted = isCompleted;
			this.displayTodos();
		},
		deleteTodo: function(position) {
			this.todos.splice(position, 1);
			this.displayTodos();
		},
		deleteAllTodos: function() {
			this.todos = [];
			this.displayTodos();
		},
		toggleCompleted: function(position) {
			if (position in Object.keys(this.todos)) {
				this.todos[position].isCompleted = !this.todos[position].isCompleted;
				this.displayTodos();
			} else {
				console.error('Position not in todo list');
			}
		},
		toggleAll: function() {
			var todos = this.todos,
				totalTodos = todos.length,
				completedTodos = 0;

			todos.forEach(function(todo) {
				if (todo.isCompleted) {
					completedTodos++;
				}
			});

			todos.forEach(function(todo) {
				// If all todos are complete. Make them incomplete.
				if (totalTodos === completedTodos) {
					todo.isCompleted = false;
				// Otherwise, make all todos complete
				} else {
					todo.isCompleted = true;
				}
			});
			this.displayTodos();
		}
	};

	// Populate Todos on button click
	var populateTodosButton = document.getElementById("populateTodosButton");
	// Toggle All on button click
	var toggleAllTodosButton = document.getElementById("toggleAllTodosButton");
	// Clear all todos
	var deleteAllTodosButton = document.getElementById("deleteAllTodosButton");
	// Add new todo
	var newTodoButton = document.getElementById	('addTodoButton');

	populateTodosButton.addEventListener("click", function() {  App.populate(); }, false);
	toggleAllTodosButton.addEventListener("click", function() { App.toggleAll(); }, false);
	deleteAllTodosButton.addEventListener("click", function() { App.deleteAllTodos(); }, false);
	newTodoButton.addEventListener('click', function() { App.addTodo() }, false );
	
	document.addEventListener('click', function (e) {
		var id = e.target.getAttribute("data-id");

		// Remove todo link clicked
		if (hasClass(e.target, 'linkRemoveTodo')) {
			App.deleteTodo(id);
		}

		// Toggle todo link clicked
		if(hasClass(e.target, 'linkToggleTodo')) {
			App.toggleCompleted(id);
		}
		e.preventDefault();

	}, false);

	function hasClass(elem, className) {
		return elem.className.split(' ').indexOf(className) > -1;
	}	

	window.App = App;
	window.App.init();


})();


