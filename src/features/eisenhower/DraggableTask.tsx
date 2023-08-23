import {Task} from './types';
import {useDrag} from 'react-dnd';
import {ItemTypes} from './dnd';
import * as React from 'react';

interface DraggableTaskProps {
    task: Task;
}
const DraggableTask = (props: DraggableTaskProps) => {
    const {
        task,
    } = props;
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
            }}
        >
            {!!task.project && (
                <strong>{task.project}:&nbsp;</strong>
            )}
            {task.name}
        </div>
    )
}

export default DraggableTask;