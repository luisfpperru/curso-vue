import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    produtos:[],
    produtosNoCarrinho: []
  },
  mutations: {
    loadProdutos(state,produtos){
      state.produtos = produtos
    },
    adicionarNoCarrinho(state,produto){
      state.produtosNoCarrinho.push(produto)
      localStorage.setItem("produtosNoCarrinho",JSON.stringify(state.produtosNoCarrinho))
    },
    removerDoCarrinho(state,idProduto){
      state.produtosNoCarrinho = state.produtosNoCarrinho.filter(item => idProduto != item.id)
      localStorage.setItem("produtosNoCarrinho",JSON.stringify(state.produtosNoCarrinho))
    },
    loadCarrinho(state,produtos){
      state.produtosNoCarrinho = produtos;
    }
  },
  actions: {
    loadProdutos({commit}){
      axios
      .get('https://fakestoreapi.com/products')
      .then(response => {
          commit('loadProdutos',response.data)
      })
    },
    adicionarNoCarrinho({commit},produto){
      commit('adicionarNoCarrinho',produto)
    },
    removerDoCarrinho({commit},idProduto){
      if (confirm('Tem certeza que deseja remover o produto do carrinho? ')){
        commit('removerDoCarrinho',idProduto)
      }
    },
    loadCarrinho({commit}){
      if (localStorage.getItem("produtosNoCarrinho")){
        commit('loadCarrinho',JSON.parse(localStorage.getItem("produtosNoCarrinho")))
      }
    }
  },
  modules: {
  }
})
