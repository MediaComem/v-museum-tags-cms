module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/v-museum-tags-cms/" : "/",
  
    devServer: {
      proxy: {
        "^/api/items": {
          target: "https://v-museum.heig-vd.ch/",
        },
      },
    },
  
    chainWebpack: (config) => {
      config.plugin("html").tap((args) => {
        args[0].meta = {
          viewport: "width=device-width,height=device-height,initial-scale=1,user-scalable=no",
        };
  
        return args;
      });
    },
  };
  