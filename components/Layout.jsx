// here we will render our footer, navigation bar and the content in the middle

import Head from "next/head";
import { Box } from "@chakra-ui/react";
import NavBar from "./NavBar";
import Footer from "./Footer";


const Layout = ({ children }) => (
  <>
    <Head >
      <title>Real Estate</title>
    </Head>

    <Box maxWidth="1280px" m="auto" >
      <header>
        <NavBar />
      </header>
      <main>
        {children}
        {/* children prop is equal to whatever we pass into the Layout component 
                basically it is what inside the Layout component*/}
      </main>
      <footer>
        <Footer />
      </footer>
    </Box>
  </>
);

export default Layout;
