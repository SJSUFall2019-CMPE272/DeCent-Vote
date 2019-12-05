<template>
  <div class="posts">
    
    <!-- <button v-on:click="getCurrentStanding()">Check Poll</button> -->

    <span v-if="response">
      <b>{{ response }}</b>
    </span>
    <vue-instant-loading-spinner id='loader' ref="Spinner"></vue-instant-loading-spinner>
    <div class="chart-wrapper">
      <h1 class="headinPoll" style="text-align: left;" v-on:click="getCurrentStanding()">Poll Standings</h1>
      <chart :options="chartOptionsBar"></chart>
    </div>
  </div>
</template>
<script>

import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  name: "response",
  data() {
    return {
      response: null,
      chartOptionsBar: {}
    };
  },
  components: {
    VueInstantLoadingSpinner
  },
  mounted: function(){
  //alert();
  getCurrentStanding();
  },
  methods: {
    async getCurrentStanding() {
      this.response = null;
      
      this.runSpinner();

      // console.log(`this.selected ${this.selected}`);
      const apiResponse = await PostsService.getCurrentStanding();
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%");
      console.log(apiResponse);
      console.log(apiResponse.data[0].Record);
      let currentStanding = [];
      for (let i = 0; i < apiResponse.data.length; i++) {
        currentStanding[i] = apiResponse.data[i].Record.count;
      }
      console.log("curStanding: ");
      console.log(currentStanding);

      this.chartOptionsBar = {
        
        xAxis: {
          data: [
            "Sanders",
            "Warren",
            "Buttigieg",
            "Yang",
            "Biden"

            // "Democrat",
            // "Green",
            // "Independent",
            // "Libertarian",
            // "Republican"
          ],
          gridLines: {
						display: true
						}
        },
        yAxis: {
          type: "value",
          gridLines: {
						display: true
            }   
        },
        series: [
          {
            type: "bar",
            data: currentStanding
          }
        ],
        title: {
          text: "2020 ",
          x: "center",
          textStyle: {
            fontSize: 24
          }
        },
        legend: {
					display: false
				},
        // pointBackgroundColor: 'white',
        borderWidth: 1,
				// pointBorderColor: '#249EBF',
        color: ["#2c3e50"],
        responsive: true,
        maintainAspectRatio: false,
        // height: 500,
        // width:500,
        tooltips: {
					enabled: true,
					mode: 'single',
					callbacks: {
						label: function(currentStanding, data) {
							return '$' + currentStanding.yLabel;
						}
					}
				},
      };
      // this.response = apiResponse.data;
      // this.renderChart(this.datacollection, this.options)
      this.hideSpinner();
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
.chart-wrapper{
      background-image: url("img/faded.jpeg");
      background-size: 100% 100%;
      background-repeat: no-repeat;
}

.headinPoll{
  padding-left: 10%;
}

/* .posts {
        background-image: url("img/faded.jpeg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
} */
</style>