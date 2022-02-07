import '../styles/Account.css';
import '../styles/globals.css';
import {AuthProvider} from '../components/Firebase/Context/authUserContext.js';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
    return (
      <ChakraProvider>
        <AuthProvider>
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,400;0,800;0,900;1,100&display=swap" rel="stylesheet"></link>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>

    )
}
  
export default MyApp