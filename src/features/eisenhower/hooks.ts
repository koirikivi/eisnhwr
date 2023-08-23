import * as React from 'react';
import { atom, useAtom} from 'jotai';
import { atomWithStorage} from 'jotai/utils';
import { Task } from './types';

const tasksAtom = atomWithStorage<Task[]>('eisnhwr.tasks', []);
const pendingTasksAtom = atom((get) => get(tasksAtom).filter((task) => task.pending));

export function useTasks() {
    const [tasks, setTasks] = useAtom(tasksAtom);

    const addTask = React.useCallback(
        (addedTask: Partial<Exclude<Task, 'id'>>) => {
            const id = Date.now();
            const task: Task = {
                id,
                name: `New task`,
                description: '',
                urgency: 0.5,
                importance: 0.5,
                pending: true,
                completed: false,
                addedOn: new Date().toISOString(),
                ...addedTask,
            }
            setTasks((tasks) => [...tasks, task]);
        },
        [setTasks]
    );

    const removeTask = React.useCallback(
        (id: number) => {
            setTasks((tasks) => tasks.filter((task) => task.id !== id));
        },
        [setTasks]
    );

    const updateTask = React.useCallback(
        (id: number, updatedTask: Partial<Exclude<Task, 'id'>>) => {
            setTasks((tasks) => tasks.map((task) => {
                if (task.id === id) {
                    return {
                        ...task,
                        ...updatedTask,
                    }
                }
                return task;
            }))
        },
        [setTasks]
    );

    const clearAllTasks = React.useCallback(() => {
        setTasks([]);
    }, [setTasks]);

    return {
        tasks,
        addTask,
        removeTask,
        updateTask,
        clearAllTasks,
    }
}