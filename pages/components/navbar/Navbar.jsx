import styles from './navbar.module.css';

import { signout, auth  } from 'utils/firebase.utils';
import Button from 'react-bootstrap/Button';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Navbar () {

    const [user, loading] = useAuthState(auth);

    return (
        <div className={styles.navbarContainer}>
            <h3>Time elapsed</h3>
            <div className = { styles.tokenContainer}>
                <p className={styles.largeText}>
                    { user ? (
                        <h3>Your User Token: {user.uid}<br></br></h3> 
                    )  : <h4>Sign in</h4>}
                </p>
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