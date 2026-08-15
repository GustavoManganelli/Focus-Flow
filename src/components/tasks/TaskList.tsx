import type { Task } from "@/types/task";
import { TaskCard } from "./TaskCard";
import { EmptyTaskState } from "./EmptyTaskState";

interface TaskListProps {
  tasks: Task[];
  onChangeStatus: (taskId: string) => void;
}

export function TaskList({ tasks, onChangeStatus }: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyTaskState />;
  }
  const items = tasks.map((task) => (
    <TaskCard key={task.id} task={task} onChangeStatus={onChangeStatus} />
  ));

  return <section className="task-list">{items}</section>;
}
