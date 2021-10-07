import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/pwa-192x192.png" />
          <link rel="mask-icon" href="/favicon.svg" color="#FFFFFF" />
          <meta name="msapplication-TileColor" content="#FFFFFF" />
          <meta name="theme-color" content="#ffffff" />
          <script
            type="module"
            src="/src/main.tsx"
            dangerouslySetInnerHTML={{ __html: `` }}
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
