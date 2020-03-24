Vue.component('user', {
	props: ['name', 'lastName'],
	data: function(){
		return {
			app: {
				name: 'Aprendible'
			}
		}	
	},
	template: `<div>
		<h1>Usuario de {{ app.name }}</h1>
		<h2>{{ name }} {{ lastName }}</h2>
		<input v-model="name"/>	
		<input v-model="app.name"/>	
	</div>`
});

Vue.component('tasks', {
	template: `<section class="todoapp">
				<header class="header">
				<h1>Tareas</h1>
				<input @keyup.enter="add" type="text" v-model="newTask" class="new-todo" placeholder="Introduzca una tarea nueva">
				</header>
				<section>
				<ul class="todo-list">
					<li class="todo" is="task" v-for="task in tasks" :task="task"></li>
				</ul>
				</section>
				<footer class="footer" v-show="tasks.length">
					<span class="todo-count">Tareas completas: {{ completed }} | Tareas incompletas: {{ incompleted }}</span>
					<span class="todo-count"></span>
				</footer>
				<p>{{ reverse }}</p>
				</section>`,
	data: function(){
		return {
			newTask: "",
			tasks: [
				{title: "Aprender Laravel", completed: true},
				{title: "Aprender js", completed: true},
				{title: "Aprender Vue", completed: false}
			]
		}
	},
	methods: {
		add: function(){
			if (this.newTask.length <= 1) return alert('La tarea no puede estar vacia');
			this.tasks.push({
				title: this.newTask,
				completed: false
			});
			this.newTask ="";
		},
	},
	computed:{
		completed: function(){
			return this.tasks.filter(function(task){
				return task.completed;
			}).length;
		},
		reverse: function() {
			return this.newTask.split('').reverse().join('');
		},


		incompleted: function(){
			return this.tasks.filter(function(task){
				return ! task.completed;
			}).length;
		}
	}
});

Vue.component('task', {
	props: ['task'],
	template: `<li :class="classes">
					<div class="view">
						<input class="toggle" type="checkbox" v-model="task.completed">
						<label v-text="task.title" @dblclick="edit()"></label>
						<button class="destroy" @click="remove()"></button>
					</div>
					<input class="edit" 
						v-model="task.title" 
						@keyup.enter="doneEdit()" 
						@blur="doneEdit()" 
						type="text"
						@keyup.esc="cancelEdit()"
						>
				</li>`,
	data: function(){
		return {
			editing: false,
			cacheBeforeEdit: ''
		}
	},
	methods: {
		edit: function(){
			this.cacheBeforeEdit = this.task.title;
			this.editing = true;
		},
		doneEdit: function(){
			if (! this.task.title){
				this.remove();
			}
			this.editing = false;
		},
		cancelEdit: function() {
			this.editing = false;
			this.task.title = this.cacheBeforeEdit;
		},
		remove: function () {
			var tasks = this.$parent.tasks;
			tasks.splice(tasks.indexOf(this.task),1);
		}
	},
	computed: {
		classes: function(){
			return {completed: this.task.completed, editing: this.editing};
		}
	}
});

var app = new Vue({
			el: '#app',


		});