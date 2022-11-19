import Card from '../card/card.jsx';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import Button from "react-bootstrap/Button";
import { onAuthStateChanged} from 'firebase/auth';
import { database, auth } from 'utils/firebase.utils.js';
import { ref, set, get, child } from 'firebase/database';
import styles from './cardContainer.module.css';
import { useListVals } from 'react-firebase-hooks/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { cardsData } from './cardData.js';
export default function CardsContainer() {

    const cardRef = ref(database, 'cards');;
    //user cannot choose a card if he already has a selection

    //hooks for firebase 
    const [cards, loading] = useListVals(cardRef);
    const [available, setAvailable] = useState(true);
    const [user, isLoading] = useAuthState(auth);
    const [selectedIndex, setselectedIndex] = useState(null);
    const [hasSelection, doesHaveSelection] = useState(false);

    //states for drag and drop
    const [isDragging, setIsDragging] = useState(false);


    useEffect(() => {
       onAuthStateChanged(auth, user => {
        if(user){
            
            const dbRef = ref(database);
            get(child(dbRef, `users/vacancy`)).then((snapshot) => {
            if (snapshot.exists()) {
                if(snapshot.val() > 0) {
                    
                    get(ref(database, `users/${user.uid}`)).then(snapshot2 => {
                        if(!snapshot2.exists()){
                            set(ref(database, `users/vacancy`), snapshot.val() - 1);
                            set(ref (database, `users/${user.uid}`), { uid: user.uid})
                        }
                    })
                   
                }else {
                    toast.error('Lobby is full');
                    setAvailable(false);
                }
            } 
            }).catch((error) => {
            console.error(error);
            });
        }
        else {
            const dbRef = ref(database);
            get(child(dbRef, `users/vacancy`)).then((snapshot) => {
            if (snapshot.exists()) {
                if(snapshot.val() < 5)
                set(ref(database, `users/vacancy`), snapshot.val() + 1);
                if(snapshot.val() + 1 >= 5) {
                    set(ref(database, `users/`), null);
                    set(ref(database, `users/vacancy`), 5);
                    cardsData.map(card => {
                        set(ref(database, `cards/${card.id}`), card);
                    })
                }
            } 
            }).catch((error) => {
            console.error(error);
            });
        }
       }) 

       verifyEverything();

    }, [])

    const verifyEverything = () => {
        
        const dbRef = ref(database);
        get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            const { canSelect } = snapshot.val();
            doesHaveSelection(canSelect);
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        });


    }


    const eventControl = (event) => {

        if (event.type === 'mousemove' || event.type === 'touchmove') {
        setIsDragging(true)
        }

        if (event.type === 'mouseup' || event.type === 'touchend') {
        setTimeout(() => {
            setIsDragging(false);
        }, 100);

        }
    }


    const handleClick = (index) => {
        //e.preventDefault();
       if(!isDragging && !hasSelection && !cards[index].selected) 
        setselectedIndex(index);

        console.log(user);
    }

    const lockSelection = () => {
       console.log(user);
       if(!cards[selectedIndex].selected) {
        const tempCard = cards.at(selectedIndex);
        tempCard.selected = true;
        tempCard.uid = user.uid;
        console.log({tempCard, selectedIndex});
        doesHaveSelection(true);
        //const cardUpdateRef = ;
        set(ref(database, `cards/${selectedIndex}`), tempCard);
        set(ref(database, `users/${user.uid}`), {
            uid: user.uid,
            canSelect: true
        })
       }
    }

    return (
        <div className={styles.cardParent}>
           {
            loading ? <h1>Loading ... </h1> : available ?
           (
            <>
             <DragDropContext>
             <Droppable droppableId='listitems' direction='horizontal'>
                {
                    provided => (
                    <ul className={styles.cardContainer} 
                    {...provided.droppableProps} ref={provided.innerRef}>
                        {cards.map((card, index) => (
                            <Draggable 
                            key={card.id} 
                            onDrag={eventControl}
                            onStop={eventControl}
                            draggableId={ card.id.toString() } index={index}>
                                { providede => (
                                    <li 
                                    onClick={() => handleClick(card.id)}
                                    { ...providede.draggableProps} 
                                    { ...providede.dragHandleProps}
                                    ref={ providede.innerRef}>
                                        <Card {...card} currentUseruid = {user.uid} selected = {selectedIndex == card.id}/>
                                    </li>
                                )
                                }
                            </Draggable>
                           
                          
                        ))}
                         { provided.placeholder}
                    </ul>
                    )
                }
            </Droppable>
            </DragDropContext>

            <Button 
            className ={styles.button}
            variant="primary" 
            size='lg'
            onClick = {() => lockSelection()}
            disabled ={ hasSelection }
            style={{
                width: '200px'
            }}>Select</Button>
            </>
           ) : <h1>Lobby is full, please try again later</h1>
            }
        </div>
    )
}