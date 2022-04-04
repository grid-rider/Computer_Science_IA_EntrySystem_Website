
import { extendTheme } from '@chakra-ui/react';

/*
This is part of the Chakra Provider and set's the initial Dark/Light Mode State
*/
const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const theme = extendTheme({ config })

export default theme