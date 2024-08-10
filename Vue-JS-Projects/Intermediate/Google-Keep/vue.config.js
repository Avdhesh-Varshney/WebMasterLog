const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: [
    "vuetify"
  ],
  pwa: {
    "workboxOptions": {
      "skipWaiting": true
    }
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          quietDeps: true,
        },
      },
    },
  },
});
