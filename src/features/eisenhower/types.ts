export interface Task {
    id: number;
    name: string;
    description: string;
    urgency: number;
    importance: number;
    pending: boolean;
    completed: boolean;
    addedOn: string;
    completedOn?: string;
}