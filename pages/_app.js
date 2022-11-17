import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/navbar/Navbar.jsx';

function MyApp({ Component, pageProps }) {

  
  return (
    <>
    <Navbar />
    <Component {...pageProps} />
    <Toaster />
    </>
  )
}

export default MyApp
