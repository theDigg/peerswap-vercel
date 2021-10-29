// const withPWA = require("next-pwa");
// const runtimeCaching = require("next-pwa/cache");

// module.exports = withPWA({
//   pwa: {
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//     runtimeCaching,
//     disable: process.env.NODE_ENV === "development",
//   },
//   // swcMinify: true,
// });

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

const nextConfig = {
  // any configs you need
  swcMinify: true,
};

module.exports = nextConfig;
