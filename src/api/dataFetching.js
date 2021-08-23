import axios from "axios";

const request = async (url) => {
  return axios.get(url);
};

const parseElement = (element) => {
  return element["thumbnail_display_urls"];
};

const parseImages = (data) => {
  const images = [];
  data.forEach((element) => {
    images.push(parseElement(element));
  });
  console.log(images)
  return images;
};

export default {
  async getImages() {
    const req = process.env.VUE_APP_FETCH_BASE;
    const { data } = await request(req);
    return parseImages(data);
  },
};
