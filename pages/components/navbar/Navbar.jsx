import styles from './navbar.module.css';

import { signout, auth, database  } from 'utils/firebase.utils';
import Button from 'react-bootstrap/Button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { onValue, ref} from 'firebase/database';
import { useEffect, useState } from 'react';

export default function Navbar () {

    const [currentuser, setUser] = useState(null);
    const [user, loading ] = useAuthState(auth);
    useEffect(() => {
        if(user)
        onValue(ref(database, `users/`), snapshot => {
            if(snapshot.exists()) {
                setUser(snapshot.val());
            }
        })

    },[])



    return (
        <div className={styles.navbarContainer}>
            <div className = { styles.tokenContainer}>
                <span className={styles.largeText}>
                    { currentuser ? (
                        <h4>Players in lobby: {5 - currentuser.vacancy}</h4> 
                    )  : <h4>Sign in To play</h4>}
                </span>
            </div>
            <h3>
                {
                    user ? 
                    <Button 
                    variant="primary" 
                    size='lg'
                    onClick = {() => signout()}
                    >Sign Out</Button> :
                    <h1>🙋‍♂️</h1>
                }
            </h3>
        </div>
    )

}