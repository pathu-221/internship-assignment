
import styles from './card.module.css';

export default function Card(props) {
    const { imageUrl, selected, uid, currentUseruid } = props;


    return (
        <div 
        className={`${styles.container} ${selected ? `${styles.selected}` : ''} ${ uid  ? `${styles.disabled}`: ''}`}
         >
            <div className = {`${styles.greyDiv} ${ uid ? '' : `${ styles.hidden}`}`}></div>
            <img className={ styles.image } src={imageUrl} alt='vegetable'/>

        </div>
    )
}