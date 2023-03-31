const settings = {
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640],
    domains: ["firebasestorage.googleapis.com", "maps.googleapis.com"],
  },
};

/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports =
  process.env.NODE_ENV === "development" ? settings : withPWA(settings);
