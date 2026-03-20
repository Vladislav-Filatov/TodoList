import classNames from 'classnames';
import {useState} from 'react';
import Close from '../../../../assets/icons/close.svg?react';
import {Button} from '../../../../ui/Button/Button';
import {Input} from '../../../../ui/Input/Input';
import {Modal} from '../../../../ui/Modal/Modal';
import type {Task} from '../../api/serverData/taskList';
import styles from './style.module.scss';
import {Prioroty} from '../../../../types';

type AddEditTaskModal = {
  modalTitle: string;
  buttonText: string;
  onClose: () => void;
  onAddTask: (title: string, selectedPriority: Prioroty) => void;
  editingTask: Task | null;
};

export const AddEditTaskModal = ({
  modalTitle,
  buttonText,
  onClose,
  onAddTask,
  editingTask
}: AddEditTaskModal) => {
  const [title, setTitle] = useState(editingTask?.title ?? '');
  const [selectedPriority, setSelectedPriority] = useState<Prioroty>(editingTask?.priority ?? Prioroty.LOW);
  return (
    <Modal>
      <form>
        <div className={styles['add-edit-modal']}>
          <div className="flx-between">
            <span className={styles['modal-title']}>{modalTitle}</span>
            <Close className="cp" onClick={onClose} />
          </div>
          <Input
            label="Задача"
            placeholder="Введите текст.."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            name="title"
            value={title}
          />
          <div className={styles['modal-priority']}>
            <span>Приортитет</span>
            <ul className={styles['priority-buttons']}>
              {[Prioroty.HIGH, Prioroty.MEDIUM, Prioroty.LOW].map((priority) => (
                <li
                  key={priority}
                  onClick={() => setSelectedPriority(priority)}
                  className={classNames(
                    priority === selectedPriority && styles[`${priority}-selected`],
                    styles[priority]
                  )}
                >
                  {priority}
                </li>
              ))}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button
              title={buttonText}
              disabled={!title}
              onClick={() => {
                onAddTask(title, selectedPriority);
              }}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};
