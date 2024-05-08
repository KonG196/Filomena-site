import '../styles/globals.css'
import '../fonts/stylesheet.css'

import Layout from '../components/Layout'


function MyApp({ Component, pageProps }) {
  
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
