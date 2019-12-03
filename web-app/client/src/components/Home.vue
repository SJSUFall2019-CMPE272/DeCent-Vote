    <script src="scripts/snippet-javascript-console.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js"></script>

<style src="../../dist/css/Main.css"></style>

<template>

  <div class="posts">
    <div class="AppAside">

</div>
    <div id="app" class="AppForm">

  <form v-on:submit="validateVoter">

            <!--div class="PageSwitcher">
                <router-link to="/" 
                id="PageSwitcher__Item--Active" class="PageSwitcher__Item">Sign In
                </router-link>
                <router-link exact to="/" id="PageSwitcher__Item--Active" class="PageSwitcher__Item">Sign Up</router-link>
              </div-->

            <div id="test">
  <!-- <h1 @mouseover="isHovering = true" 
      @mouseout="isHovering = false" >
    {{ isHovering ? "Woot! Hovered" : "Hover me " }}
  </h1>  -->
</div>
              
              <div class="FormTitle">
                  <router-link to="/" id="FormTitle__Link--Active" class="FormTitle__Link">Sign In</router-link> 
                  or <router-link exact to="/" id="FormTitle__Link--Active" class="FormTitle__Link">Sign Up</router-link>
              </div>

              <Route exact path="/" component={SignUpForm}>
              </Route>
              <Route path="/sign-in" component={SignInForm}>
              </Route>
      <router-view></router-view>



      <div class="FormField">
      <label class="FormField__Label" htmlFor="name">VOTER ID</label>
      <input type="text" class ="FormField__Input" v-model="loginData.voterId" placeholder="Enter your voter ID">
      <br>
      </div>
      <!--<input type="submit" value="Login">-->
      <div class="FormField">
      <button class="FormField__Button mr-20 CenterButton" value="Login">Sign In</button> 
      <!--link to="/" class="FormField__Link">Create an account</link-->
      </div>
      <span v-if="loginReponse">
        <p style="color:red">{{ loginReponse.data }}</p>
      </span>
      <br>
      <br>
    </form>
<!--=============================-->

    <form v-on:submit="registerVoter">
      <label class="FormField__Label" htmlFor="name">VOTER ID</label>
      <input class="FormField__Input" type="text" v-model="registerData.voterId" placeholder="Enter your voter ID">
      <br><br>
      <label class="FormField__Label" htmlFor="name">EMAIL ID</label>
      <input class="FormField__Input" type="text" v-model="registerData.registrarId" placeholder="Enter your email ID">
      <br><br>
      <label class="FormField__Label" htmlFor="name">FIRST NAME</label>
      <input class="FormField__Input" type="text" v-model="registerData.firstName" placeholder="Enter your first name">
      <br><br>
      <label class="FormField__Label" htmlFor="name">LAST NAME</label>
      <input class="FormField__Input" type="text" v-model="registerData.lastName" placeholder="Enter your last name">
      <br><br>
      <!-- <input type="submit" value="Register"> -->
      <button class="FormField__Button mr-20 CenterButton" value="Login">Sign Up</button> &nbsp;
      <!--link to="/" class="FormField__Link">Have an account already?</link-->
    </form>

    <br>
    <span v-if="registerReponse">
      <p style="color:red">{{ registerReponse.data }}</p>
    </span>
    <br>
    <br>
    <br>
    <vue-instant-loading-spinner id='loader' ref="Spinner"></vue-instant-loading-spinner>
        </div>

  </div>
</template>

<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";

export default {
  name: "response",
  data() {
    return {
      loginData: {},
      registerData: {},
      registerReponse: {
        data: ""
      },
      loginReponse: {
        data: ""
      }
    };
  },
  components: {
    VueInstantLoadingSpinner
  },
  methods: {
    async registerVoter() {

      await this.runSpinner();
      const apiResponse = await PostsService.registerVoter(
        this.registerData.voterId,
        this.registerData.registrarId,
        this.registerData.firstName,
        this.registerData.lastName
      );

      console.log(apiResponse);
      this.registerReponse = apiResponse;
      await this.hideSpinner();
    },

    async validateVoter() {
      await this.runSpinner();

      if (!this.loginData.voterId) {
        console.log("!thislogin");
        let response = 'Please enter a VoterId';
        this.loginReponse.data = response;
        await this.hideSpinner();
      } else {
        const apiResponse = await PostsService.validateVoter(
          this.loginData.voterId
        );
        console.log("apiResponse");
        console.log(apiResponse.data);

        if (apiResponse.data.error) {
          // console.log(apiResponse);
          console.log(apiResponse.data.error);
          this.loginReponse = apiResponse.data.error;
        } else {
          this.$router.push("castBallot");
        }

        console.log(apiResponse);
        this.loginReponse = apiResponse;
        // this.$router.push('castBallot')
        await this.hideSpinner();
      }
    },
    async runSpinner() {
      this.$refs.Spinner.show();
    },
    async hideSpinner() {
      this.$refs.Spinner.hide();
    }
  }
};


</script> <!-- Added by Manasa -->

<style scoped>

.posts {
  height: 100vh;
  display: flex;
  color: white;
}


.AppAside {
  width: 50%;
  background-color: #66DAC7;
}

.AppForm {
  width: 50%;
  background-color: #2E4158;
  padding: 25px 40px;
  overflow: auto;
}


.PageSwitcher {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10%;
}

.PageSwitcher__Item {
  background-color: #4C5D72;
  color: #9DA6B1;
  padding: 10px 25px;
  cursor: pointer;
  font-size: .9em;
  border: none;
  outline: none;
  display: inline-block;
  text-decoration: none;
}

.PageSwitcher__Item--Active {
  background-color: #5ED0C0;
  color: #2E4158;
}

.PageSwitcher__Item:first-child {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}
.PageSwitcher__Item:last-child {
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}

.FormCenter {
  margin-bottom: 100px;
}

.FormTitle {
  color: #707C8B;
  font-weight: 300;
  margin-bottom: 50px;
}

.FormTitle__Link {
  color: #707C8B;
  text-decoration: none;
  display: inline-block;
  font-size: 1.7em;
  margin: 0 10px;
  padding-bottom: 5px;
}

.FormTitle__Link:first-child {
  margin-left: 0;
}

.FormTitle__Link--Active {
  color: #2E4158;
  border-bottom: 1px solid #199087;
}

.FormField {
  margin-bottom: 40px;
}

.FormField__Input {
  width: 85%;
  background-color: transparent;
  border: none;
  color: white;
  outline: none;
  border-bottom: 1px solid #445366;
  font-size: 1em;
  font-weight: 300;
  padding-bottom: 10px;
  margin-top: 10px;
}

.FormField__Input::placeholder {
  color: #616E7F;
}

.FormField__Button {
    background-color: #52C4B9;
    color: white;
    border: none;
    outline: none;
    border-radius: 25px;
    padding: 15px 70px;
    font-size: .8em;
    font-weight: 500;
}

.FormField__Link {
  color: #66707D;
  text-decoration: none;
  display: inline-block;
  border-bottom: 1.5px solid #225E62;
  padding-bottom: 5px;
}

.FormField__CheckboxLabel {
  background-color: #646F7D;
  font-size: .9em;
}

.FormField__Checkbox {
  position: relative;
  top: 1.5px;
}

.FormField__TermsLink {
  color:#2E4158;
  border-bottom: 1px solid #199087;
  text-decoration: none;
  display: inline-block;
  padding-bottom: 2px;
  margin-left: 5px;
}

* {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
}


</style>

<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.min.js"></script>-->

<!--    <script type="text/javascript"> -->
