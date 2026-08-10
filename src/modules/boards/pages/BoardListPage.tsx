import {generatePath, Link} from 'react-router-dom';
import styles from './BoardListPage.module.scss';
import {useBoards} from '@/modules/boards';

export const BoardListPage = () => {
  const boards = useBoards();
  return (
      <div className={styles.pageWrap}>
        <Link to={generatePath('/boards/:boardId', {boardId: boards[0].id})}>
          {boards[0].title}
        </Link>
      </div>
  )
}
