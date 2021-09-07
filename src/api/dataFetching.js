import axios from "axios";

const request = async (url) => {
  return axios.get(url);
};

const save = async (item) => {
  return axios.put(process.env.VUE_APP_DIRECT_REQUEST + item["o:id"], item, {
    params: {
      key_identity: process.env.VUE_APP_KEY_IDENTITY,
      key_credential: process.env.VUE_APP_KEY_CREDENTIAL,
    },
  });
};

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
    let req =
      process.env.VUE_APP_FETCH_BASE +
      "per_page=1&property%5B0%5D%5Bjoiner%5D=and&property%5B0%5D%5Bproperty%5D=15&property%5B0%5D%5Btype%5D=nex&property%5B1%5D%5Bjoiner%5D=and&property%5B1%5D%5Bproperty%5D=6&property%5B1%5D%5Btype%5D=eq&property%5B1%5D%5Btext%5D=" +
      user;
    if (skipId) {
      req =
        req +
        "&property%5B2%5D%5Bjoiner%5D=and&property%5B2%5D%5Bproperty%5D=10&property%5B2%5D%5Btype%5D=neq&property%5B2%5D%5Btext%5D=" +
        skipId;
    }
    const { data } = await request(req);
    return parseImages(data);
  },

  async getSkipImage(user, skipId) {
    let req =
      process.env.VUE_APP_FETCH_BASE +
      "per_page=1&property%5B0%5D%5Bjoiner%5D=and&property%5B0%5D%5Bproperty%5D=15&property%5B0%5D%5Btype%5D=eq&property%5B0%5D%5Btext%5D=Skip&property%5B1%5D%5Bjoiner%5D=and&property%5B1%5D%5Bproperty%5D=6&property%5B1%5D%5Btype%5D=eq&property%5B1%5D%5Btext%5D=" +
      user;
    if (skipId) {
      req =
        req +
        "&property%5B2%5D%5Bjoiner%5D=and&property%5B2%5D%5Bproperty%5D=10&property%5B2%5D%5Btype%5D=neq&property%5B2%5D%5Btext%5D=" +
        skipId;
    }
    const { data } = await request(req);
    return parseImages(data);
  },

  async saveItem(item) {
    return save(item);
  },

  async getTodayImagessByUser(user) {
    const today = new Date();
    const date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    let req =
      process.env.VUE_APP_FETCH_BASE +
      "per_page=1&property%5B0%5D%5Bjoiner%5D=and&property%5B0%5D%5Bproperty%5D=15&property%5B0%5D%5Btype%5D=ex&property%5B1%5D%5Bjoiner%5D=and&property%5B1%5D%5Bproperty%5D=6&property%5B1%5D%5Btype%5D=eq&property%5B1%5D%5Btext%5D=" +
      user +
      "&property%5B2%5D%5Bjoiner%5D=and&property%5B2%5D%5Bproperty%5D=46&property%5B2%5D%5Btype%5D=eq&property%5B2%5D%5Btext%5D=" +
      date;
    const { headers } = await request(req);
    const dataProcessing = [];
    const nbPage = Math.ceil(headers["omeka-s-total-results"] / 1000);
    for (let i = 1; i <= nbPage; i++) {
      req =
        process.env.VUE_APP_FETCH_BASE +
        "per_page=1000&property%5B0%5D%5Bjoiner%5D=and&property%5B0%5D%5Bproperty%5D=15&property%5B0%5D%5Btype%5D=ex&property%5B1%5D%5Bjoiner%5D=and&property%5B1%5D%5Bproperty%5D=6&property%5B1%5D%5Btype%5D=eq&property%5B1%5D%5Btext%5D=" +
        user +
        "&property%5B2%5D%5Bjoiner%5D=and&property%5B2%5D%5Bproperty%5D=46&property%5B2%5D%5Btype%5D=eq&property%5B2%5D%5Btext%5D=" +
        date +
        "&page=" +
        i;
      let { data } = await request(req);
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
    let req =
      process.env.VUE_APP_FETCH_BASE +
      "per_page=1&property%5B0%5D%5Bjoiner%5D=and&property%5B0%5D%5Bproperty%5D=15&property%5B0%5D%5Btype%5D=ex&&property%5B1%5D%5Bjoiner%5D=and&property%5B1%5D%5Bproperty%5D=6&property%5B1%5D%5Btype%5D=eq&property%5B1%5D%5Btext%5D=" +
      user;
    const { headers } = await request(req);
    const dataProcessing = [];
    const nbPage = Math.ceil(headers["omeka-s-total-results"] / 1000);
    for (let i = 1; i <= nbPage; i++) {
      req =
        process.env.VUE_APP_FETCH_BASE +
        "per_page=1000&property%5B0%5D%5Bjoiner%5D=and&property%5B0%5D%5Bproperty%5D=15&property%5B0%5D%5Btype%5D=ex&property%5B1%5D%5Bjoiner%5D=and&property%5B1%5D%5Bproperty%5D=6&property%5B1%5D%5Btype%5D=eq&property%5B1%5D%5Btext%5D=" +
        user +
        "&page=" +
        i;
      let { data } = await request(req);
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
    let req =
      process.env.VUE_APP_FETCH_BASE +
      "per_page=1&property%5B0%5D%5Bjoiner%5D=and&property%5B0%5D%5Bproperty%5D=15&property%5B0%5D%5Btype%5D=ex&&property%5B1%5D%5Bjoiner%5D=and&property%5B1%5D%5Bproperty%5D=6&property%5B1%5D%5Btype%5D=eq&property%5B1%5D%5Btext%5D=" +
      user;
    const { headers } = await request(req);
    const dataProcessing = [];
    const nbPage = Math.ceil(headers["omeka-s-total-results"] / 1000);
    for (let i = 1; i <= nbPage; i++) {
      req =
        process.env.VUE_APP_FETCH_BASE +
        "per_page=1000&property%5B0%5D%5Bjoiner%5D=and&property%5B0%5D%5Bproperty%5D=15&property%5B0%5D%5Btype%5D=ex&property%5B1%5D%5Bjoiner%5D=and&property%5B1%5D%5Bproperty%5D=6&property%5B1%5D%5Btype%5D=eq&property%5B1%5D%5Btext%5D=" +
        user +
        "&page=" +
        i;
      let { data } = await request(req);
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
      })
    });
    return result;
  },
};
