'use client';

import { useEffect, useState } from 'react';
import { loadStoredTasks, saveStoredTasks } from '@/lib/task-storage';
import { createTask, removeTask, toggleTaskStatus, updateTask } from '@/lib/task-utils';
import type { Task, TaskDraft } from '@/types/task';
import TaskForm from '../TaskForm';
import { TaskList } from '../TaskList';
import { TaskSummary } from './TaskSummary';
import styles from './TaskDashboard.module.css';

interface TaskDashboardProps { initialTasks: Task[]; }

export default function TaskDashboard({ initialTasks }: TaskDashboardProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [storageReady, setStorageReady] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const stored = loadStoredTasks();
    if (stored !== null) setTasks(stored);
    setStorageReady(true);
  }, []);
  useEffect(() => { if (storageReady) saveStoredTasks(tasks); }, [storageReady, tasks]);

  const editingTask = tasks.find((task) => task.id === editingTaskId) ?? null;
  function changeStatus(id: string) {
    const task = tasks.find((item) => item.id === id);
    setTasks((items) => items.map((item) => item.id === id ? toggleTaskStatus(item, new Date().toISOString()) : item));
    if (task) setStatusMessage(task.status === 'pending' ? 'Tarefa ' + task.title + ' concluída.' : 'Tarefa ' + task.title + ' reaberta.');
  }
  function create(draft: TaskDraft) {
    const task = createTask(draft, crypto.randomUUID(), new Date().toISOString());
    setTasks((items) => [task, ...items]);
    setStatusMessage('Tarefa ' + task.title + ' adicionada.');
  }
  function update(id: string, draft: TaskDraft) {
    setTasks((items) => items.map((item) => item.id === id ? updateTask(item, draft, new Date().toISOString()) : item));
    setEditingTaskId(null);
    setStatusMessage('Tarefa ' + draft.title.trim() + ' atualizada.');
  }
  function remove(id: string) {
    const task = tasks.find((item) => item.id === id);
    setTasks((items) => removeTask(items, id));
    if (editingTaskId === id) setEditingTaskId(null);
    if (task) setStatusMessage('Tarefa ' + task.title + ' excluída.');
  }

  function cancelEdit() {
    setEditingTaskId(null);
    setStatusMessage('Edição cancelada.');
  }

  return <section className={styles.dashboard} aria-label='Gerenciamento de tarefas'>
    <p className={styles.statusMessage} aria-live='polite' aria-atomic='true'>{statusMessage}</p>
    <TaskForm initialTask={editingTask} onCancelEdit={cancelEdit} onCreateTask={create} onUpdateTask={update} />
    <TaskSummary tasks={tasks} />
    <TaskList tasks={tasks} onChangeStatus={changeStatus} onEdit={setEditingTaskId} onRemove={remove} />
  </section>;
}
