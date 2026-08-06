import type {Column as col, Task} from '@/core/models/models.ts';
import {TaskCard} from '@/modules/board';

export const Column = ({column, tasks}: {column: col, tasks: Task[]}) => {
  return (
      <div>
        <div>
          <div>{column.id}</div>
          <div>{column.title}</div>
          <div>{column.taskIds}</div>
        </div>
        {tasks.map(task => (
            <TaskCard task={task} />
        ))}
      </div>

  );
}
