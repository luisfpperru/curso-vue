<template>
    <section class="score"> 
        Jogador 
        <span> 
            {{this.contadorVitorias}} 
        </span> 
            x 
        <span> 
            {{this.contadorDerrotas}}
        </span> 
        Computador 
    </section>
</template>

<script>
export default {
    name: "PlacarPontuacao",
    props: ['contadorVitorias','contadorDerrotas']
}

</script>

<style lang="scss">
section.score {
    border-bottom: 1px solid black;
    padding: 24px;
    font-size: 18px;
}
section.score span {
    padding: 8px;
    font-weight: bold;
    border: 1px solid black;
}
</style>