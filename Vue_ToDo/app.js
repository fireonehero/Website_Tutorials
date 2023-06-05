const app = Vue.createApp({
    data() {
      return {
        newTask: '',
        tasks: [],
        editIndex: null,
        editText: '',
        filter: 'all'
      };
    },
    computed: {
      filteredTasks() {
        if (this.filter === 'pending') {
          return this.tasks.filter(task => !task.done);
        } else if (this.filter === 'done') {
          return this.tasks.filter(task => task.done);
        }
        return this.tasks;
      }
    },
    methods: {
      addTask() {
        if (this.newTask.trim() !== '') {
          this.tasks.push({
            text: this.newTask,
            done: false
          });
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
      saveEdit(task, newText) {
        task.text = newText;
        this.editIndex = null;
      },
      cancelEdit() {
        this.editIndex = null;
      },
      clearAllTasks() {
        this.tasks = [];
      },
      setFilter(filter) {
        this.filter = filter;
      }
    }
  });
  
  app.component('edit-task', {
    props: {
      task: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        editedText: this.task.text
      };
    },
    methods: {
      saveEdit() {
        this.$emit('save', this.task, this.editedText);
      },
      cancelEdit() {
        this.$emit('cancel');
      }
    },
    template: `
      <div class="edit-task">
        <input v-model="editedText" @keyup.enter="saveEdit" @keyup.esc="cancelEdit">
        <button @click="saveEdit">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
    `
  });
  
  app.mount('#app');
  