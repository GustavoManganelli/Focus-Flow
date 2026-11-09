import type { Task } from '@/types/task';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  onChangeStatus: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  onRemove: (taskId: string) => void;
}

const categoryLabels = { study: 'Estudo', work: 'Trabalho', personal: 'Pessoal' };
const priorityLabels = { low: 'Baixa', medium: 'Média', high: 'Alta' };

export function TaskCard({ task, onChangeStatus, onEdit, onRemove }: TaskCardProps) {
  const isDone = task.status === 'done';
  const dueDate = task.dueDate ? new Date(task.dueDate + 'T00:00:00') : null;
  const dueLabel = dueDate ? dueDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) : 'Sem prazo';
  const priorityClass = { low: styles.priorityLow, medium: styles.priorityMedium, high: styles.priorityHigh }[task.priority];

  return <article className={`${styles.card} ${isDone ? styles.completed : ''}`}>
    <div className={styles.content}>
      <div className={styles.metaHeader}>
        <span className={`${styles.badge} ${isDone ? styles.statusDone : styles.statusPending}`}>{isDone ? 'Concluída' : 'Pendente'}</span>
        {dueDate ? <time className={styles.dueDate} dateTime={task.dueDate}>Prazo: {dueLabel}</time> : <span className={styles.dueDate}>Sem prazo definido</span>}
      </div>
      <h2 className={styles.title}>{task.title}</h2>
      <div className={styles.details}>
        <span>{categoryLabels[task.category]}</span>
        <span className={`${styles.badge} ${priorityClass}`}>Prioridade {priorityLabels[task.priority]}</span>
      </div>
    </div>
    <div className={styles.actions}>
      <button className={styles.primaryButton} type='button' onClick={() => onChangeStatus(task.id)}>{isDone ? 'Reabrir' : 'Concluir'}</button>
      <button className={styles.secondaryButton} type='button' onClick={() => onEdit(task.id)}>Editar</button>
      <button className={styles.dangerButton} type='button' onClick={() => onRemove(task.id)} aria-label={'Excluir tarefa ' + task.title}>Excluir</button>
    </div>
  </article>;
}
