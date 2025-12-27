import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'; // Ensure Droppable/Draggable are imported
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

const dummyTasks = [
  { id: '1', title: 'Repair engine on Excavator #210', status: 'In Progress', priority: 'High', type: 'Repair' },
  { id: '2', title: 'Inspect Bulldozer #D6 tracks', status: 'New', priority: 'Medium', type: 'Inspection' },
  { id: '3', title: 'Replace angle grinder brushes', status: 'Repaired', priority: 'Low', type: 'Maintenance' },
  { id: '4', title: 'Scrap broken drill press #DP-01', status: 'Scrap', priority: 'Low', type: 'Scrap' },
  { id: '5', title: 'Order new hydraulic pump for crane', status: 'New', priority: 'High', type: 'Order' },
  { id: '6', title: 'Perform 500-hour service on Hauler', status: 'In Progress', priority: 'Medium', type: 'Service' },
];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(dummyTasks);
  const columns = ['New', 'In Progress', 'Repaired', 'Scrap'];

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const updatedTasks = tasks.map(task =>
      task.id === draggableId
        ? { ...task, status: destination.droppableId }
        : task
    );
    setTasks(updatedTasks);
  };

  const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-full gap-6 overflow-x-auto pb-4">
        {columns.map(columnId => (
          <div key={columnId} className="min-w-[300px] w-[300px] bg-slate-50 dark:bg-slate-900 rounded-2xl flex flex-col border border-slate-200 dark:border-slate-800">
            {/* Column Header */}
            <div className={`p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center rounded-t-2xl ${columnId === 'New' ? 'bg-blue-50 dark:bg-blue-900/10' :
                columnId === 'In Progress' ? 'bg-amber-50 dark:bg-amber-900/10' :
                  columnId === 'Repaired' ? 'bg-emerald-50 dark:bg-emerald-900/10' :
                    'bg-slate-100 dark:bg-slate-800'
              }`}>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${columnId === 'New' ? 'bg-blue-500' :
                    columnId === 'In Progress' ? 'bg-amber-500' :
                      columnId === 'Repaired' ? 'bg-emerald-500' :
                        'bg-slate-500'
                  }`}></span>
                <h3 className="font-bold text-slate-700 dark:text-slate-200">{columnId}</h3>
                <span className="text-xs font-medium bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500">
                  {getTasksByStatus(columnId).length}
                </span>
              </div>
              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <EllipsisHorizontalIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Droppable Area */}
            <Droppable droppableId={columnId}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex-1 p-3 flex flex-col gap-3 overflow-y-auto transition-colors ${snapshot.isDraggingOver ? 'bg-slate-100 dark:bg-slate-800/50' : ''}`}
                >
                  {getTasksByStatus(columnId).map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`
                            bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700
                            hover:shadow-md transition-shadow group
                            ${snapshot.isDragging ? 'shadow-lg rotate-2 ring-2 ring-blue-500/20' : ''}
                          `}
                          style={provided.draggableProps.style}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${task.priority === 'High' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                                task.priority === 'Medium' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' :
                                  'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                              }`}>
                              {task.priority}
                            </span>
                          </div>
                          <p className="font-medium text-slate-700 dark:text-slate-200 text-sm mb-3">
                            {task.title}
                          </p>
                          <div className="flex items-center justify-between mt-auto">
                            <span className="text-xs text-slate-400">#task-{task.id}</span>
                            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400"></div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;