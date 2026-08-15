export type TaskCategory = "study" | "work" | "personal";
export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "pending" | "done";

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskDraft {
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  dueDate: string;
}

export interface TaskFilters {
  query: string;
  category: TaskCategory | "all";
  priority: TaskPriority | "all";
  status: TaskStatus | "all";
}