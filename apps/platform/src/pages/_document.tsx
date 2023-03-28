import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { poppins } from './_app';
import Script from 'next/script';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="icon"
            type="image/png"
            sizes="64x64"
            href="/favicon-64x64.png"
          />
          <Script
            strategy="afterInteractive"
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`}
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
  
        gtag('config', '${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}');
        gtag('consent', 'default', {
          ad_storage: 'denied',
          analytics_storage: 'denied',
        });
        `}
          </Script>
        </Head>
        <body className={`${poppins.className} flex min-h-screen flex-col`}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
