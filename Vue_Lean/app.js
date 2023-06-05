const app = Vue.createApp({
    data() {
        return {
            firstName: '',
            lastName: '',
            gender: '',
            picture: '',
            liked: [],
            disliked: [],
            animationClass: ''
        };
    },
    methods: {
        async getUser() {
            const res = await fetch('https://randomuser.me/api');
            const { results } = await res.json();

            this.firstName = results[0].name.first;
            this.lastName = results[0].name.last;
            this.gender = results[0].gender;
            this.picture = results[0].picture.large;
            this.animationClass = this.animationClass === 'like' ? 'fade-in-right' : 'fade-in-left';
        },
        addToLiked() {
            this.liked.push({
                firstName: this.firstName,
                lastName: this.lastName,
                gender: this.gender,
                picture: this.picture
            });
            this.animationClass = 'like';
            setTimeout(() => { this.getUser(); }, 2000);
        },
        addToDisliked() {
            this.disliked.push({
                firstName: this.firstName,
                lastName: this.lastName,
                gender: this.gender,
                picture: this.picture
            });
            this.animationClass = 'dislike';
            setTimeout(() => { this.getUser(); }, 2000);
        }
    },
    created() {
        this.getUser();
    }
});

app.mount('#app');
