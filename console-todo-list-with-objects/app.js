(function() {

	var App = {
		todos: this.todos || [],

		init: function() {
			console.log('App Started');
			console.log('Populate Data');
			this.populate();
		},
		populate: function() {
			var initialBoolValue = false;
			var todoCount = this.getTodoCount();
			
			for (var i = todoCount; i < todoCount + 6; i++) {

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
			if (this.todos.length) {
				var todoListUl = document.getElementById('todoListUl');

				todoListUl.innerHTML = '';
				console.clear();

				this.todos.forEach(function displayingTodo(todo, index) {

					var li = document.createElement('li');
					
					if (todo.isCompleted) {
						li.innerHTML = '[ X ] - ' + todo.text;
						console.log('[ X ] - ' + todo.text);
					} else {
						li.innerHTML = '[ &nbsp; &nbsp;  ] - ' + todo.text;
						console.log('[   ] - ' + todo.text);
					}
					todoListUl.appendChild(li);

				});
			} else {
				console.log('There are no todos');
			}
		},
		getTodoCount: function() {
			return this.todos.length;
		},
		addTodo: function(todoText) {
			var newTodo = {
				text: todoText,
				isCompleted: false
			};
			this.todos.push(newTodo);
			this.displayTodos();
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
			var todos = this.todos;
			var totalTodos = todos.length;
			var completedTodos = 0;

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

	function modifyText() {
		alert('hi');
	}

	window.App = App;
	window.App.init();

	// Display Todos on button click
	var displayTodosButton = document.getElementById("displayTodosButton");
	displayTodosButton.addEventListener("click", function() { App.displayTodos(); }, false);

	// Toggle All on button click

	var ToggleAllTodosButton = document.getElementById("toggleAllTodosButton");
	ToggleAllTodosButton.addEventListener("click", function() { App.toggleAll(); }, false);


})();


