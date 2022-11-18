import Card from '../card/card.jsx';
import { cardsData } from './cardData.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';

import styles from './cardContainer.module.css';

export default function CardsContainer() {

    // const cards_ = cards;

    const [cards, updateCards] = useState(cardsData);
    const [selectedIndex, setselectedIndex] = useState(null);

    const [isDragging, setIsDragging] = useState(false);

    const eventControl = (event, info) => {


        if (event.type === 'mousemove' || event.type === 'touchmove') {
        setIsDragging(true)
        }

        if (event.type === 'mouseup' || event.type === 'touchend') {
        setTimeout(() => {
            setIsDragging(false);
        }, 100);

        }
    }

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(cards);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
    
        updateCards(items);
    }

    const handleClick = (index) => {
        //e.preventDefault();

       if(!isDragging)
        setselectedIndex(index);

        console.log(cards)
    }

    return (
        <div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
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
                                            <Card {...card} selected = {selectedIndex == card.id}/>
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
        </div>
    )
}