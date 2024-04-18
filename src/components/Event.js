import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const DraggableEvent = ({ event }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.EVENT,
    item: { id: event.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {event.title}
    </div>
  );
};

export default DraggableEvent;
