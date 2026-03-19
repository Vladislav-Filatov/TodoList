import styles from './style.module.scss';
import {useState} from 'react';
import Add from '../../../../assets/icons/add.svg?react';
import {AddEditTaskModal} from '../AddEditTaskModal/AddEditTaskModal';
import {Button} from '../../../../ui/Button/Button';
import {DeleteModal} from '../DeleteModal/DeleteModal';
import {TaskCard} from '../TaskCard/TaskCard';
import type {Task} from '../../api/serverData/taskList';
import {taskList} from '../../api/serverData/taskList';
import {Prioroty, Status} from '../../../../types';

export const TodoList = () => {
  const [tasks, setTasks] = useState(taskList);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onEditTask = (task: Task) => {
    setEditingTask(task);
    setShowAddEditModal(true);
  };

  const onDeleteTask = (task: Task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const onAcceptDelete = () => {
    setTasks(prevTasks =>
      prevTasks.filter(task => task.id !== taskToDelete?.id)
    )

    setTaskToDelete(null)
    setShowDeleteModal(false);
  };

  const onSubmitTask = (title: string, priority:Prioroty) => {
    if (editingTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          (task.id === editingTask.id) ?
            {...task, title, priority}
          :
            task
        )
      )
    } else {
      const newTask: Task = {
        id: String(Date.now()),
        title,
        priority: priority,
        status: Status.TODO,
        progress: 0,
      };

      setTasks(prevTasks => [newTask, ...prevTasks])
    }
    setEditingTask(null);
    setShowAddEditModal(false);
  }

  return (
    <>
      <div className={styles['page-wrapper']}>
        <div className={styles['top-title']}>
          <h2>Список задач</h2>
          <Button
            title="Добавить задачу"
            icon={<Add />}
            onClick={() => {
              setShowAddEditModal(true);
            }}
          />
        </div>
        <div className={styles['task-container']}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEditTask} onDelete={onDeleteTask} />
          ))}
        </div>
      </div>
      {showAddEditModal && (
        <AddEditTaskModal
          modalTitle={editingTask ? "Редактировать задачу" :"Добавить задачу"}
          buttonText={editingTask ? "Редактировать" : "Добавить "}
          onClose={() => {
            setShowAddEditModal(false);
            setEditingTask(null);
          }}
          onAddTask={onSubmitTask}
          editingTask={editingTask}
        />
      )}
      {showDeleteModal && <DeleteModal onAccept={onAcceptDelete} onQuit={() => setShowDeleteModal(false)}/>}
    </>
  );
};
