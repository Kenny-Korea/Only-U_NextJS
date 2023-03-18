const withPWA = require("next-pwa");

const settings = {
  env: {},
  devIndicators: {
    autoPrerender: false,
  },
  pwa: {
    dest: "public",
  },
  images: {
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        // port: '',
        // pathname: '/account123/**',
      },
    ],
  },
};

module.exports =
  process.env.NODE_ENV === "development" ? settings : withPWA(settings);
