<template>
    <div class="home">
        <img class="logo" src="../assets/btg-logo.png" />
        <button @click="$router.push('/match')">Match Play Scorecard</button>
        <button @click="$router.push('/stroke')">Stroke Play Scorecard</button>
        <button @click="discord()">NTM Tour Discord</button>
    </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    discord: function(){
        window.open('http://discord.bigtournament.golf', '_blank');
    }
  },
  created() {
    document.body.style.backgroundColor = '#222222';
  }
}
</script>

<style scoped>
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.logo {
    margin-top: 45px;
    margin-bottom: 25px;
    width: 450px;
}

button {
    background-color: #333; 
    color: #fff;
    border: solid 1px #444;
    padding: 8px;
    font-size: 16px;
    margin-bottom: 16px;
    width: 300px;
}
button:hover {
    border: solid 1px #888;
}
button:active {
    background-color: rgb(3, 88, 15);
}
button:focus {
    outline: none;
}
</style>
