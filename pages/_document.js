import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <title>BoardLease : locations de surfs entre particuliers</title>
        <meta
          property="og:title"
          content="BoardLease : locations de surfs entre particuliers"
        />
        {/* <script
          src="https://widget.cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
        ></script> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
