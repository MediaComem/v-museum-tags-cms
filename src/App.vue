<template>
  <div v-if="!isAuth">
    <form class="login" style="padding: 5vh">
      <div>
        <h2>Login</h2>
        <input type="password" v-model="password" placeholder="Password" />
        <button v-on:click="onSubmit">Log in</button>
      </div>
    </form>
  </div>
  <div v-if="isAuth && isLoad" class="loading">
    <div class="loader">
      <div class="loader-wheel"></div>
      <div class="loader-text"></div>
    </div>
  </div>
  <div style="height: 100vh; widhth: 100vw" v-if="isAuth && !isLoad">
    <div class="container-fluid" style="margin: 3vh">
      <div class="row" style="height:94vh" v-if="isAuth">
        <div class="col-7 background" style="height: 94vh">
          <img
            v-if="images"
            :src="images[0].image.large"
            class="img-fluid"
            style="height: 94vh"
          />
        </div>
        <div class="col-5" style="height: 94vh">
          <div class="row justify-content-start">
            <div class="col-12">
              <h2>Selected Tags</h2>
            </div>
          </div>
          <div style="display: block; height: 0.5vh" />
          <div class="row justify-content-center">
            <div class="col-6">
              <button
                type="button"
                class="btn button-border button-display button-size"
                :class="{
                  'btn-dark': selectedTags.length > 0,
                  'btn-light': selectedTags.length <= 0,
                }"
                :disabled="selectedTags.length <= 0"
                @click="removeEntry(0)"
              >
                <font-awesome-icon
                  v-if="selectedTags.length > 0"
                  icon="times"
                  class="button-display"
                />
                {{ selectedTags.length > 0 ? selectedTags[0] : "Null" }}
              </button>
            </div>
            <div class="col-6">
              <button
                type="button"
                class="btn button-border button-display button-size"
                :class="{
                  'btn-dark': selectedTags.length > 1,
                  'btn-light': selectedTags.length <= 1,
                }"
                :disabled="selectedTags.length <= 1"
                @click="removeEntry(1)"
              >
                <font-awesome-icon
                  v-if="selectedTags.length > 1"
                  icon="times"
                  class="button-display"
                />
                {{ selectedTags.length > 1 ? selectedTags[1] : "Null" }}
              </button>
            </div>
          </div>
          <div style="display: block; height: 0.5vh" />
          <div class="row justify-content-center">
            <div class="col-6">
              <button
                type="button"
                class="btn button-border button-display button-size"
                :class="{
                  'btn-dark': selectedTags.length > 2,
                  'btn-light': selectedTags.length <= 2,
                }"
                :disabled="selectedTags.length <= 2"
                @click="removeEntry(2)"
              >
                <font-awesome-icon
                  v-if="selectedTags.length > 2"
                  icon="times"
                  class="button-display"
                />
                {{ selectedTags.length > 2 ? selectedTags[2] : "Null" }}
              </button>
            </div>
            <div class="col-6">
              <button
                type="button"
                class="btn button-border button-display button-size"
                :class="{
                  'btn-dark': selectedTags.length > 3,
                  'btn-light': selectedTags.length <= 3,
                }"
                :disabled="selectedTags.length <= 3"
                @click="removeEntry(3)"
              >
                <font-awesome-icon
                  v-if="selectedTags.length > 3"
                  icon="times"
                  class="button-display"
                />
                {{ selectedTags.length > 3 ? selectedTags[3] : "Null" }}
              </button>
            </div>
          </div>
          <div style="display: block; height: 0.5vh" />
          <div class="row justify-content-center">
            <div class="col-6">
              <button
                type="button"
                class="btn button-border button-display button-size"
                :class="{
                  'btn-dark': selectedTags.length > 4,
                  'btn-light': selectedTags.length <= 4,
                }"
                :disabled="selectedTags.length <= 4"
                @click="removeEntry(4)"
              >
                <font-awesome-icon
                  v-if="selectedTags.length > 4"
                  icon="times"
                  class="button-display"
                />
                {{ selectedTags.length > 4 ? selectedTags[4] : "Null" }}
              </button>
            </div>
            <div class="col-6">
              <button
                type="button"
                class="btn button-border button-display button-size"
                :class="{
                  'btn-dark': selectedTags.length > 5,
                  'btn-light': selectedTags.length <= 5,
                }"
                :disabled="selectedTags.length <= 5"
                @click="removeEntry(5)"
              >
                <font-awesome-icon
                  v-if="selectedTags.length > 5"
                  icon="times"
                  class="button-display"
                />
                {{ selectedTags.length > 5 ? selectedTags[5] : "Null" }}
              </button>
            </div>
          </div>
          <div style="display: block; height: 0.5vh" />
          <div class="row justify-content-center">
            <div class="col-6">
              <button
                type="button"
                class="btn button-border button-display button-size"
                :class="{
                  'btn-dark': selectedTags.length > 6,
                  'btn-light': selectedTags.length <= 6,
                }"
                :disabled="selectedTags.length <= 6"
                @click="removeEntry(6)"
              >
                <font-awesome-icon
                  v-if="selectedTags.length > 6"
                  icon="times"
                  class="button-display"
                />
                {{ selectedTags.length > 6 ? selectedTags[6] : "Null" }}
              </button>
            </div>
            <div class="col-6">
              <button
                type="button"
                class="btn button-border button-display button-size"
                :class="{
                  'btn-dark': selectedTags.length > 7,
                  'btn-light': selectedTags.length <= 7,
                }"
                :disabled="selectedTags.length <= 7"
                @click="removeEntry(7)"
              >
                <font-awesome-icon
                  v-if="selectedTags.length > 7"
                  icon="times"
                  class="button-display"
                />
                {{ selectedTags.length > 7 ? selectedTags[7] : "Null" }}
              </button>
            </div>
          </div>
          <div style="display: block; height: 2%" />
          <hr />
          <div style="display: block; height: 2%" />
          <div class="row">
            <div
              class=" col-5 card"
              style="padding: 0; margin-left: 12px; margin-right: 5%; height: 50%"
            >
              <div class="card-header">
                Categories
              </div>
              <ul class="list-group list-group-flush">
                <li
                  v-for="(value, index) in tags"
                  :key="index"
                  class="list-group-item"
                  :class="{ selected: selectedCategory === value.category }"
                  @click="selectCategory(value.category)"
                >
                  {{ value.category }}
                </li>
              </ul>
            </div>
            <div
              class=" col-5 card"
              style="padding: 0; height: 50vh; overflow: scroll;"
            >
              <div class="card-header">
                Tags
              </div>
              <ul class="list-group list-group-flush">
                <li
                  class="list-group-item"
                  v-for="(value, index) in displayTags"
                  :key="index"
                  :class="{
                    selected: this.selectedTags.includes(value),
                    'block-tags':
                      selectedTags.length > 7 &&
                      !this.selectedTags.includes(value),
                  }"
                  @click="selectTag(value)"
                >
                  {{ value }}
                </li>
              </ul>
            </div>
          </div>
          <div style="display: block; height: 2%" />
          <hr style="margin: 0" />
          <div style="display: block; height: 2%" />
          <div class="row">
            <div class="col-5">
              <button
                type="button"
                :class="{
                  'btn-primary': selectedTags.length < 4,
                  'btn-secondary': selectedTags.length >= 4,
                }"
                class="btn btn-margin button-border final-button-size"
                style="width: 10vw"
                @click="skipTags"
                :disabled="selectedTags.length >= 4"
              >
                Skip if not taggable
              </button>
            </div>
            <div class="col-1"></div>
            <div class="col-5">
              <button
                type="button"
                :disabled="selectedTags.length < 4"
                :class="{
                  'btn-secondary': selectedTags.length < 4,
                  'btn-success': selectedTags.length >= 4,
                }"
                class="btn btn-margin button-border final-button-size"
                style="width: 10vw"
                @click="saveTags"
              >
                Save and next
                <font-awesome-icon icon="check" class="final-button-size" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { sha256 } from "js-sha256";

import myFile from "./assets/tags.json";

import dataFetch from "./api/dataFetching";

export default {
  name: "App",
  data() {
    return {
      tags: myFile,
      images: undefined,
      selectedTags: [],
      skipId: [],
      password: "",
      isAuth: false,
      selectedCategory: "",
      displayTags: [],
      isLoad: false,
    };
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
      this.displayTags = this.tags.filter(
        (e) => e.category === category
      )[0].tags;
    },
    selectTag(tag) {
      if (this.selectedTags.includes(tag)) {
        const index = this.selectedTags.findIndex((e) => e === tag);
        this.selectedTags.splice(index, 1);
      } else if (this.selectedTags.length <= 7) {
        this.selectedTags.push(tag);
      }
    },
    onSubmit() {
      if (sha256(this.password) === process.env.VUE_APP_PASSWORD) {
        this.isAuth = true;
        this.isLoad = true;
        dataFetch.getImages(this.skipId).then((result) => {
          this.images = result;
          this.isLoad = false;
          dataFetch.analyzePending();
        });
      }
    },
    removeEntry(position) {
      this.selectedTags.splice(position, 1);
    },
    skipTags() {
      this.skipId.push(
        this.images[0].element["dcterms:identifier"][0]["@value"]
      );
      this.skipId = [...new Set(this.skipId)];
      this.images[0].element["dcterms:rights"] = [
        {
          type: "literal",
          property_id: 15,
          property_label: "Rights",
          is_public: true,
          "@value": "Skip",
        },
      ];
      const skipElement = this.images[0].element["dcterms:rightsHolder"];
      if (skipElement) {
        const nbSkip = +skipElement[0]["@value"] + 1;
        if (nbSkip >= 3) {
          this.images[0].element["dcterms:rights"] = [
            {
              type: "literal",
              property_id: 15,
              property_label: "Rights",
              is_public: true,
              "@value": "Flag",
            },
          ];
        }
        this.images[0].element["dcterms:rightsHolder"] = [
          {
            type: "literal",
            property_id: 50,
            property_label: "Rights",
            is_public: true,
            "@value": nbSkip.toString(),
          },
        ];
      } else {
        this.images[0].element["dcterms:rightsHolder"] = [
          {
            type: "literal",
            property_id: 50,
            property_label: "Rights",
            is_public: true,
            "@value": "1",
          },
        ];
      }
      this.isLoad = true;
      dataFetch.saveItem(this.images[0].element).then(() => {
        dataFetch.getImages(this.skipId).then((result) => {
          this.selectedTags = [];
          this.images = result;
          this.isLoad = false;
          dataFetch.analyzePending();
        });
      });
    },
    saveTags() {
      const newTags = [];
      this.selectedTags.forEach((element) => {
        newTags.push({
          type: "literal",
          property_id: 14,
          property_label: "Coverage",
          is_public: true,
          "@value": element,
        });
      });
      this.images[0].element["dcterms:coverage"] = newTags;
      this.images[0].element["dcterms:rights"] = [
        {
          type: "literal",
          property_id: 15,
          property_label: "Rights",
          is_public: true,
          "@value": "Save",
        },
      ];
      this.isLoad = true;
      dataFetch.saveItem(this.images[0].element).then(() => {
        dataFetch.getImages(this.skipId).then((result) => {
          this.selectedTags = [];
          this.images = result;
          this.isLoad = false;
          dataFetch.analyzePending();
        });
      });
    },
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

li {
  text-align: start;
}

br {
  height: 2px;
}

h2 {
  font-size: 1rem;
}

hr {
  opacity: 1;
  margin: 0.5vh;
  height: 1vh;
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
  height: 9vh;
}

.btn-margin {
  margin-top: 10px;
}

.input-container {
  display: flex;
  align-items: center;
}

.button-border {
  border: 1px solid #000000 !important;
  border-radius: 10px;
}

.login {
  background-color: gray;
  height: 25vh;
  width: 25vw;
  left: 37.5vw;
  top: 37.5vh;
  position: relative;
}

.button-display {
  font-size: 0.75vw;
}

.button-size {
  width: 11vw;
}

.selected {
  background-color: lightblue;
}

.block-tags {
  background-color: lightgray;
  color: white;
}

.final-button-size {
  font-size: 1vw;
  font-weight: bold;
}

.loading {
  height: 100vh;
  width: 100vw;
  background-color: lightgray;
  z-index: 5;
}

.loader {
  position: absolute;
  left: 47vw;
  top: 47vh;
  width: vw;
}

.loader-wheel {
  animation: spin 1s infinite linear;
  border: 2px solid rgba(30, 30, 30, 0.5);
  border-left: 4px solid #fff;
  border-radius: 50%;
  height: 50px;
  margin-bottom: 10px;
  width: 50px;
}

.loader-text {
  color: #fff;
  font-family: arial, sans-serif;
}

.loader-text:after {
  content: "Loading";
  animation: load 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes load {
  0% {
    content: "Loading";
  }
  33% {
    content: "Loading.";
  }
  67% {
    content: "Loading..";
  }
  100% {
    content: "Loading...";
  }
}
</style>
