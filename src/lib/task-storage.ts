import type { Task, TaskCategory, TaskPriority, TaskStatus } from '@/types/task';

export const TASK_STORAGE_KEY = 'focusflow.tasks.v1';

const categories: TaskCategory[] = ['study', 'work', 'personal'];
const priorities: TaskPriority[] = ['low', 'medium', 'high'];
const statuses: TaskStatus[] = ['pending', 'done'];

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) return false;

  const task = value as Record<string, unknown>;
  return typeof task.id === 'string'
    && typeof task.title === 'string'
    && categories.includes(task.category as TaskCategory)
    && priorities.includes(task.priority as TaskPriority)
    && statuses.includes(task.status as TaskStatus)
    && (typeof task.dueDate === 'string' || typeof task.dueDate === 'undefined')
    && typeof task.createdAt === 'string'
    && typeof task.updatedAt === 'string';
}

export function loadStoredTasks(): Task[] | null {
  try {
    const value = window.localStorage.getItem(TASK_STORAGE_KEY);
    if (value === null) return null;
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) && parsed.every(isTask) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveStoredTasks(tasks: Task[]): void {
  try {
    window.localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Local storage is optional: task management still works for this session.
  }
}
