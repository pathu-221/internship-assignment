
import Button from "react-bootstrap/Button";
import styles from '../styles/Home.module.css';
import { signinwithgoogle, auth, signinanonymous } from "../utils/firebase.utils";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from "react";
import { useRouter } from "next/router";
import CardsContainer from './components/cardContainer/cardContainer';
export default function Home() {

  const router = useRouter();
  //useauthstate hook handle all the user authentication
  const [user, loading, error] = useAuthState(auth);



  useEffect(() => {

    return () => {
    }
  }, [])
  

  return (
    <div className={styles.app}>
      {
        loading ? <h1>loading...</h1> :
        !user && <Login /> 
      }
      { 
       user ? (
          
        <CardsContainer />) : null
      }
    </div>
  );
}



function Login () {
  
  return (
    <>
    <Button 
    className ={styles.button}
    variant="secondary"
    onClick = { signinanonymous} 
    size='lg'>Sign In anonymous</Button>
    <Button 
    className ={styles.button}
    variant="primary" 
    onClick={signinwithgoogle}
    size='lg'>Sign In with google
    </Button>
    </>
  )
}