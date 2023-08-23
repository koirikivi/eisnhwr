import * as React from 'react';
import PendingTasks from './PendingTasks';
import NewTaskForm from './NewTaskForm';

const TaskSidebar = () => {
    return (
        <aside
            className="TaskSidebar"
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}
        >
            <PendingTasks />
            <NewTaskForm />
        </aside>
    );
}

export default TaskSidebar;