const app = Vue.createApp({
    data() {
        return {
            newTask: '',
            tasks: [],
            editIndex: null,
            editText: '',
            currentFilter: 'all'
        }
    },
    methods: {
        addTask() {
            if (this.newTask) {
                this.tasks.push({ text: this.newTask, done: false });
                this.newTask = '';
            }
        },
        toggleDone(index) {
            this.tasks[index].done = !this.tasks[index].done;
        },
        editTask(index) {
            this.editIndex = index;
            this.editText = this.tasks[index].text;
        },
        saveEdit() {
            this.tasks[this.editIndex].text = this.editText;
            this.editIndex = null;
            this.editText = '';
        },
        clearAllTasks() {
            this.tasks = [];
        },
        filterTasks(filter) {
            this.currentFilter = filter;
        }
    },
    computed: {
        filteredTasks() {
            if (this.currentFilter === 'all') {
                return this.tasks;
            } else if (this.currentFilter === 'pending') {
                return this.tasks.filter(task => !task.done);
            } else if (this.currentFilter === 'done') {
                return this.tasks.filter(task => task.done);
            }
            return this.tasks;
        }
    }
});

app.mount('#app');
