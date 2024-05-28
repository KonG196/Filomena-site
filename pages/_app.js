//----------------
import '../styles/globals.css'
import '../fonts/stylesheet.css'


import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  const { locale } = pageProps;

  return (
    <Layout locale={locale}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
