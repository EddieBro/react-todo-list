import {generatePath, Link} from 'react-router-dom';
import styles from './BoardListPage.module.scss';
import {boardDataMock} from '@/shared/api/mocks/boardDataMock.ts';

export const BoardListPage = () => {
  return (
      <div className={styles.pageWrap}>
        <Link to={generatePath('/boards/:boardId', {boardId: boardDataMock.id})}>
          {boardDataMock.title}
        </Link>
      </div>
  )
}
