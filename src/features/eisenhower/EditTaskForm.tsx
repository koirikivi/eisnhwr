import * as React from 'react';
import {useCurrentlyEditedTask, useSetCurrentlyEditedTask, useTaskActions} from './hooks';
import TaskForm from './TaskForm';

const EditTaskForm = () => {
    const { updateTask } = useTaskActions();
    const currentlyEditedTask = useCurrentlyEditedTask();
    const setCurrentlyEditedTask = useSetCurrentlyEditedTask();

    return (
        <section
            className="EditTaskForm"
        >
            {!!currentlyEditedTask && (
                <React.Fragment>
                    <h3>Edit task</h3>

                    <TaskForm
                        task={currentlyEditedTask}
                        submitLabel="Edit task"
                        onSubmit={task => {
                            updateTask(task.id!, task);
                            setCurrentlyEditedTask(null);
                        }}
                    />
                </React.Fragment>
            )}
        </section>
    );
}

export default EditTaskForm;
