import styles from './navbar.module.css';

export default function Navbar () {

    return (
        <div className={styles.navbarContainer}>
            <h3>Time elapsed</h3>
            <div className = { styles.tokenContainer}>
                <p className={styles.largeText}>
                    Your User Token: <br></br>
                    selected Card: <br></br>
                </p>
            </div>
            <h3>Extras 🎃</h3>
        </div>
    )

}