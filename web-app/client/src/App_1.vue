<template>

    <div id="app" > <!-- Main Menu on the top-->  
        <!-- <nav v-bind:class="active" v-on:click.prevent> -->
        <nav v-bind:class="{ active: isActive }" v-on:click.prevent>
        <router-link to="/">Home</router-link>&nbsp;          
        <router-link to="/castBallot">Cast Ballot</router-link>&nbsp;
        <router-link to="/QueryAll">QueryAll</router-link>
        <router-link to="/queryWithQueryString">Query by Type</router-link>&nbsp;
        <router-link to="/queryByKey">Query by Key</router-link>&nbsp;
        <router-link to="/getCurrentStanding">Get Poll Standings</router-link>&nbsp;
        <router-link to="/">Sign Up/Login</router-link>&nbsp;

        </nav>
      <router-view></router-view>
    </div>
</template>

<script>

export default {
  name: 'app'  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.chart-wrapper {
  width: 100%;
  height: 1000px;
}
.echarts {
  width: 100%;
  height: 100%;
}

#loader {
  position:fixed;
  padding-top: 250px;
}

.chart-wrapper {
  position:fixed;
  padding-left:32%;
}
</style>

<style scoped>

*{
	margin:0;
	padding:0;
}

body{
	font:15px/1.3 'Open Sans', sans-serif;
	color: #5e5b64;
	text-align:center;
}

a, a:visited {
	outline:none;
	color:#389dc1;
}

a:hover{
	text-decoration:none;
}

section, footer, header, aside, nav{
	display: block;
}

/*-------------------------
	The menu
--------------------------*/

nav{
  width: 99.8%;
  display:inline-block;
	margin:auto;
	background-color:#0984e3; /*Background color*/
	box-shadow:0 1px 1px #2E4158;
	border-radius:2px;
}

nav a{
	display:inline-block;
	padding: 18px 30px;
	color:#fff !important;
	font-weight:bold;
	font-size:16px;
	text-decoration:none !important;
	line-height:1;
	text-transform: uppercase;
	background-color:transparent;

	-webkit-transition:background-color 0.25s;
	-moz-transition:background-color 0.25s;
	transition:background-color 0.25s;
}

nav a:first-child{
	border-radius:2px 0 0 2px;
}

nav a:last-child{
	border-radius:0 2px 2px 0;
}

nav.home .home,
nav.projects .projects,
nav.services .services,
nav.contact .contact{
	background-color:#e35885;
}

p{
	font-size:22px;
	font-weight:bold;
	color:#7d9098;
}

p b{
	color:#2E4158;
	display:inline-block;
	padding:5px 10px;
	background-color:#2E4158;
	border-radius:2px;
	text-transform:uppercase;
	font-size:18px;
}
.resource {
  margin: 20px 0;
}


</style>
