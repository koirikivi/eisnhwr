import * as React from 'react';
import {Task} from './types';

export interface TaskFormProps {
    task: Partial<Task>;
    submitLabel: string;
    onSubmit: (task: Partial<Task>) => void;
}

const TaskForm = (props: TaskFormProps) => {
    const {
        task,
        submitLabel,
        onSubmit,
    } = props;
    const [editedProps, setEditedProps] = React.useState<Partial<Task>>(task);

    const editHandler = React.useCallback(
        (propName: string) => (e: React.ChangeEvent<any>) => {
            setEditedProps((prev) => ({
                ...prev,
                [propName]: e.target.value,
            }));
        },
        [setEditedProps],
    );

    const handleSubmit = React.useCallback((e: any) => {
        e.preventDefault();
        if (!editedProps.name) {
            alert('Name must be given');
            return;
        }

        onSubmit(editedProps);
        setEditedProps({});
    }, [editedProps, setEditedProps, onSubmit]);

    return (
        <form
            className="TaskForm"
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
            }}
        >
            <input
                autoComplete={'off'}
                placeholder={'Task name *'}
                value={editedProps.name ?? ''}
                onChange={editHandler('name')}
            />
            <input
                autoComplete={'off'}
                placeholder={'Project'}
                value={editedProps.project ?? ''}
                onChange={editHandler('project')}
            />
            <textarea
                autoComplete={'off'}
                placeholder={'Description'}
                value={editedProps.description ?? ''}
                onChange={editHandler('description')}
            ></textarea>
            <button onClick={handleSubmit}>
                {submitLabel}
            </button>
        </form>
    );
}

export default TaskForm;
