// import type {User} from '@/core/models/models.ts';
//
// export type Task = {
//   id: string;
//   title: string;
//   description: string;
//   authorId: User['id'];
//   assigneeId?: User['id'];
// }

import type {Task} from '@/core/models/models.ts';
import styles from './TaskCard.module.scss';

export const TaskCard = ({task}: {task: Task}) => {
  return (
      <div className={styles.taskCard}>
        <div className={styles.taskCardTitle}>{task.title}</div>
        <div className={styles.taskCardDesc}>{task.description}</div>
      </div>
  );
}
