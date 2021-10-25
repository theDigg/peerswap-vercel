/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "Peerswap",
  titleTemplate: "%s | Peerswap",
  defaultTitle: "Peerswap",
  description:
    "The place to show the world your coding IQ through clever tricks and techniques",
  canonical: "https://peerswap-testnet.vercel.app",
  openGraph: {
    url: "https://peerswap-testnet.vercel.app",
    title: "Peerswap",
    description:
      "The place to swap any asset class without a middleman.",
    images: [
      {
        url: "https://og-image.sznm.dev/**nextmui-starter**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250",
        alt: "nextmui-starter.sznm.dev og-image",
      },
    ],
    site_name: "Peerswap",
  },
  twitter: {
    handle: "@shardus",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
