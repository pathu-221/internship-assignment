import Card from '../card/card.jsx';
import { cards } from './cardData.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import styles from './cardContainer.module.css';

export default function CardsContainer() {
    return (
        <>
            <DragDropContext>
                <Droppable droppableId='listitems' direction='horizontal'>
                    {
                        provided => (
                        <ul className={styles.cardContainer} 
                        {...provided.droppableProps} ref={provided.innerRef}>
                            {cards.map((card, index) => (
                                <Draggable key={card.id} draggableId={ card.id.toString() } index={index}>
                                    { providede => (
                                        <li 
                                        { ...providede.draggableProps} 
                                        { ...providede.dragHandleProps}
                                        ref={ providede.innerRef}>
                                            <Card {...card} />
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
        </>
    )
}