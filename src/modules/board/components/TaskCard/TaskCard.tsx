import type {Task} from '@/core/models/models.ts';
import styles from './TaskCard.module.scss';
import {Draggable} from '@hello-pangea/dnd';

export const TaskCard = ({task, index, dragDisabled}: {task: Task, index: number, dragDisabled?: boolean}) => {
  return (
      <Draggable draggableId={task.id} index={index} isDragDisabled={dragDisabled}>
        {(provided) => (
            <div
                className={styles.taskCard}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
              <div className={styles.taskCardTitle}>{task.title}</div>
              <div className={styles.taskCardDesc}>{task.description}</div>
            </div>
        )}
      </Draggable>
  );
}
