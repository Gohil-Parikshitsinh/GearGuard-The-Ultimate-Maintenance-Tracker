import React, { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import KanbanColumn from './KanbanColumn';

const dummyTasks = [
  { id: '1', title: 'Repair engine on Excavator #210', status: 'In Progress' },
  { id: '2', title: 'Inspect Bulldozer #D6 tracks', status: 'New' },
  { id: '3', title: 'Replace angle grinder brushes', status: 'Repaired' },
  { id: '4', title: 'Scrap broken drill press #DP-01', status: 'Scrap' },
  { id: '5', title: 'Order new hydraulic pump for crane', status: 'New' },
  { id: '6', title: 'Perform 500-hour service on Hauler #A30G', status: 'In Progress' },
  { id: '7', title: 'Calibrate welding machine #WM-02', status: 'New' },
  { id: '8', title: 'Fixed faulty wiring on lighting tower', status: 'Repaired' },
  { id: '9', title: 'Generator #G-15 not starting', status: 'In Progress' },
  { id: '10', title: 'Final check on repaired compressor', status: 'Repaired' },
];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(dummyTasks);
  const columns = ['New', 'In Progress', 'Repaired', 'Scrap'];

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedTasks = tasks.map(task => 
      task.id === draggableId 
        ? { ...task, status: destination.droppableId }
        : task
    );

    setTasks(updatedTasks);
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 p-4 overflow-x-auto h-full w-full">
        {columns.map(columnTitle => (
          <KanbanColumn
            key={columnTitle}
            title={columnTitle}
            tasks={getTasksByStatus(columnTitle)}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;