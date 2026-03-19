import styles from './style.module.scss';
import type { ReactNode } from 'react';

type ModalProps = {
  children: ReactNode;
};

export const Modal = ({ children }: ModalProps) => {
  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']}>{children}</div>
    </div>
  );
};

export default Modal;
