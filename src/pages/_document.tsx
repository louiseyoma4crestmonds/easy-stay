import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <script src="https://checkout.flutterwave.com/v3.js"></script>

      <body>
        <Main />
        <NextScript />
        <div id="modalSlot" />
      </body>
    </Html>
  );
}
