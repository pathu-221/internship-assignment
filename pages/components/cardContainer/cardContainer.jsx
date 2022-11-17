import Card from '../card/card.jsx';
import { cards } from './cardData.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import styles from './cardContainer.module.css';

export default function CardsContainer() {
    return (
        <>
            <DragDropContext>
                <Droppable droppableId='listitems'>
                    {
                        provided => (
                        <div className={styles.cardContainer} 
                        {...provided.droppableProps} ref={provided.innerRef}>
                            {cards.map((card, index) => (
                                <Draggable key={card.id} type="TASK"  draggableId={ card.id } index={index}>
                                    { providede => (
                                        <span 
                                        { ...providede.draggableProps} 
                                        { ...providede.dragHandleProps}
                                        ref={ providede.innerRef}>
                                            <Card {...card} />
                                        </span>
                                    )
                                    }
                                </Draggable>
                               
                                
                            ))}
                             { provided.placeholder}
                        </div>
                        )
                    }
                </Droppable>


            </DragDropContext>
        </>
    )
}