import * as React from 'react';
import DraggableTask from './DraggableTask';
import {usePendingTasks, useTaskActions} from '../tasks/hooks';
import {useDrop} from 'react-dnd';
import {ItemTypes} from './dnd';
import {Task} from '../tasks/types';

const PendingTasks = () => {
    const pendingTasks = usePendingTasks();
    const { updateTask } = useTaskActions();

    const [, dropTarget] = useDrop(() => ({
        accept: ItemTypes.TASK,
        drop: (item: Task, monitor) => {
            updateTask(item.id, {
                pending: true,
            });
        }
    }), [updateTask]);

    return (
        <div
            ref={dropTarget}
            className="PendingTasks"
            style={{
                minHeight: '100px',
            }}
        >
            <h3>
                Unprioritised tasks
                {pendingTasks.length !== 0 && (
                    <small><br/>Drag tasks to the matrix to prioritize.</small>
                )}
            </h3>
            {pendingTasks.map((task) => (
                <DraggableTask key={task.id} task={task} />
            ))}
            {pendingTasks.length === 0 && (
                <div>No unprioritised tasks! Drag here to unprioritize.</div>
            )}
        </div>
    );
}

export default PendingTasks;