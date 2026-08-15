import type { Task, TaskDraft, TaskFilters } from "@/types/task";

export function createTask(draft: TaskDraft, id: string, now: string): Task {
  return {
    id,
    title: draft.title.trim(),
    category: draft.category,
    priority: draft.priority,
    status: "pending",
    dueDate: draft.dueDate || undefined,
    createdAt: now,
    updatedAt: now,
  };
}

export function toggleTaskStatus(task: Task, now: string): Task {
  return {
    ...task,
    status: task.status === "pending" ? "done" : "pending",
    updatedAt: now,
  };
}

export function removeTask(tasks: Task[], taskId: string): Task[] {
  return tasks.filter((task) => task.id !== taskId);
}

export function filterTasks(tasks: Task[], filter: TaskFilters): Task[] {
  return tasks.filter((task) => {
    const matchesQuery = task.title.trim().toLowerCase().includes(filter.query.trim().toLowerCase());
    const matchesCategory = filter.category === "all" || task.category === filter.category;
    const matchesPriority = filter.priority === "all" || task.priority === filter.priority;
    const matchesStatus = filter.status === "all" || task.status === filter.status;

    return matchesQuery && matchesCategory && matchesPriority && matchesStatus;
  });
}