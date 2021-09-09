<template>
  <div v-if="!isAuth">
    <form class="login" style="padding: 5vh">
      <div>
        <h2>Login</h2>
        <input type="text" v-model="user" placeholder="user" />
        <br />
        <input type="password" v-model="password" placeholder="Password" />
        <br />
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
  <!-- Admin view -->
  <div style="height: 100vh; widhth: 100vw" v-if="isAuth && !isLoad && isAdmin">
    <div class="container-fluid" style="margin-top: 3vh">
      <div class="row justify-content-center" style="height:94vh">
        <div class="col-10">
          <table class="table table-hover" style="height:94vh">
            <thead>
              <tr>
                <th scope="col">User</th>
                <th scope="col">Daily Image</th>
                <th scope="col">Daily Tags</th>
                <th scope="col">Total Images</th>
                <th scope="col">Total Tags</th>
              </tr>
            </thead>
            <tbody
              v-for="(value, index) in adminInformation"
              :key="index"
              style="vertical-align: middle;"
            >
              <tr @click="loadUserImage(value.user)">
                <th>{{ value.user }}</th>
                <th>{{ value.todayImage }}</th>
                <th>{{ value.todayTags }}</th>
                <th>{{ value.totalImage }}</th>
                <th>{{ value.totalTags }}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Modal Part 1 -->
    <div
      class="modal fade"
      id="exampleModalToggle"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel"
      tabindex="-1"
    >
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalToggleLabel">
              {{ modalUser }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div
              class="row align-items-center"
              style="height: 25vh"
              v-for="(value, index) in modalImages"
              :key="index"
            >
              <div class="col-2">
                <img
                  style="height: 25vh; cursor: pointer;"
                  :src="value.thumbnail.large"
                  @click="loadBigImage(value)"
                />
              </div>
              <div class="col-2">
                <p>{{ value.id }}</p>
              </div>
              <div class="col-3">
                <p>{{ value.state }}</p>
              </div>
              <div class="col-4">
                <ul>
                  <li v-for="(tag, i) in value.tags" :key="i">
                    {{ tag["@value"] }}
                  </li>
                </ul>
              </div>
              <div class="col-1">
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="resetTags(value.id, 1)"
                >
                  Reset
                </button>
              </div>
              <hr />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="closeUserImage()"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Part 2 -->
    <div
      class="modal fade"
      id="exampleModalToggle2"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel2"
      tabindex="-1"
    >
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalToggleLabel2">
              {{ modalUser }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row align-items-center">
              <div class="col-9">
                <img style="height: 80vh" :src="bigModalImage" />
              </div>
              <div class="col-2">
                <ul>
                  <li v-for="(tag, i) in bigModalTags" :key="i">
                    {{ tag["@value"] }}
                  </li>
                </ul>
              </div>
              <div class="col-1">
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="resetTags(bigModalId, 2)"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="closeBigModal()"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Not Admin view -->
  <div
    style="height: 100vh; widhth: 100vw"
    v-if="isAuth && !isLoad && !isAdmin"
  >
    <div class="container-fluid" style="margin: 3vh">
      <div class="row" style="height:94vh" v-if="isAuth">
        <div class="col-7 background" style="height: 94vh">
          <p v-if="images" style="color: white">
            ID: {{ images[0].id }} - Nb Images: {{ todayImages }} - Nb Tags:
            {{ todayTags }}
          </p>
          <p v-if="!images" style="color: white">
            Nb Images: {{ todayImages }} - Nb Tags: {{ todayTags }}
          </p>
          <img
            v-if="images"
            :src="images[0].image.large"
            class="img-fluid"
            style="height: 92vh"
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
                  'btn-primary': selectedTags.length < 3,
                  'btn-secondary': selectedTags.length >= 3,
                }"
                class="btn btn-margin button-border final-button-size"
                style="width: 10vw"
                @click="skipTags"
                :disabled="selectedTags.length >= 3"
              >
                Skip if not taggable
              </button>
            </div>
            <div class="col-1"></div>
            <div class="col-5">
              <button
                type="button"
                :disabled="selectedTags.length < 3"
                :class="{
                  'btn-secondary': selectedTags.length < 3,
                  'btn-success': selectedTags.length >= 3,
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
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.js";

import myFile from "./assets/tags.json";

import dataFetch from "./api/dataFetching";

export default {
  name: "App",
  data() {
    return {
      tags: myFile,
      images: undefined,
      todayImages: 0,
      todayTags: 0,
      adminInformation: [],
      selectedTags: [],
      skipId: [],
      password: "",
      isAuth: false,
      isAdmin: false,
      selectedCategory: "",
      displayTags: [],
      isLoad: false,
      user: "",
      nextImage: undefined,
      isInitial: true,
      modalUser: "",
      modalImages: undefined,
      bigModalTags: undefined,
      bigModalImage: undefined,
      bigModalId: undefined,
      secondModal: undefined,
    };
  },
  methods: {
    // Login methods
    loadPassword(user) {
      if (user === "admin") {
        this.isAdmin = true;
        return process.env["VUE_APP_ADMIN_PASSWORD"];
      } else if (user.slice(0, 7) === "vmuseum") {
        const id = user.slice(7, 9);
        return process.env["VUE_APP_USER_PASSWORD_" + id];
      }
    },
    onSubmit() {
      if (sha256(this.password) === this.loadPassword(this.user)) {
        this.password = "";
        this.isAuth = true;
        this.isLoad = true;
        if (this.isAdmin) {
          this.loadAdminInformation();
          setInterval(() => this.loadAdminInformation(), 120000);
        } else {
          this.loadData();
          this.loadImagePerDay();
        }
      } else {
        this.isAdmin = false;
      }
    },
    // Those two methods are related to the management of tags view
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
    // Those four methods are related to the modals
    loadUserImage(user) {
      const firstModal = new Modal(
        document.getElementById("exampleModalToggle")
      );
      this.modalUser = user;
      dataFetch.getImagesForModal(user).then((result) => {
        this.modalImages = result;
      });
      firstModal.show();
    },
    closeUserImage() {
      this.modalImages = undefined;
    },
    loadBigImage(image) {
      this.secondModal = new Modal(document.getElementById("exampleModalToggle2"));
      this.bigModalImage = image.thumbnail.large;
      this.bigModalTags = image.tags;
      this.bigModalId = image.id;
      this.secondModal.show();
    },
    closeBigModal() {
      this.bigModalImage = undefined;
      this.bigModalTags = undefined;
      this.bigModalId = undefined;
      this.secondModal = undefined;
    },
    resetTags(id, modalId) {
      if (confirm("Are you sure you want to reset this image?")) {
        dataFetch.getImageByID(id).then((data) => {
          data["dcterms:coverage"] = [];
          data["dcterms:rights"] = [];
          data["dcterms:rightsHolder"] = [];
          data["dcterms:educationLevel"] = [];
          dataFetch.saveItem(data).then(() => {
            const index = this.modalImages.findIndex((e) => e.id === id);
            this.modalImages.splice(index, 1);
            if (modalId === 2) {
              this.secondModal.hide();
              this.closeBigModal();
            }
          });
        });
      }
    },
    // This method loads the general information for the admin view
    loadAdminInformation() {
      const users = [
        "vmuseum1",
        "vmuseum2",
        "vmuseum3",
        "vmuseum4",
        "vmuseum5",
        "vmuseum6",
        "vmuseum7",
        "vmuseum8",
        "vmuseum9",
        "vmuseum10",
      ];
      users.forEach((user, index) => {
        if (this.adminInformation.length !== users.length) {
          this.adminInformation.push({
            user: user,
            todayImage: 0,
            todayTags: 0,
            totalImage: 0,
            totalTags: 0,
          });
        }
        dataFetch.getTodayImagessByUser(user).then((result) => {
          this.adminInformation[index].todayImage = result.nbImage;
          this.adminInformation[index].todayTags = result.nbTags;
          dataFetch.getImagessByUser(user).then((result) => {
            this.adminInformation[index].totalImage = result.nbImage;
            this.adminInformation[index].totalTags = result.nbTags;
          });
        });
      });
      this.isLoad = false;
    },
    loadImagePerDay() {
      dataFetch.getTodayImagessByUser(this.user).then((result) => {
        this.todayImages = result.nbImage;
        this.todayTags = result.nbTags;
      });
    },
    loadData() {
      // This parameter is used to skip the current item and pre-load the next one.
      let skipId = undefined;
      if (this.images) {
        skipId = this.images[0].element["dcterms:identifier"][0]["@value"];
      }
      // Load an image for the current user and skip the current id iff necessary
      dataFetch.getImages(this.user, skipId).then((result) => {
        // In case of no result, try to load the skipped items
        if (result.length === 0) {
          dataFetch.getSkipImage(this.user, skipId).then((result) => {
            // If no skip item, all the data have tags
            if (result.length === 0) {
              if (this.images) {
                this.nextImage = undefined;
              } else {
                this.images = undefined;
              }
            } else {
              // In case of it's the first load, setup the page parameters
              if (this.isInitial) {
                this.selectedTags = [];
                this.images = result;
                this.isInitial = false;
                this.loadData();
              } else {
                this.nextImage = result;
              }
            }
            this.isLoad = false;
          });
        } else {
          // In case of it's the first load, setup the page parameters
          if (this.isInitial) {
            this.selectedTags = [];
            this.images = result;
            this.isInitial = false;
            this.loadData();
          } else {
            this.nextImage = result;
          }
          this.isLoad = false;
        }
      });
    },
    removeEntry(position) {
      this.selectedTags.splice(position, 1);
    },
    skipTags() {
      // The data is received like an array it's the reason why the data is stored like an array.
      // In this case, we have only one element in the array. It's the reason behind the 0
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
        if (nbSkip >= 2) {
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
      let date = new Date();
      this.images[0].element["dcterms:educationLevel"] = [
        {
          type: "literal",
          property_id: 46,
          property_label: "Audience Education Level",
          is_public: true,
          "@value": `${date.getDate() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getFullYear()}`,
        },
      ];
      // Increment those data to not get the data from the DB
      this.todayImages = this.todayImages + 1;
      // Save then load the preload image then preload the next image
      this.isLoad = true;
      dataFetch.saveItem(this.images[0].element).then(() => {
        this.images = undefined;
        if (this.nextImage) {
          this.images = this.nextImage;
          this.nextImage = undefined;
          this.isLoad = false;
        }
        this.selectedTags = [];
        this.loadData();
      });
    },
    saveTags() {
      // The data is received like an array it's the reason why the data is stored like an array.
      // In this case, we have only one element in the array. It's the reason behind the 0
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
      let date = new Date();
      this.images[0].element["dcterms:educationLevel"] = [
        {
          type: "literal",
          property_id: 46,
          property_label: "Audience Education Level",
          is_public: true,
          "@value": `${date.getDate() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getFullYear()}`,
        },
      ];
      // Increment those data to not get the data from the DB
      this.todayImages = this.todayImages + 1;
      this.todayTags = this.todayTags + this.selectedTags.length;
      // Save then load the preload image then preload the next image
      this.isLoad = true;
      dataFetch.saveItem(this.images[0].element).then(() => {
        this.images = undefined;
        if (this.nextImage) {
          this.images = this.nextImage;
          this.nextImage = undefined;
          this.isLoad = false;
        }
        this.selectedTags = [];
        this.loadData();
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

ul {
  list-style-type: none;
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
