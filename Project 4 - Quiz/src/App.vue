<template>
  <div>
    <PlacarPontuacao :contadorVitorias="this.contadorVitorias" :contadorDerrotas="this.contadorDerrotas" />
    <h1 v-html="this.pergunta"></h1>
    <template 
      v-for="(resposta,index) in respostas"
      :key="index"
    >
      <input
        :disabled="this.respostaSubmetida"
        type="radio" 
        name="options" 
        :value="resposta"
        v-model="this.respostaEscolhida"
      >
      <label v-html="resposta"></label><br>
    </template>
    <button 
      class="send" 
      type="button"
      @click="this.submitResposta()"
      v-if="!this.respostaSubmetida"
    >Confirmar</button>
    <button 
      class="send" 
      type="button"
      @click="this.getNovaQuestao()"
      v-else
    >Próxima pergunta</button>
    <section class="result" v-if="this.respostaSubmetida">
      <h4 
        v-if="this.respostaEscolhida == this.respostaCorreta"
        v-html="'&#9989; Parabéns, a resposta '+this.respostaCorreta+' está correta.'">
      </h4>
      <h4 v-else
        v-html="'&#10060; Que pena, a resposta está errada. A resposta correta é '+this.respostaCorreta+'.'">
      </h4>
    </section>
  </div>
</template>


<script>
import PlacarPontuacao from './components/PlacarPontuacao.vue'

export default {
  name: 'App',
  components: {
    PlacarPontuacao
  },
  data(){
    return {
      pergunta: undefined,
      respostas: [],
      respostaCorreta: undefined,
      respostaEscolhida: undefined,
      respostaSubmetida: false,
      contadorVitorias: 0,
      contadorDerrotas: 0,
    }
  },
  created(){
    this
    .axios.get("https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple")
    .then((response) => {
      this.pergunta = response.data.results[0].question
      this.respostas = response.data.results[0].incorrect_answers
      this.respostaCorreta = response.data.results[0].correct_answer
      this.respostas.splice(Math.round(this.respostas.length*Math.random()),0,this.respostaCorreta)
    })
  },
  methods:{
    submitResposta(){
       if (!this.respostaEscolhida){
         alert("Escolha uma das opções")
       }else{
         this.respostaSubmetida = true
         if (this.respostaEscolhida == this.respostaCorreta){
            this.contadorVitorias++
         }else{
            this.contadorDerrotas++
         }
       }
    },
    getNovaQuestao(){
      this.respostaSubmetida = false
      this.respostaEscolhida = undefined
      this.axios.get("https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple")
        .then((response) => {
          this.pergunta = response.data.results[0].question
          this.respostas = response.data.results[0].incorrect_answers
          this.respostaCorreta = response.data.results[0].correct_answer
          this.respostas.splice(Math.round(this.respostas.length*Math.random()),0,this.respostaCorreta)
    })
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
input[type=radio] {
    margin: 12px 4px;
}
button.send {
    margin-top: 12px;
    height: 40px;
    min-width: 120px;
    padding: 0 16px;
    color: #fff;
    background-color: #1867c0;
    border: 1px solid #1867c0;
    cursor: pointer;
}
section {
    display: block;
}
</style>
