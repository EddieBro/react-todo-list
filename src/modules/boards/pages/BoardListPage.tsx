import styles from './BoardListPage.module.scss';
import {BoardsTable, useBoards} from '@/modules/boards';

export const BoardListPage = () => {
  const {boards, users} = useBoards();
  return (
      <div className={styles.pageWrap}>
        <BoardsTable boards={boards} users={users} />
      </div>
  )
}
