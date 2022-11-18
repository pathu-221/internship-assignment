
import styles from './card.module.css';

export default function Card(props) {
    const { imageUrl, selected } = props;

    return (
        <div className={`${styles.container} ${ selected ? `${styles.selected}`: ''}` } >
            <img className={ styles.image } src={imageUrl} alt='vegetable'/>
        </div>
    )
}