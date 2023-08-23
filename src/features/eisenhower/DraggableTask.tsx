import * as React from 'react';
import {Task} from '../tasks/types';
import {useDrag} from 'react-dnd';
import {ItemTypes} from './dnd';
import {useSetCurrentlyEditedTask, useTaskActions} from '../tasks/hooks';

interface DraggableTaskProps {
    task: Task;
    editable?: boolean;
    completable?: boolean;
}
const DraggableTask = (props: DraggableTaskProps) => {
    const {
        task,
        editable = true,
        completable = true,
    } = props;

    const setCurrentlyEditedTask = useSetCurrentlyEditedTask();
    const { updateTask } = useTaskActions();

    const [{isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.TASK,
        item: task,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [task]);

    return (
        <div
            ref={drag}
            className="DraggableTask"
            style={{
                opacity: isDragging ? 0.0 : 1,
                padding: '5px',
                cursor: 'move',
                border: '1px solid black',
                backgroundColor: 'white',
                boxSizing: 'border-box',
                color: 'black',
                textDecoration: task.completed ? 'line-through' : 'none',
            }}
        >
            {completable && (
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={(e) => {
                        updateTask(task.id!, {
                            completed: e.target.checked,
                        });
                    }}
                />
            )}
            {!!task.project && (
                <strong>{task.project}:&nbsp;</strong>
            )}
            {task.name}
            {editable && (
                <button
                    type={'button'}
                    style={{
                        float: 'right',
                        opacity: 0.5,
                        // disable button styles
                        border: 'none',
                        outline: 'none',
                        background: 'none',
                        cursor: 'pointer',
                    }}
                >
                    <span
                        role="img"
                        aria-label="Edit"
                        onClick={() => setCurrentlyEditedTask(task)}
                    >
                        ✏️
                    </span>
                </button>
            )}
        </div>
    )
}

export default DraggableTask;