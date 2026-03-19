import { Button } from '../../../../ui/Button/Button';
import { Modal } from '../../../../ui/Modal/Modal';
import styles from './style.module.scss';

type DeleteModalProps = {
  onAccept: () => void;
  onQuit: () => void;
};

export const DeleteModal = ({onAccept, onQuit} : DeleteModalProps) => {
  return (
    <Modal>
      <div className={styles['delete-modal']}>
        <p>Точно удалить задачу?</p>
        <div className={styles['delete-modal__actions']}>
          <Button title="Удалить" onClick={() => {onAccept()}} />
          <Button title="Выйти" outline onClick={() => {onQuit()}} />
        </div>
      </div>
    </Modal>
  );
};
