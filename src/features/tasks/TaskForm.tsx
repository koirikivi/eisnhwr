import * as React from 'react';
import {Task} from './types';

export interface TaskFormProps {
    task: Partial<Task>;
    submitLabel: string;
    onSubmit: (task: Partial<Task>) => void;
    extraButtons?: React.ReactNode;
    keepAfterSubmit?: (keyof Task)[];
}

const TaskForm = (props: TaskFormProps) => {
    const {
        task,
        submitLabel,
        onSubmit,
        extraButtons,
        keepAfterSubmit,
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

        const resetedValue: Partial<Task> = {};
        if (keepAfterSubmit) {
            for (const key of keepAfterSubmit) {
                if (editedProps[key] !== undefined) {
                    resetedValue[key] = (editedProps[key] as any);
                }
            }
        }
        setEditedProps(resetedValue);
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
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'stretch',
                    gap: '5px',
                }}
            >
                <button
                    onClick={handleSubmit}
                    style={{
                        flexGrow: 1,
                    }}
                >
                    {submitLabel}
                </button>
                {extraButtons}
            </div>
        </form>
    );
}

export default TaskForm;
