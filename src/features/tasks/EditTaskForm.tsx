import * as React from 'react';
import {useCurrentlyEditedTask, useSetCurrentlyEditedTask, useTaskActions} from './hooks';
import TaskForm from './TaskForm';

const EditTaskForm = () => {
    const { updateTask, removeTask } = useTaskActions();
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
                        key={currentlyEditedTask.id}
                        task={currentlyEditedTask}
                        submitLabel="Save changes"
                        onSubmit={task => {
                            updateTask(task.id!, task);
                            setCurrentlyEditedTask(null);
                        }}
                        extraButtons={
                            <React.Fragment>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (window.confirm("Are you sure you want to delete this task?")) {
                                            removeTask(currentlyEditedTask.id!);
                                            setCurrentlyEditedTask(null);
                                        }
                                    }}
                                >Delete</button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCurrentlyEditedTask(null);
                                    }}
                                >Close</button>
                            </React.Fragment>
                        }
                    />
                </React.Fragment>
            )}
        </section>
    );
}

export default EditTaskForm;
