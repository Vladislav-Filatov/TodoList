import classNames from 'classnames';
import DeleteIcon from '../../../../assets/icons/delete.svg?react';
import EditIcon from '../../../../assets/icons/edit.svg?react';
import { CircularProgressBar } from '../../ui/CircularProgressBar/CircularProgressBar';
import styles from './style.module.scss';
import type { Task } from '../../api/serverData/taskList';
import { ru_priority, ru_status } from '../../shared/translate';

type TaskCardProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onChangeStatus: (task: Task) => void;
};

export const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onChangeStatus
}: TaskCardProps) => {
    const { title, priority, status, progress } = task;
  return (
    <div className={styles['task-card']}>
      <div className="flex w-100">
        <span className={styles['task-title']}>Задача</span>
        <span className={styles.task}>{title}</span>
      </div>
      <div className="flex">
        <span className={styles['priority-title']}>Приоритет</span>
        <span
          className={classNames(
            styles[`priority--${priority}`],
            styles['priority']
          )}
        >
          {ru_priority[priority]}
        </span>
      </div>
      <div className={styles['task-status-wrapper']}>
        <button
          className={classNames(styles[`status--${status}`], styles['status'])}
          onClick={() => onChangeStatus(task)}
        >
          {ru_status[status]}
        </button>
      </div>
      <div className={styles.progress}>
        <CircularProgressBar
          strokeWidth={2}
          sqSize={24}
          percentage={progress}
        />
      </div>
      <div className={styles.actions}>
        <EditIcon
          className="mr-20 cp"
          onClick={() => {
            onEdit(task);
          }}
        />
        <DeleteIcon className="cp" onClick={() => {onDelete(task)}} />
      </div>
    </div>
  );
};
