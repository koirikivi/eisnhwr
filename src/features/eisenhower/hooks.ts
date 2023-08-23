import * as React from 'react';
import { atom, useAtom} from 'jotai';
import { atomWithStorage} from 'jotai/utils';
import { Task } from './types';

const tasksAtom = atomWithStorage<Task[]>('eisnhwr.tasks', []);

export function useTaskActions() {
    const [, setTasks] = useAtom(tasksAtom);

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
        addTask,
        removeTask,
        updateTask,
        clearAllTasks,
    }
}

const pendingTasksAtom = atom((get) => get(tasksAtom).filter((task) => task.pending));
const nonPendingTasksAtom = atom((get) => get(tasksAtom).filter((task) => !task.pending));

export const usePendingTasks = () => {
    const [pendingTasks] = useAtom(pendingTasksAtom);
    return pendingTasks;
}

export const useNonPendingTasks = () => {
    const [tasks] = useAtom(nonPendingTasksAtom);
    return tasks;
}
