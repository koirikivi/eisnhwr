import * as React from 'react';
import {useTaskActions} from './hooks';

const initialNewTaskProps = {
    name: '',
    description: '',
    project: '',
};

const NewTaskForm = () => {
    const { addTask, clearAllTasks } = useTaskActions();

    const [newTaskProps, setNewTaskProps] = React.useState(initialNewTaskProps);

    const editHandler = React.useCallback(
        (propName: string) => (e: React.ChangeEvent<any>) => {
            setNewTaskProps((prev) => ({
                ...prev,
                [propName]: e.target.value,
            }));
        },
        [setNewTaskProps],
    );

    const onSubmit = React.useCallback((e: any) => {
        e.preventDefault();
        if (!newTaskProps.name) {
            alert('Name must be given');
            return;
        }
        addTask(newTaskProps);
        setNewTaskProps(initialNewTaskProps);
    }, [newTaskProps, setNewTaskProps, addTask]);

    return (
        <section
            className="NewTaskForm"
        >
            <h3>Add a new task</h3>

            <form
                onSubmit={onSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                }}
            >
                <input
                    autoComplete={'off'}
                    placeholder={'Task name'}
                    value={newTaskProps.name}
                    onChange={editHandler('name')}
                />
                <input
                    autoComplete={'off'}
                    placeholder={'Project'}
                    value={newTaskProps.project}
                    onChange={editHandler('project')}
                />
                <textarea
                    autoComplete={'off'}
                    placeholder={'Description'}
                    value={newTaskProps.description}
                    onChange={editHandler('description')}
                ></textarea>
                <button onClick={onSubmit}>Add Task</button>
            </form>


            {/* Have this here for a lack of a better place */}
            <button
                style={{
                    marginTop: '10px',
                    float: 'right',
                    opacity: 0.5,
                }}
                onClick={() => {
                    if (window.confirm("Are you sure you want to clear all tasks?")) {
                        clearAllTasks()
                    }
                }
            }>Clear All Tasks</button>
        </section>
    );
}

export default NewTaskForm;
