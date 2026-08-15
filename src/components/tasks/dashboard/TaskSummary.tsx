import type { Task } from "@/types/task";

interface TaskSummaryProps {
    tasks: Task[]
}

export function TaskSummary({ tasks }: TaskSummaryProps){
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(task => task.status === "pending").length;
    const completedTasks = tasks.filter(task => task.status === "done").length;

    return (
        <section className="task-summary">
            <h2>Resumo das Tarefas</h2>
            <p>Total de tarefas: {totalTasks}</p>
            <p>Tarefas pendentes: {pendingTasks}</p>
            <p>Tarefas concluídas: {completedTasks}</p>
        </section>
    )
}
