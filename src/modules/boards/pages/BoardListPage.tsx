import styles from './BoardListPage.module.scss';
import {BoardAdd, BoardsTable, useBoards} from '@/modules/boards';
import {boardApi} from '@/shared/api/boardApi.ts';
import {useRevalidator} from 'react-router-dom';
import type {Board} from '@/core/models/models.ts';

export const BoardListPage = () => {
  const {boards, users} = useBoards();
  const revalidator = useRevalidator();

  const handleAdd = async (board: Board) => {
    await boardApi.createBoard(board);
    revalidator.revalidate();
  }
  return (
      <div className={styles.pageWrap}>
        <BoardAdd users={users} onAdd={handleAdd} />
        <BoardsTable boards={boards} users={users} />
      </div>
  )
}
