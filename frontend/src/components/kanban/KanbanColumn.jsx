import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import KanbanCard from './KanbanCard';

const KanbanColumn = ({ title, tasks }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-3 w-80 flex-shrink-0 h-full">
      <div className="flex justify-between items-center mb-4 px-1">
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <span className="bg-gray-300 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>
      <Droppable droppableId={title}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="h-full overflow-y-auto pb-16"
          >
            {tasks.map((task, index) => (
              <KanbanCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;
