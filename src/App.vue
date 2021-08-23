<template>
  <div class="row">
    <div class="col-8 background">
      <img
        style="height: 80vh; margin-top: 10vh"
        v-if="images"
        :src="images[0].large"
      />
    </div>
    <div class="col-4">
      <div class="row justify-content-center" style="height: 5vh">
        <div class="col-4 padding">
          <h2>Associated Tags</h2>
        </div>
        <div class="col-4 padding circle-position">
          <svg height="30" width="300">
            <circle
              cx="10"
              cy="10"
              r="7"
              stroke="black"
              stroke-width="2"
              fill="none"
            ></circle>
            <circle
              cx="30"
              cy="10"
              r="7"
              stroke="black"
              stroke-width="2"
              fill="none"
            ></circle>
            <circle
              cx="50"
              cy="10"
              r="7"
              stroke="black"
              stroke-width="2"
              fill="none"
            ></circle>
            <circle
              cx="70"
              cy="10"
              r="7"
              stroke="black"
              stroke-width="2"
              fill="none"
            ></circle>
            <circle
              cx="90"
              cy="10"
              r="7"
              stroke="black"
              stroke-width="2"
              fill="none"
            ></circle>
            <circle
              cx="110"
              cy="10"
              r="7"
              stroke="black"
              stroke-width="2"
              fill="none"
            ></circle>
            <circle
              cx="130"
              cy="10"
              r="7"
              stroke="black"
              stroke-width="2"
              fill="none"
            ></circle>
            <circle
              cx="150"
              cy="10"
              r="7"
              stroke="black"
              stroke-width="2"
              fill="none"
            ></circle>
          </svg>
        </div>
      </div>
      <div class="row justify-content-center" style="height: 4vh">
        <div class="col-1">
          <button type="button" class="btn btn-dark">Dark</button>
        </div>
        <div class="col-1">
          <button type="button" class="btn btn-dark">Dark</button>
        </div>
        <div class="col-1">
          <button type="button" class="btn btn-light">Dark</button>
        </div>
        <div class="col-1">
          <button type="button" class="btn btn-light">Dark</button>
        </div>
        <div class="col-1">
          <button type="button" class="btn btn-light">Dark</button>
        </div>
        <div class="col-1">
          <button type="button" class="btn btn-light">Dark</button>
        </div>
        <div class="col-1">
          <button type="button" class="btn btn-light">Dark</button>
        </div>
        <div class="col-1">
          <button type="button" class="btn btn-light">Dark</button>
        </div>
      </div>
      <br />
      <div class="row align-items-start">
        <div class="col-6">
          <h2>Tags</h2>
        </div>
      </div>
      <div
        class="row justify-content-center"
        style="height: 80vh; overflow: auto"
      >
        <div class="col-8">
          <div class="accordion" id="accordionPanelsStayOpenExample">
            <div
              class="accordion-item"
              v-for="(value, index) in tags"
              :key="index"
            >
              <h2
                class="accordion-header"
                :id="'panelsStayOpen-heading' + value"
              >
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#panelsStayOpen-collapse' + value"
                  aria-expanded="false"
                  :aria-controls="'panelsStayOpen-collapse' + value"
                >
                  {{ value }}
                </button>
              </h2>
              <div
                :id="'panelsStayOpen-collapse' + value"
                class="accordion-collapse collapse show"
                :aria-labelledby="'panelsStayOpen-heading' + value"
              >
                <div class="accordion-body background">
                  <span>1111</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="row justify-content-center" style="height: 5vh">
        <div class="col-2">
          <button type="button" class="btn btn-danger">Flag</button>
        </div>
        <div class="col-2">
          <button type="button" class="btn btn-success">Skip</button>
        </div>
        <div class="col-2">
          <button type="button" class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import dataFetch from "./api/dataFetching";

export default {
  name: "App",
  data() {
    return {
      tags: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      images: undefined,
    };
  },
  mounted() {
    dataFetch.getImages().then((result) => {
      this.images = result;
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.background {
  background-color: gray;
}

.padding {
  padding: 0;
}

.circle-position {
  height: 30px;
  margin-top: 10px;
}
</style>
