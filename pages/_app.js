import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/navbar/Navbar.jsx';
import Head from "next/head"
function MyApp({ Component, pageProps }) {

  
  return (
  
    <>
    <Head>
    <title>Task</title>
    {/* for mobile view */}
      <meta name="viewport" content="width=device-width initial-scale = 1"></meta> 
    </Head>
    <Navbar />
    <Component {...pageProps} />
    <Toaster />
    </>
  )
}

export default MyApp
