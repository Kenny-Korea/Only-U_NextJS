const settings = {
  images: {
    // loader: 이미지 최적화 작업을 해주는 외부 서비스 지정(Akamai, Imgix 등). Vercel 배포의 경우, vercel에서 알아서 최적화 해주므로 지정할 필요 없음
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640],
    domains: [
      "firebasestorage.googleapis.com",
      "maps.googleapis.com",
      "only-u.vercel.app",
    ],
  },
};

/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports =
  process.env.NODE_ENV === "development" ? settings : withPWA(settings);
