members = [
    {
        fname: 'John',
        lname: 'Lennon',
        instrument: 'Violão'
    },
    {
        fname: 'George',
        lname: 'Harrison',
        instrument: 'Guitarra'
    }
]

const handlingForms = {

    data() {
        return {
            members: window.members,
            novoMembro: {}
        }
    },
    methods: {
        addMembro: function (){
            if (this.novoMembro.fname && this.novoMembro.lname && this.novoMembro.instrument){
                this.members.push(this.novoMembro)
                this.novoMembro = {}
            }else{
                alert("Todos os campos devem ser preenchidos")
            }
        }
    }

};

Vue.createApp(handlingForms).mount('#app');
