import type {Column as col, Task} from '@/core/models/models.ts';
import {TaskCard} from '../TaskCard/TaskCard.tsx';
import styles from './Column.module.scss';
import {Droppable} from '@hello-pangea/dnd';

export const Column = ({column, tasks}: {column: col, tasks: Task[]}) => {
  return (
      <div className={styles.columnWrap}>
        <div className={styles.titleBlock}>
          <div>{column.title}</div>
        </div>
        <Droppable droppableId={column.id}>
          {(provided) => (
            <div
                className={styles.cardList}
                ref={provided.innerRef}
                {...provided.droppableProps}
            >
              {tasks.map((task, index) => (
                  <TaskCard key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
  );
}
