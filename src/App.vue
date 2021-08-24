<template>
  <div class="row">
    <div class="col-8 background">
      <img
        style="height: 80vh; margin-top: 10vh"
        v-if="images"
        :src="images[0].image.large"
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
              :fill="selectedTags.length > 0 ? 'black' : 'none'"
            ></circle>
            <circle
              cx="30"
              cy="10"
              r="7"
              stroke="black"
              stroke-width="2"
              :fill="selectedTags.length > 1 ? 'black' : 'none'"
            ></circle>
            <circle
              cx="50"
              cy="10"
              r="7"
              stroke="black"
              stroke-width="2"
              :fill="selectedTags.length > 2 ? 'black' : 'none'"
            ></circle>
            <circle
              cx="70"
              cy="10"
              r="7"
              stroke="black"
              stroke-width="2"
              :fill="selectedTags.length > 3 ? 'black' : 'none'"
            ></circle>
            <circle
              cx="90"
              cy="10"
              r="7"
              stroke="black"
              stroke-width="2"
              :fill="selectedTags.length > 4 ? 'black' : 'none'"
            ></circle>
            <circle
              cx="110"
              cy="10"
              r="7"
              stroke="black"
              stroke-width="2"
              :fill="selectedTags.length > 5 ? 'black' : 'none'"
            ></circle>
            <circle
              cx="130"
              cy="10"
              r="7"
              stroke="black"
              stroke-width="2"
              :fill="selectedTags.length > 6 ? 'black' : 'none'"
            ></circle>
            <circle
              cx="150"
              cy="10"
              r="7"
              stroke="black"
              stroke-width="2"
              :fill="selectedTags.length > 7 ? 'black' : 'none'"
            ></circle>
          </svg>
        </div>
      </div>
      <hr />
      <div class="row justify-content-center" style="height: 3.5vh">
        <div class="col-4">
          <button
            type="button"
            class="btn"
            :class="{
              'btn-dark': selectedTags.length > 0,
              'btn-light': selectedTags.length <= 0,
            }"
            style="width: 200px"
          >
            {{ selectedTags.length > 0 ? selectedTags[0] : "Null" }}
          </button>
        </div>
        <div class="col-4">
          <button
            type="button"
            class="btn"
            :class="{
              'btn-dark': selectedTags.length > 1,
              'btn-light': selectedTags.length <= 1,
            }"
            style="width: 200px"
          >
            {{ selectedTags.length > 1 ? selectedTags[1] : "Null" }}
          </button>
        </div>
      </div>
      <div class="row justify-content-center" style="height: 3.5vh">
        <div class="col-4">
          <button
            type="button"
            class="btn"
            :class="{
              'btn-dark': selectedTags.length > 2,
              'btn-light': selectedTags.length <= 2,
            }"
            style="width: 200px"
          >
            {{ selectedTags.length > 2 ? selectedTags[2] : "Null" }}
          </button>
        </div>
        <div class="col-4">
          <button
            type="button"
            class="btn"
            :class="{
              'btn-dark': selectedTags.length > 3,
              'btn-light': selectedTags.length <= 3,
            }"
            style="width: 200px"
          >
            {{ selectedTags.length > 3 ? selectedTags[3] : "Null" }}
          </button>
        </div>
      </div>
      <div class="row justify-content-center" style="height: 3.5vh">
        <div class="col-4">
          <button
            type="button"
            class="btn"
            :class="{
              'btn-dark': selectedTags.length > 4,
              'btn-light': selectedTags.length <= 4,
            }"
            style="width: 200px"
          >
            {{ selectedTags.length > 4 ? selectedTags[4] : "Null" }}
          </button>
        </div>
        <div class="col-4">
          <button
            type="button"
            class="btn"
            :class="{
              'btn-dark': selectedTags.length > 5,
              'btn-light': selectedTags.length <= 5,
            }"
            style="width: 200px"
          >
            {{ selectedTags.length > 5 ? selectedTags[5] : "Null" }}
          </button>
        </div>
      </div>
      <div class="row justify-content-center" style="height: 3.5vh">
        <div class="col-4">
          <button
            type="button"
            class="btn"
            :class="{
              'btn-dark': selectedTags.length > 6,
              'btn-light': selectedTags.length <= 6,
            }"
            style="width: 200px"
          >
            {{ selectedTags.length > 6 ? selectedTags[6] : "Null" }}
          </button>
        </div>
        <div class="col-4">
          <button
            type="button"
            class="btn"
            :class="{
              'btn-dark': selectedTags.length > 7,
              'btn-light': selectedTags.length <= 7,
            }"
            style="width: 200px"
          >
            {{ selectedTags.length > 7 ? selectedTags[7] : "Null" }}
          </button>
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
        style="height: 68vh; overflow: auto"
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
                :id="'panelsStayOpen-heading' + index"
              >
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#panelsStayOpen-collapse' + index"
                  aria-expanded="false"
                  :aria-controls="'panelsStayOpen-collapse' + index"
                >
                  {{ value.category }}
                </button>
              </h2>
              <div
                :id="'panelsStayOpen-collapse' + index"
                class="accordion-collapse collapse collapse"
                :aria-labelledby="'panelsStayOpen-heading' + index"
                data-bs-parent="#accordionPanelsStayOpenExample"
              >
                <div
                  class="accordion-body background"
                  v-for="(tag, indexTags) in value.tags"
                  :key="indexTags"
                >
                  <div class="container">
                    <input
                      type="checkbox"
                      :value="tag"
                      :id="tag"
                      v-model="selectedTags"
                    />
                    <label :for="tag">
                      {{ tag }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br>
      <hr style="margin: 0" />
      <div class="row justify-content-center" style="height: 7vh">
        <div class="col-5">
          <p>Skip and access next image</p>
          <button type="button" class="btn btn-success btn-margin">Skip</button>
        </div>
        <div class="col-1"></div>
        <div class="col-1">
          <div class="vertical"></div>
        </div>
        <div class="col-5">
          <p>Save and access next image</p>
          <button type="button" class="btn btn-primary btn-margin" @click="saveTags">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import myFile from "./assets/tags.json";

import dataFetch from "./api/dataFetching";

export default {
  name: "App",
  watch: {
    selectedTags: function() {},
  },
  data() {
    return {
      tags: myFile,
      images: undefined,
      selectedTags: [],
    };
  },
  methods: {
    saveTags() {
      this.images[0].element["dcterms:coverage"] = [
        {
          type: "literal",
          property_id: 14,
          property_label: "Coverage",
          is_public: true,
          "@value": "This is a test2",
        },
      ];
      this.images[0].element["dcterms:rights"] = [
        {
          type: "literal",
          property_id: 15,
          property_label: "Rights",
          is_public: true,
          "@value": "Save",
        },
      ];
      dataFetch.saveItem(this.images[0].element);
    },
  },
  mounted() {
    dataFetch.getImages().then((result) => {
      this.images = result;
      dataFetch.analyzePending();
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

hr {
  opacity: 1;
  margin: 5px;
}

p {
  margin: 0;
}

.background {
  background-color: gray;
}

.padding {
  padding: 0;
}

.circle-position {
  height: 30px;
}

.vertical {
  border-left: 1px solid black;
  height: 7vh;
}

 .btn-margin {
   margin-top: 10px;
 }
</style>
