
import styles from './card.module.css';

export default function Card(props) {
    const { imageUrl } = props;

    return (
        <div className={styles.container}>
            <img className={ styles.image } src={imageUrl} alt='vegetable'/>
        </div>
    )
}