import type {Column as col, Task} from '@/core/models/models.ts';
import {TaskCard} from '../TaskCard/TaskCard.tsx';
import styles from './Column.module.scss';

export const Column = ({column, tasks}: {column: col, tasks: Task[]}) => {
  return (
      <div className={styles.columnWrap}>
        <div className={styles.titleBlock}>
          <div>{column.title}</div>
          <button className={styles.titleBlockAdd}></button>
        </div>
        <div className={styles.cardList}>
          {tasks.map(task => (
              <TaskCard key={task.id} task={task} />
          ))}
        </div>

      </div>

  );
}
