
import Button from "react-bootstrap/Button";
import styles from '../styles/Home.module.css';
import { signinwithgoogle, auth } from "../utils/firebase.utils";
import { useAuthState } from 'react-firebase-hooks/auth';
import CardsContainer from './components/cardContainer/cardContainer';


export default function Home() {

  //useauthstate hook handle all the user authentication
  const [user, loading, error] = useAuthState(auth);

  console.log(user);

  return (
    <div className={styles.app}>
      {
        !user ? <Login /> : <CardsContainer />
      }
    </div>
  );
}



function Login () {
  
  return (
    <>
    <Button className ={styles.button}variant="secondary" size='lg'>Sign In anonymous</Button>
      <Button 
      className ={styles.button}
      variant="primary" 
      onClick={signinwithgoogle}
      size='lg'>Sign In with google
    </Button>
    </>
  )
}