"use client";

import type { Task } from "@/types/task";
import { useState } from "react";
import { TaskList } from "../TaskList";
import { TaskSummary } from "./TaskSummary";
import { toggleTaskStatus } from "@/lib/task-utils";

interface taskProps {
    initialTasks: Task[]
}

export default function TaskDashboard({ initialTasks }: taskProps) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    function changeStatus(taskId: string) {
        const now = new Date().toISOString();
        setTasks((tasks) => 
            tasks.map((task) => 
                task.id === taskId ? toggleTaskStatus(task, now) : task
            )
        );
    }

    return (
        <section className="dashboard">
            <TaskSummary tasks={tasks} />
            <br />
            <TaskList tasks={tasks} onChangeStatus={changeStatus} />
        </section>
    )
}
