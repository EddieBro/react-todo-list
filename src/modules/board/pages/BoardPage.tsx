import {Column} from '../components/Column/Column.tsx';
import {useBoard} from '../hooks/useBoard.ts';
import styles from './BoardPage.module.scss';
import {useParams} from 'react-router-dom';
import {useBoardModule} from '../hooks/useBoardModule.ts';
import {PageSpinner} from '@/shared/ui/PageSpinner/PageSpinner.tsx';

export const BoardPage = () => {
  const {boardId} = useParams();
  useBoardModule(boardId!);

  const {board, status, canEdit} = useBoard();

  if (status === 'idle' || status === 'loading') return <PageSpinner />;
  if (status === 'error' || !board) return <div>Доска не найдена</div>;

  if (!canEdit) return (
      <div className={styles.pageWrap}>
        <div>Нет доступа к этой доске</div>
      </div>
  );

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
