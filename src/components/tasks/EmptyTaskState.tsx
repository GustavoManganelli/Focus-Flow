import styles from './EmptyTaskState.module.css';

export function EmptyTaskState() {
  return <article className={styles.emptyState}>
    <h2 className={styles.title}>Nenhuma tarefa por aqui</h2>
    <p className={styles.description}>Comece com uma ação pequena e mantenha seu dia em movimento.</p>
    <a className={styles.action} href='#task-form'>Criar uma tarefa</a>
  </article>;
}
