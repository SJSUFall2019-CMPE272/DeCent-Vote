<template>
  <form v-on:submit="validateVoter">
              
              <div class="FormTitle" @mouseover="isHovering = true" @mouseout="isHovering = false">
                  <router-link to="/sign-in" id="FormTitle__Link--Active" class="FormTitle__Link">Sign In</router-link> 
                  or <router-link exact to="/" id="FormTitle__Link--Active" class="FormTitle__Link">Sign Up</router-link>
              </div>

              <Route exact path="/" component={SignUpForm}>
              </Route>
              <Route path="/sign-in" component={SignInForm}>
              </Route>
      <router-view></router-view>




      <input type="text" v-model="loginData.voterId" placeholder="Enter VoterId">
      <br>

      <input type="submit" value="Login">
      <br>
      <br>
      <span v-if="loginReponse">
        <b>{{ loginReponse.data }}</b>
      </span>
      <br>
    </form>
</template>