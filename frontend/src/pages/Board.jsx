import React from 'react';
import Header from '../components/common/Header';
import KanbanBoard from '../components/kanban/KanbanBoard';

const Board = () => {
    return (
        <div className="w-full h-screen flex flex-col">
            <Header title="Maintenance Kanban Board" />
            <div className="flex-grow">
                <KanbanBoard />
            </div>
        </div>
    );
};

export default Board;
