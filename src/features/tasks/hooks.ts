import * as React from 'react';
import { atom, useSetAtom, useAtomValue, } from 'jotai';
import { atomWithStorage} from 'jotai/utils';
import { Task } from './types';

const tasksAtom = atomWithStorage<Task[]>('eisnhwr.tasks', []);

const pendingTasksAtom = atom((get) => get(tasksAtom).filter((task) => task.pending));
const nonPendingTasksAtom = atom(
    (get) => (
        get(tasksAtom).filter((task) => !task.pending && !task.completed)
    )
);
const completedTasksAtom = atom(
    (get) => get(tasksAtom).filter((task) => task.completed)
);


export const useTasks = () => {
    return useAtomValue(tasksAtom);
}

export const useTask = (id: number|null): Task|null => {
    const tasks = useTasks();
    return React.useMemo(() => (
        id === null
            ? null
            : (tasks.find((task) => task.id === id) ?? null)
    ), [tasks, id]);
}

export const usePendingTasks = () => {
    return useAtomValue(pendingTasksAtom);
}

export const useNonPendingTasks = () => {
    return useAtomValue(nonPendingTasksAtom);
}

export const useCompletedTasks = () => {
    return useAtomValue(completedTasksAtom);
}

export function useTaskActions() {
    const setTasks = useSetAtom(tasksAtom);

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

const currentlyEditedTaskIdAtom = atom<number|null>(null);

export const useCurrentlyEditedTask = (): Task|null => {
    const currentlyEditedTaskId = useAtomValue(currentlyEditedTaskIdAtom);
    return useTask(currentlyEditedTaskId);
};

export const useSetCurrentlyEditedTask = () => {
    const setCurrentlyEditedTaskId = useSetAtom(currentlyEditedTaskIdAtom);
    return React.useCallback((task: Pick<Task, 'id'>|null) => {
        setCurrentlyEditedTaskId(task === null ? null : task.id);
    }, [setCurrentlyEditedTaskId]);
}
