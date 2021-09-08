import axios from "axios";

const parseId = (element) => {
  return element["o:id"];
};

const parseElement = (element) => {
  return element["thumbnail_display_urls"];
};

const parseImages = (data) => {
  const images = [];
  data.forEach((element) => {
    images.push({
      image: parseElement(element),
      id: parseId(element),
      element: element,
    });
  });
  return images;
};

const countImageAndTags = (data) => {
  const nbImage = data.length;
  let nbTags = 0;
  data.forEach((image) => {
    if (image["dcterms:rights"][0]["@value"] === "Save") {
      nbTags = nbTags + image["dcterms:coverage"].length;
    }
  });
  return { nbImage: nbImage, nbTags: nbTags };
};

export default {
  async getImages(user, skipId) {
    const params = {
      params: {
        per_page: 1,
        "property[0][joiner]": "and",
        "property[0][property]": 15,
        "property[0][type]": "nex",
        "property[1][joiner]": "and",
        "property[1][property]": 6,
        "property[1][type]": "eq",
        "property[1][text]": user,
      },
    };
    if (skipId) {
      params.params["property[2][joiner]"] = "and";
      params.params["property[2][property]"] = "10";
      params.params["property[2][type]"] = "neq";
      params.params["property[2][text]"] = skipId;
    }
    const { data } = await axios.get(process.env.VUE_APP_FETCH_BASE, params);
    return parseImages(data);
  },

  async getSkipImage(user, skipId) {
    const params = {
      params: {
        per_page: 1,
        "property[0][joiner]": "and",
        "property[0][property]": 15,
        "property[0][type]": "eq",
        "property[0][text]": "Skip",
        "property[1][joiner]": "and",
        "property[1][property]": 6,
        "property[1][type]": "eq",
        "property[1][text]": user,
      },
    };
    if (skipId) {
      params.params["property[2][joiner]"] = "and";
      params.params["property[2][property]"] = "10";
      params.params["property[2][type]"] = "neq";
      params.params["property[2][text]"] = skipId;
    }
    const { data } = await axios.get(process.env.VUE_APP_FETCH_BASE, params);
    return parseImages(data);
  },

  async saveItem(item) {
    return axios.put(process.env.VUE_APP_DIRECT_REQUEST + item["o:id"], item, {
      params: {
        key_identity: process.env.VUE_APP_KEY_IDENTITY,
        key_credential: process.env.VUE_APP_KEY_CREDENTIAL,
      },
    });
  },

  async getTodayImagessByUser(user) {
    const today = new Date();
    const date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    const dataProcessing = [];
    // The reason behind 3 is that each user has 3000 images and each get retrieve 1000 images so 3 to have all images.
    for (let i = 1; i <= 3; i++) {
      const params = {
        params: {
          per_page: 1000,
          "property[0][joiner]": "and",
          "property[0][property]": 15,
          "property[0][type]": "ex",
          "property[1][joiner]": "and",
          "property[1][property]": 6,
          "property[1][type]": "eq",
          "property[1][text]": user,
          "property[2][joiner]": "and",
          "property[2][property]": 46,
          "property[2][type]": "eq",
          "property[2][text]": date,
          "page": i
        },
      };
      const { data } = await axios.get(process.env.VUE_APP_FETCH_BASE, params);
      dataProcessing.push(countImageAndTags(data));
    }
    const result = { nbImage: 0, nbTags: 0 };
    dataProcessing.forEach((e) => {
      result.nbImage = result.nbImage + e.nbImage;
      result.nbTags = result.nbTags + e.nbTags;
    });
    return result;
  },

  async getImagessByUser(user) {
    const dataProcessing = [];
    // The reason behind 3 is that each user has 3000 images and each get retrieve 1000 images so 3 to have all images.
    for (let i = 1; i <= 3; i++) {
      const params = {
        params: {
          per_page: 1000,
          "property[0][joiner]": "and",
          "property[0][property]": 15,
          "property[0][type]": "ex",
          "property[1][joiner]": "and",
          "property[1][property]": 6,
          "property[1][type]": "eq",
          "property[1][text]": user,
          "page": i
        },
      };
      const { data } = await axios.get(process.env.VUE_APP_FETCH_BASE, params);
      dataProcessing.push(countImageAndTags(data));
    }
    const result = { nbImage: 0, nbTags: 0 };
    dataProcessing.forEach((e) => {
      result.nbImage = result.nbImage + e.nbImage;
      result.nbTags = result.nbTags + e.nbTags;
    });
    return result;
  },

  async getImagesForModal(user) {
    const dataProcessing = [];
    // The reason behind 3 is that each user has 3000 images and each get retrieve 1000 images so 3 to have all images.
    for (let i = 1; i <= 3; i++) {
      const params = {
        params: {
          per_page: 1000,
          "property[0][joiner]": "and",
          "property[0][property]": 15,
          "property[0][type]": "ex",
          "property[1][joiner]": "and",
          "property[1][property]": 6,
          "property[1][type]": "eq",
          "property[1][text]": user,
          "page": i
        },
      };
      const { data } = await axios.get(process.env.VUE_APP_FETCH_BASE, params);
      dataProcessing.push(data);
    }
    const result = [];
    dataProcessing.forEach((e) => {
      e.forEach((item) => {
        result.push({
          id: parseId(item),
          thumbnail: parseElement(item),
          state: item["dcterms:rights"][0]["@value"],
          tags: item["dcterms:coverage"],
        });
      });
    });
    return result;
  },
};
