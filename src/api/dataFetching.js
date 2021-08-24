import axios from "axios";

const request = async (url) => {
  return axios.get(url);
};

const save = async (item) => {
  return axios.put("api/items/" + item["o:id"], item, {
    params: {
      key_identity: process.env.VUE_APP_KEY_IDENTITY,
      key_credential: process.env.VUE_APP_KEY_CREDENTIAL,
    },
  });
};

const parseElement = (element) => {
  return element["thumbnail_display_urls"];
};

const parseImages = (data) => {
  const images = [];
  data.forEach((element) => {
    element["dcterms:rights"] = [
      {
        type: "literal",
        property_id: 15,
        property_label: "Rights",
        is_public: true,
        "@value": "pending",
      },
    ];
    element["dcterms:educationLevel"] = [
      {
        type: "literal",
        property_id: 46,
        property_label: "Audience Education Level",
        is_public: true,
        "@value": Date.now().toString(),
      },
    ];
    //save(element);
    images.push({ image: parseElement(element), element: element });
  });
  return images;
};

const getPendingImages = async () => {
  const req = process.env.VUE_APP_FIND_DATA;
  const { data } = await request(req);
  data.forEach((element) => {
    if (+element["dcterms:educationLevel"][0]["@value"] + 300000 < Date.now()) {
      element["dcterms:rights"] = [];
      element["dcterms:educationLevel"] = [];
      save(element);
    }
  })
};

export default {
  async getImages() {
    const req = process.env.VUE_APP_FETCH_BASE;
    const { data } = await request(req);
    return parseImages(data);
  }, 

  async removePending(items) {
    items.forEach((item) => {
      item.element["dcterms:rights"] = [];
      item.element["dcterms:educationLevel"] = [];
      save(item.element);
    });
  },

  async saveItem(item) {
    return save(item);
  },

  async analyzePending() {
    getPendingImages();
  }
};
