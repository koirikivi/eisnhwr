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


    const leftPct = 1 - task.urgency;
    const topPct = 1 - task.importance;
    return (
        <div
            ref={drag}
            className="DraggableTask"
            style={{
                opacity: isDragging ? 0.0 : 1,
                padding: '5px',
                cursor: 'move',
                // border: '1px solid black',
                backgroundColor: 'white',
                boxSizing: 'border-box',
                // TODO: figure out issues with boxShadow and dragging
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
                position: 'absolute',
                // maxWidth: '20%',
                // maxHeight: '20%',
                transform: 'translate(-50%, -50%)',
                left: `${leftPct * 100}%`,
                top: `${topPct * 100}%`,
            }}
        >
            {task.name}
        </div>
    )
}

export default DraggableTask;