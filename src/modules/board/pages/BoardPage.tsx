import {Column} from '@/modules/board';
import styles from './BoardPage.module.scss';
import {boardDataMock} from '@/shared/api/mocks/boardDataMock.ts';

export const BoardPage = () => {
  const board = boardDataMock;
  return (
      <div className={styles.pageWrap}>
        <h1>{board.title}</h1>
        <div className={styles.columnWrap}>
          {board.columns.map(column => (
              <Column key={column.id} column={column} tasks={column.taskIds.map(id => board.tasks[id])} />
          ))}
        </div>
      </div>

  );
}
