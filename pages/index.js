
import Button from "react-bootstrap/Button";
import styles from '../styles/Home.module.css';
import { signinwithgoogle, auth, signinanonymous } from "../utils/firebase.utils";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from "react";
import CardsContainer from '../components/cardContainer/cardContainer';



//default home page

export default function Home() {

  //useauthstate hook handle all the user authentication
  const [user, loading, error] = useAuthState(auth);

  return (
    //after user signs in show the cards container component
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
  
  const [loading, setLoading] = useState(false);

  return (
    <>
    <Button 
    className ={styles.button}
    variant="secondary"
    onClick = { () => {signinanonymous(); setLoading(true)}} 
    disabled={loading}
    size='lg'>
      {
        loading ? 'loading...' : 'Sign In anonymous'
      }
    </Button>
    <Button 
    className ={styles.button}
    variant="primary" 
    onClick={signinwithgoogle}
    size='lg'>Sign In with google
    </Button>
    </>
  )
}