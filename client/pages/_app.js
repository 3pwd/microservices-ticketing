import 'bootstrap/dist/css/bootstrap.css'

import { Header } from '../components'
import { buildClient } from '../lib'

const _App = ({ Component, pageProps }) => {
  const { currentUser } = pageProps
  return (
    <>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </>
  )
}

// _app doesn't support `getServerSideProps`, use `getInitialProps` instead
// https://nextjs.org/docs/advanced-features/custom-app#caveats
_App.getInitialProps = async appContext => {
  const axios = buildClient(appContext.ctx)
  const { data } = await axios.get('/api/users/currentuser')
  return { pageProps: data }
}

export default _App
