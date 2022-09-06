const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
});
