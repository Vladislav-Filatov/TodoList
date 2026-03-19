import { Prioroty, Status } from '../../../types';

export const ru_priority = {
  [Prioroty.LOW]: 'Низкий',
  [Prioroty.MEDIUM]: 'Средний',
  [Prioroty.HIGH]: 'Высокий',
};

export const ru_status = {
  [Status.TODO]: 'Сделать',
  [Status.PROGRESS]: 'В процессе',
  [Status.DONE]: 'Сделано',
};
