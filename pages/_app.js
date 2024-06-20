import '../styles/globals.css';
import '../fonts/stylesheet.css';
import Head from 'next/head';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  const { locale } = pageProps;
  const siteTitle = locale === 'en' ? 'Filomena' : 'Філомена';

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Layout locale={locale}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
