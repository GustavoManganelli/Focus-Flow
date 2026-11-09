import type { Task } from "@/types/task";
import { TaskCard } from "./TaskCard";
import { EmptyTaskState } from "./EmptyTaskState";
import styles from "./TaskList.module.css";

interface TaskListProps {
  tasks: Task[];
  onChangeStatus: (taskId: string) => void;
  onRemove: (taskId: string) => void;
  onEdit: (taskId: string) => void;
}

export function TaskList({ tasks, onChangeStatus, onRemove, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyTaskState />;
  }
  const items = tasks.map((task) => (
    <TaskCard key={task.id} task={task} onChangeStatus={onChangeStatus} onRemove={onRemove} onEdit={onEdit}/>
  ));

  return <section className={styles.list}>{items}</section>;
}
