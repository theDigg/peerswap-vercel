const title = "Peerswap – The easiest way to swap assets without a middleman.";
const description =
  "Peerswap is being built for the use of exchanging assets of any class in a decentralized fashion. The underlying blockchain network is build with shardus.";

/** @type {import('next-seo').DefaultSeoProps} */
const SEO = {
  title,
  description,
  canonical: "https://peerswap.vercel.app",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://peerswap.vercel.app",
    title,
    description,
    images: [
      {
        url: "https://peerswap.vercel.app/icon-512x512.png",
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
  twitter: {
    handle: "@ShardusLedger",
    cardType: "summary_large_image",
  },
};

export default SEO;

// const defaultSEOConfig = {
//   title: "Peerswap",
//   titleTemplate: "%s",
//   defaultTitle: "Peerswap",
//   description: "The place to swap any asset class without a middleman.",
//   canonical: "https://peerswap.vercel.app/",
//   openGraph: {
//     url: "https://peerswap.vercel.app/",
//     title: "Peerswap",
//     description: "The place to swap any asset class without a middleman.",
//     images: [
//       {
//         url: "https://og-image.sznm.dev/**nextmui-starter**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250",
//         alt: "nextmui-starter.sznm.dev og-image",
//       },
//     ],
//     site_name: "Peerswap",
//   },
//   twitter: {
//     handle: "@ShardusLedger",
//     cardType: "summary_large_image",
//   },
// };

// export default defaultSEOConfig;