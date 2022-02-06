import '../styles/Account.css';
import '../styles/globals.css';
import {AuthProvider} from '../components/Firebase/Context/authUserContext.js';
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
    return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>)
}
  
export default MyApp