const app = Vue.createApp({
    data() {
        return {
            newTask: '',
            tasks: [],
            editIndex: null,
            editText: ''
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
        }
    }
});

app.mount('#app');
