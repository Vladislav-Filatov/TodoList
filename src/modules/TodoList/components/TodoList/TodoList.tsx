import styles from './style.module.scss';
import Add from '../../../../assets/icons/add.svg?react';
import {AddEditTaskModal} from '../AddEditTaskModal/AddEditTaskModal';
import {Button} from '../../../../ui/Button/Button';
import {DeleteModal} from '../DeleteModal/DeleteModal';
import {TaskCard} from '../TaskCard/TaskCard';
import type {Task} from '../../api/serverData/taskList';
import {Prioroty} from '../../../../types';
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux.ts";
import {
  closeAddEditModal,
  closeDeleteModal,
  openAddModal,
  openDeleteModal,
  openEditModal
} from "../../../../store/todoUiSlice.ts";
import {addTask, editTask, changeStatus, deleteTask} from "../../../../store/tasksSlice.ts";

export const TodoList = () => {
  const tasks = useAppSelector(state => state.tasks.tasks);
  const editingTask = useAppSelector(state => state.todoUi.editingTask);
  const taskToDelete = useAppSelector(state => state.todoUi.taskToDelete);
  const showAddEditModal = useAppSelector(state => state.todoUi.showAddEditModal);
  const showDeleteModal = useAppSelector(state => state.todoUi.showDeleteModal);
  const dispatch = useAppDispatch();



  const onEditTask = (task: Task) => {
    dispatch(openEditModal(task));
  };

  const onDeleteTask = (task: Task) => {
    dispatch(openDeleteModal(task));
  };

  const onAcceptDelete = () => {
    if (!taskToDelete) return;
    dispatch(deleteTask({id: taskToDelete.id}));
    dispatch(closeDeleteModal());
  };


  const onChangeStatus = (taskToChange: Task) => {
    dispatch(changeStatus({id: taskToChange.id}));
  };

  const onSubmitTask = (title: string, priority:Prioroty) => {
    if (title.length===0) return;
    if (editingTask) {
      dispatch(editTask({id: editingTask.id, title: title, priority: priority}));
    } else {
      dispatch(addTask({title: title, priority: priority}));
    }
    dispatch(closeAddEditModal());
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
              dispatch(openAddModal());
            }}
          />
        </div>
        <div className={styles['task-container']}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={(onEditTask)}
              onDelete={onDeleteTask}
              onChangeStatus={onChangeStatus}
            />
          ))}
        </div>
      </div>
      {showAddEditModal && (
        <AddEditTaskModal
          modalTitle={editingTask ? "Редактировать задачу" :"Добавить задачу"}
          buttonText={editingTask ? "Редактировать" : "Добавить "}
          onClose={() => {
            dispatch(closeAddEditModal());
          }}
          onAddTask={onSubmitTask}
          editingTask={editingTask}
        />
      )}
      {showDeleteModal &&
        <DeleteModal
          onAccept={onAcceptDelete}
          onQuit={() => dispatch(closeDeleteModal())}
        />
      }
    </>
  );
};
