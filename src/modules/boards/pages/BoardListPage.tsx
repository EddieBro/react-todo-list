import {generatePath, Link} from 'react-router-dom';
import styles from './BoardListPage.module.scss';
import {boardsDataMock} from '@/shared/api/mocks/boardsDataMock.ts';

export const BoardListPage = () => {
  return (
      <div className={styles.pageWrap}>
        <Link to={generatePath('/boards/:boardId', {boardId: boardsDataMock.id})}>
          {boardsDataMock.title}
        </Link>
      </div>
  )
}
