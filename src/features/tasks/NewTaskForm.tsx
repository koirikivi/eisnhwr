import * as React from 'react';
import {useTaskActions} from './hooks';
import TaskForm from './TaskForm';

const initialNewTaskProps = {
    name: '',
    description: '',
    project: '',
};

const NewTaskForm = () => {
    const { addTask, clearAllTasks } = useTaskActions();

    return (
        <section
            className="NewTaskForm"
        >
            <h3>Add a new task</h3>

            <TaskForm
                task={initialNewTaskProps}
                submitLabel="Add task"
                onSubmit={addTask}
                keepAfterSubmit={['project']}
            />

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
