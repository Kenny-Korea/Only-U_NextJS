const settings = {
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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

// module.exports =
//   process.env.NODE_ENV === "development" ? settings : withPWA(settings);

// module.exports = withPWA({
//   // config
// });

// /** @type {import('next').NextConfig} */
// const withPWA = require("next-pwa");

// module.exports = withPWA({
//   pwa: {
//     dest: "public",
//   },
// });

// const withPWA = require("next-pwa")({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   images: {
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//     deviceSizes: [640],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "firebasestorage.googleapis.com",
//         // port: '',
//         // pathname: '/account123/**',
//       },
//     ],
//   },
// });

// const nextConfig = withPWA({
//   reactStrictMode: true,
// });

// module.exports = nextConfig;

// // module.exports =
// //   process.env.NODE_ENV === "development" ? settings : withPWA(settings);

/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  // pwa: {
  //   dest: "public",
  //   disable: process.env.NODE_ENV === "development",
  // },
});

// module.exports =
//   process.env.NODE_ENV === "development" ? settings : withPWA(settings);

module.exports =
  process.env.NODE_ENV === "development"
    ? settings
    : withPWA({
        images: {
          imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
      });
