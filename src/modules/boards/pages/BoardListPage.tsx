import {generatePath, Link} from 'react-router-dom';
import {boardDataMock} from '@/modules/board';
import styles from './BoardListPage.module.scss';

export const BoardListPage = () => {
  return (
      <div className={styles.pageWrap}>
        <Link to={generatePath('/boards/:boardId', {boardId: boardDataMock.id})}>
          {boardDataMock.title}
        </Link>
      </div>
  )
}
