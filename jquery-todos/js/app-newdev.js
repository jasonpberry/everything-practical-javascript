
/*global jQuery, Handlebars, Router */
jQuery(function ($) {
	'use strict';

	Handlebars.registerHelper('eq', function (a, b, options) {
		return a === b ? options.fn(this) : options.inverse(this);
	});

	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;

	var util = {
		uuid: function () {
			/*jshint bitwise:false */
			var i, random;
			var uuid = '';

			for (i = 0; i < 32; i++) {
				random = Math.random() * 16 | 0;
				if (i === 8 || i === 12 || i === 16 || i === 20) {
					uuid += '-';
				}
				uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
			}

			return uuid;
		},

		
		store: function (namespace, data) {
			// if (arguments.length > 1) {
			// 	return localStorage.setItem(namespace, JSON.stringify(data));
			// } else {
			// 	var store = localStorage.getItem(namespace);
			// 	return (store && JSON.parse(store)) || [];
			// }

			var fakeDataArray = [];
			
			var toggleCompleted = false;
			for(var i = 0; i < 5; i++) {
				var fakeDataObject = {
					id: util.uuid(),
					completed: !toggleCompleted,
					title: 'fake data ' + i
				}
				toggleCompleted = !toggleCompleted;
				fakeDataArray.push(fakeDataObject);				
			}
			return fakeDataArray;
		}
	};

	var App = {
		init: function() {
			this.todos = util.store('todos-jquery');
			this.todoTemplate = Handlebars.compile($('#todo-template').html());
			this.footerTemplate = Handlebars.compile($('#footer-template').html());
			this.bindEvents();
			debugger;
			new Router({
				'/:filter': function (filter) {
					// debugger;
					console.log('the filter is ', filter);
					this.filter = filter;
					this.render();
				}.bind(this)
			}).init('/all');
		},
		
		bindEvents : function() {
			$('#new-todo').on('keyup', this.create);
			
			$('#todo-list')
			.on('click', '.destroy', this.destroy.bind(this))
			.on('click', '.toggle', this.toggle.bind(this));
		},
		
		render: function() {
			var todos = this.getFilteredTodos();
			$('#todo-list').html(this.todoTemplate(todos));
			$('#main').toggle(todos.length > 0);
			this.renderFooter();
			util.store('todos-jquery', this.todos);
		},
		renderFooter : function() {

			var todoCount = this.todos.length;
			var activeTodoCount = this.getActiveTodos().length;
			
			var template = this.footerTemplate({
				activeTodoCount : activeTodoCount,
				completedTodos:  todoCount - activeTodoCount,
				filter: this.filter
				
			});
			
			$('#footer').toggle(todoCount > 0).html(template);			
			
		},
		
		getActiveTodos: function () {
			return this.todos.filter(function (todo) {
				return !todo.completed;
			});
		},

		getCompletedTodos: function () {
			return this.todos.filter(function (todo) {
				return todo.completed;
			});
		},
		create: function(e) {
			console.log('im in the create function');
			// console.log('this is ---> ' , this);
			var input = $(e.target);
			var val = input.val().trim();
			// console.log('user is typing to create ' + val);

			if(event.which === ESCAPE_KEY) {
				input.val('');
				return;
			}

			if(event.which != ENTER_KEY) {
				return;
			}

			// console.log('i got here lets create the event');
			this.todos.push({
				id: util.uuid(),
				completed: false,
				title: val
			});
			input.val('');
			this.render();
		},
		
		toggle : function(e) {

			// var i = this.indexFromEl(e.target);
			// this.todos[i].completed = !this.todos[i].completed;
			// this.render();
			var id = this.indexFromEl(e.target);
			this.todos[id].completed = !this.todos[id].completed;
			this.render();

		},
		destroy : function(e) {
			var i = this.indexFromEl(e.target);
			this.todos.splice(i, 1);
			this.render();
		},
		
		indexFromEl : function(el) {
			var id = $(el).closest('li').data('id');
			var todos = this.todos;
			var i = todos.length;
			
			while(i--) {
				if(id === this.todos[i].id) {
					console.log(i);
					return i;
				}
			}
		},
		
		getFilteredTodos: function() {
			if(this.filter === 'completed') {
				return this.getCompletedTodos();
			}
			if(this.filter === 'active') {
				return this.getActiveTodos();
			}
			//  return all of them
			return this.todos;
		},
		
		getActiveTodos : function() {
			return this.todos.filter(function(todo) {
				// console.log('jesus', todo);
				return !todo.completed;
			});
		},
		getCompletedTodos : function() {
			return this.todos.filter(function(todo) {
				// console.log('jesus', todo);
				return todo.completed;
			});
		}
	}

	App.init();
});
