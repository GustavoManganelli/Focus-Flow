'use client';

import { useEffect, useState } from 'react';
import type { Task, TaskCategory, TaskDraft, TaskPriority } from '@/types/task';
import styles from './TaskForm.module.css';

interface TaskFormProps {
  initialTask: Task | null;
  onCancelEdit: () => void;
  onCreateTask: (task: TaskDraft) => void;
  onUpdateTask: (taskId: string, task: TaskDraft) => void;
}

export default function TaskForm({ initialTask, onCancelEdit, onCreateTask, onUpdateTask }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('study');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [titleError, setTitleError] = useState('');
  const isEditing = initialTask !== null;

  function reset() {
    setTitle('');
    setCategory('study');
    setPriority('medium');
    setDueDate('');
    setTitleError('');
  }

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setCategory(initialTask.category);
      setPriority(initialTask.priority);
      setDueDate(initialTask.dueDate ?? '');
      setTitleError('');
    } else {
      setTitle('');
      setCategory('study');
      setPriority('medium');
      setDueDate('');
      setTitleError('');
    }
  }, [initialTask]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) {
      setTitleError('Informe um título para identificar esta tarefa.');
      return;
    }

    const draft = { title, category, priority, dueDate };
    if (initialTask) onUpdateTask(initialTask.id, draft);
    else onCreateTask(draft);
    reset();
  }

  function handleCancel() {
    reset();
    onCancelEdit();
  }

  return <section className={styles.formPanel} id='task-form' aria-labelledby='task-form-title'>
    <div className={styles.header}>
      <div>
        <h2 className={styles.title} id='task-form-title'>{isEditing ? 'Editar tarefa' : 'Nova tarefa'}</h2>
        <p className={styles.description}>{isEditing ? 'Atualize os detalhes e salve quando terminar.' : 'Defina o próximo passo para manter o ritmo.'}</p>
      </div>
      <span className={styles.icon} aria-hidden='true'>
        <svg viewBox='0 0 24 24' focusable='false'><path d='M12 5v14M5 12h14' /></svg>
      </span>
    </div>
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label className={`${styles.field} ${styles.titleField}`} htmlFor='title'>
        Título da tarefa <span aria-hidden='true'>*</span>
        <input className={styles.control} id='title' type='text' placeholder='Ex.: Estudar para a prova' value={title} onChange={(event) => { setTitle(event.target.value); setTitleError(''); }} aria-describedby={titleError ? 'title-error' : 'title-help'} aria-invalid={Boolean(titleError)} />
        <span className={styles.help} id='title-help'>Use uma ação clara e específica.</span>
        {titleError && <span className={styles.error} id='title-error' role='alert'>{titleError}</span>}
      </label>
      <label className={styles.field} htmlFor='category'>Categoria
        <select className={styles.control} id='category' value={category} onChange={(event) => setCategory(event.target.value as TaskCategory)}>
          <option value='study'>Estudo</option><option value='work'>Trabalho</option><option value='personal'>Pessoal</option>
        </select>
      </label>
      <label className={styles.field} htmlFor='priority'>Prioridade
        <select className={styles.control} id='priority' value={priority} onChange={(event) => setPriority(event.target.value as TaskPriority)}>
          <option value='low'>Baixa</option><option value='medium'>Média</option><option value='high'>Alta</option>
        </select>
      </label>
      <label className={styles.field} htmlFor='dueDate'>Data limite
        <input className={styles.control} id='dueDate' type='date' value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
      </label>
      <div className={styles.formActions}>
        {isEditing && <button className={styles.cancelButton} type='button' onClick={handleCancel}>Cancelar</button>}
        <button className={styles.submitButton} type='submit'>{isEditing ? 'Salvar alterações' : 'Adicionar tarefa'}</button>
      </div>
    </form>
  </section>;
}
