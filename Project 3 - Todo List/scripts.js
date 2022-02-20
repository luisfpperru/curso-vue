const App = {
    data(){
        return {
            tarefas: [],
            newTarefa: {
                concluido: false
            }
        }
    },
    methods: {
        addTarefa: function(){
            if (this.newTarefa.texto){
                this.tarefas.push(this.newTarefa)
                this.newTarefa = {
                    concluido: false
                }
                localStorage.setItem("tarefas",JSON.stringify(this.tarefas))
            }else{
                alert("Tarefa não pode ser vazia")
            }
        },
        storeTarefas(){
            localStorage.setItem("tarefas",JSON.stringify(this.tarefas))
        }
    },
    created(){
        this.tarefas = localStorage.getItem("tarefas") 
        ? JSON.parse(localStorage.getItem("tarefas")) 
        : this.tarefas
    }
}

Vue.createApp(App).mount('#app')