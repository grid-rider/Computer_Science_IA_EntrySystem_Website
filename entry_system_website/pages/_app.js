
import theme from '../components/ChakraUI/theme'
import { ColorModeScript } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'

//Importing custom Authprovider
import {AuthProvider} from '../components/Firebase/Context/authUserContext.js';

function MyApp({ Component, pageProps }) {

  //variable need in teacher section to deal with Layout provider and layout view
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <ChakraProvider> {/** Provider used to enable Chakra components */}
      <AuthProvider>  {/** Provider used to give acess to the globl state of the auth system */}
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
        <link 
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,400;0,800;0,900;1,100&display=swap" 
        rel="stylesheet"></link>
        {getLayout(<Component {...pageProps} />)}
      </AuthProvider>
    </ChakraProvider>


  )
}
  
export default MyApp