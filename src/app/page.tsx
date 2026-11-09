import TaskDashboard from "@/components/tasks/dashboard/TaskDashboard";
import type { Task } from "@/types/task";
import styles from "./page.module.css";

export default function Home() {
  const tasks: Task[] = [
    {
      id: "1",
      title: "Estudar React",
      category: "study",
      priority: "high",
      status: "pending",
      dueDate: "2024-06-30",
      createdAt: "2024-06-01",
      updatedAt: "2024-06-01"
    },
    {
      id: "2",
      title: "Finalizar relatório",
      category: "work",
      priority: "medium",
      status: "done",
      dueDate: "2024-06-15",
      createdAt: "2024-06-01",
      updatedAt: "2024-06-10"
    },
    {
      id: "3",
      title: "Comprar presente de aniversário",
      category: "personal",
      priority: "low",
      status: "pending",
      dueDate: "2024-07-05",
      createdAt: "2024-06-01",
      updatedAt: "2024-06-01"
    }
  ];


  return (
    <main className={styles.main}>
      <header>
        <h1 className={styles.title}>FocusFlow</h1>
        <p className={styles.description}>
          Planeje o que importa e acompanhe cada próximo passo.
        </p>
      </header>
      <TaskDashboard initialTasks={tasks} />
    </main>
  );
}
