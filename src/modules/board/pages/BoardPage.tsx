import {Column} from '../components/Column/Column.tsx';
import {useBoard} from '../hooks/useBoard.ts';
import styles from './BoardPage.module.scss';

export const BoardPage = () => {
  const board = useBoard();
  if (!board) {
    return <div>Доска не найдена</div>
  }

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
