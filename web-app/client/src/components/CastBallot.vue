<!--<style src="../../dist/css/Main.css"></style>-->
<style src="../assets/css/Main.css"></style>

<template>
  <div class="posts">
          <div class="AppAside">

<div class="torn" style="text-align:center;">
											<img class="imagetorn" src="./img/home.png" alt="">

</div>
          </div>

    <div id="app" class="AppForm" style="color:white">
    <h2>Cast Your Vote</h2>
        <br><br>

    <input type="radio" id="one" value="Republican" v-model="picked" >
    <label for="one"> Joe Biden </label>
    <a href="http://joebiden.com" target="_blank">
    <img class="logo" src="./Logos/JB.jpeg" alt="Joe Biden"></a>
    <br><br>
    <input type="radio" id="two" value="Democrat" v-model="picked">
    <label for="two"> Bernie Sanders </label>
    <a href="https://www.berniesanders.com" target="_blank">
    <img class="logo" src="./Logos/BS.jpeg" alt="Joe Biden"></a>
    <br><br>
    <input type="radio" id="two" value="Green" v-model="picked">
    <label for="two"> Elizabeth Warren </label>
    <a href="https://www.elizabethwarren.com" target="_blank">
    <img class="logo" src="./Logos/EW.jpeg" alt="Joe Biden"></a>
    <br><br>
    <input type="radio" id="two" value="Independent" v-model="picked">
    <label for="two"> Pete Buttigieg </label>
    <a href="https://www.peteforamerica.com" target="_blank">
    <img class="logo" src="./Logos/PB.jpeg" alt="Joe Biden"></a>
    <br><br>
    <input type="radio" id="two" value="Libertarian" v-model="picked">
    <label for="two"> Andrew Yang </label>
    <a href="https://www.yang2020.com" target="_blank">
    <img class="logo" src="./Logos/AY.jpeg" alt="Joe Biden"></a>
    <br><br>
    <br>
    <!-- <span v-if="picked" class="span_voter">
      Selected Party:
      <b>{{ picked }}</b>
    </span> -->
    <br>
    <br>
    <!--span><b>{{ response }}</b></span><br /-->
    <form v-on:submit="castBallot">
      <!-- <input type="text" value="2sww593dc034wb2twdk91r" v-model="input.electionId"  >
      <br>-->
      <label class="FormField__Label_Cast" htmlFor="name">Your Voter ID: </label>
      <input type="text" class="FormField__InputBox" v-model="input.voterId" placeholder="Enter VoterId">
      <br>
      <button button class="FormField__Button mr-20 BtnInsideCastBallot" type="submit" value="Cast Vote">
        Confirm your vote
      </button>
      <br>
    </form>

    <br>
    <span v-if="response">
      <b>{{ response }}</b>
    </span>
    <br>
    <vue-instant-loading-spinner id="loader" ref="Spinner"></vue-instant-loading-spinner>
  </div> <!--AppAside-->
      <!-- <div class="AppAside"></div> -->

  </div>
</template>

<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";

export default {
  name: "response",
  data() {
    return {
      input: {},
      picked: null,
      response: null
    };
  },
  components: {
    VueInstantLoadingSpinner
  },
  methods: {
    async castBallot() {
      await this.runSpinner();
      const electionRes = await PostsService.queryWithQueryString('election');
      let electionId = electionRes.data[0].Key;
      console.log("picked: ");
      console.log(this.picked);
      console.log("voterId: ");
      console.log(this.input.voterId);
      this.response = null;


      //error checking for making sure to vote for a valid party
      if (this.picked === null ) {
        console.log('this.picked === null')

        let response = "Pick a candidate to vote for!";
        this.response = response;
        await this.hideSpinner();
      
      } else if (this.input.voterId === undefined) {
        console.log('this.voterId === undefined')

        let response = "Enter your voterId to vote!";
        this.response = response;
        await this.hideSpinner();

      } else {

        const apiResponse = await PostsService.castBallot(
          electionId,
          this.input.voterId,
          this.picked
        );

        console.log('apiResponse: &&&&&&&&&&&&&&&&&&&&&&&');
        console.log(apiResponse);

        if (apiResponse.data.error) {
          this.response= apiResponse.data.error;
          await this.hideSpinner();
        } else if (apiResponse.data.message) {
          this.response= `Could not find voter with voterId ${this.input.voterId}
            in the state. Make sure you are entering a valid voterId`;
          await this.hideSpinner();
        } 
        else {
          let response = `Success. Your vote has been cast! `;

          this.response = response;

          console.log("cast ballot");
          console.log(this.input);
          await this.hideSpinner();
        }
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
</script>

<style scoped>

.posts {
  height: 100vh;
  display: flex;
  color: white;
}


.AppAside {
  width: 50%;
  /*background-color: #66DAC7;*/
  background-color: #4CA1AF;
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

.FormField__InputBox {
  font-weight: bold;
  width: 85%;
  background-color:transparent;
  border: none;
  color: white;
  outline: none;
  border-bottom: 1px solid #445366;
  font-size: 1em;
  padding-bottom: 10px;
  margin-top: 10px;
}

.FormField__Input::placeholder {
  color: #616E7F;
}

.FormField__Button {
    /*background-color: #52C4B9;*/
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

label{
  font-size: 25px;
}

.span_voter{
  font-size: x-large;
  color: #199987;
}

span{
  font-size: x-large;
  color:white;
}

input{
  size: 35px;
}

.BtnInsideCastBallot{
  font-size: 19px;
  margin-top:10%;
  margin-left: 25%;
}

.FormField__Label_Cast{
      display: block;
    /*text-transform: uppercase;*/
    font-size: 1em;
    color: white;
}

.AppAside{
  background-color: white;
  /* background-color: #4CA1AF */
    	/* background-image: linear-gradient(#2C3E50 , #3a6073); */

}

.logo {
  border: 0.2em #ddd;
  border-radius: 4px;
  /* padding: 5px; */
  width: 75px;
}

.logo:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}


</style>