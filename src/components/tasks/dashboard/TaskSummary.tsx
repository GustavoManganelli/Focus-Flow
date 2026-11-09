import type { Task } from '@/types/task';
import styles from './TaskSummary.module.css';

interface TaskSummaryProps { tasks: Task[]; }

export function TaskSummary({ tasks }: TaskSummaryProps) {
  const pending = tasks.filter((task) => task.status === 'pending').length;
  const completed = tasks.length - pending;

  return <section className={styles.summary} aria-labelledby='task-summary-title'>
    <div className={styles.heading}>
      <h2 id='task-summary-title'>Visão geral</h2>
      <p>{pending ? 'Mantenha o foco no próximo passo.' : 'Tudo em dia por aqui.'}</p>
    </div>
    <dl className={styles.metrics}>
      <div><dt>Total</dt><dd>{tasks.length}</dd></div>
      <div><dt>Pendentes</dt><dd>{pending}</dd></div>
      <div><dt>Concluídas</dt><dd>{completed}</dd></div>
    </dl>
  </section>;
}
