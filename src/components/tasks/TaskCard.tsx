import type { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
  onChangeStatus: (taskId: string) => void;
}

export function TaskCard({ task, onChangeStatus }: TaskCardProps) {
  return (
    <article className={`task-card task-card--${task.status}`}>
      <h2 className="task-card__title">{task.title}</h2>
      <p className="task-card__tag task-card__tag--category">{task.category}</p>
      <p className={`task-card__tag task-card__tag--${task.priority}`}>{task.priority}</p>
      <p className={`task-card__tag task-card__tag--${task.status}`}>{task.status}</p>
      <p className="task-card__date">{task.dueDate}</p>
      <button className="task-card__action" onClick={() => onChangeStatus(task.id)}>
        {task.status === "pending" ? "Concluir tarefa" : "Reabrir tarefa"}
      </button>
    </article>
  );
}
