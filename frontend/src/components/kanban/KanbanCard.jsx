import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

const KanbanCard = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-lg shadow p-3 mb-3 cursor-grab active:cursor-grabbing"
        >
          <p className="text-sm font-medium text-gray-800">{task.title}</p>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard;
