import * as React from 'react';
import { useTasks } from './hooks';
import { useDrop } from 'react-dnd';
import {Task} from './types';
import {useRef} from 'react';
import { ItemTypes } from './dnd';
import DraggableTask from './DraggableTask';

export interface QuadrantProps {
    description: string;
    color: string;
    top: number;
    left: number;
}

const Quadrant = (props: QuadrantProps) => {
    return (
        <div className="Quadrant" style={{
            backgroundColor: props.color,
            border: `1px dashed white`,
            //filter: 'saturate(50%)',
            opacity: 0.7,
            width: '50%',
            height: '50%',
            position: 'absolute',
            pointerEvents: 'none',
            boxSizing: 'border-box',
            color: 'white',
            top: `${props.top * 100}%`,
            left: `${props.left * 100}%`,
            padding: '10px',
        }}>
            {props.description}
        </div>
    )
}

export interface EisenhowerMatrixProps {
}


const EisenhowerMatrix = (props: EisenhowerMatrixProps) => {
    const containerRef = useRef<HTMLDivElement|null>(null);
    const { tasks , addTask, updateTask, clearAllTasks } = useTasks();

    const [, dropTarget] = useDrop(() => ({
        accept: ItemTypes.TASK,
        drop: (item: Task, monitor) => {
            const bounds = containerRef.current?.getBoundingClientRect();
            if (!bounds) {
                return;
            }

            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) {
                return;
            }

            const relativeX = clientOffset.x - bounds.left;
            const relativeY = clientOffset.y - bounds.top;
            const importance = 1 - relativeY / bounds.height;
            const urgency = 1 - relativeX / bounds.width;

            updateTask(item.id, {
                importance,
                urgency,
            });
        },
    }), [updateTask]);

    const drop = React.useCallback((node: HTMLDivElement) => {
        // We need to store a normal react ref to be able to get the dropzone's boundingClientRect
        containerRef.current = node;
        dropTarget(node);
    }, [dropTarget]);

    return (
        <div className="EisenhowerMatrix">
            <div
                ref={drop}
                style={{
                    width: 800,
                    height: 800,
                    // border: '1px solid black',
                    backgroundColor: 'white',
                    position: 'relative',
                    overflow: 'visible',
                }}
            >
                <Quadrant
                    description="Important and Urgent"
                    color="#6a1810"
                    top={0}
                    left={0}
                />
                <Quadrant
                    description="Important and Not Urgent"
                    color="#ac261a"
                    top={0}
                    left={0.5}
                />
                <Quadrant
                    description="Not Important and Urgent"
                    color="#ac261a"
                    top={0.5}
                    left={0}
                />
                <Quadrant
                    description="Not Important and Not Urgent"
                    color="rgb(228, 215, 213)"
                    top={0.5}
                    left={0.5}
                />
                {tasks.map((task) => (
                    <DraggableTask key={task.id} task={task} />
                ))}
            </div>
            <div>
                <button onClick={() => addTask({})}>Add Task</button>
                <button onClick={() => {
                    if (window.confirm("Are you sure you want to clear all tasks?")) {
                        clearAllTasks()
                    }
                }}>Clear All Tasks</button>
            </div>
        </div>
    );
}

export default EisenhowerMatrix;