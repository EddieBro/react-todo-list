import {Column} from '@/modules/board';
import styles from './BoardPage.module.scss';
import {boardsDataMock} from '@/shared/api/mocks/boardsDataMock.ts';

export const BoardPage = () => {
  const board = boardsDataMock;
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
