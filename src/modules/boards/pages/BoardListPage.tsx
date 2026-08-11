import styles from './BoardListPage.module.scss';
import {BoardAdd, BoardsTable, useBoards} from '@/modules/boards';
import {useState} from 'react';
import {Button} from '@/shared/ui/Button/Button.tsx';
import {Modal} from '@/shared/ui/Modal/Modal.tsx';
import {useRevalidator} from 'react-router-dom';
import type {Board} from '@/core/models/models.ts';
import {boardApi} from '@/shared/api/boardApi.ts';

export const BoardListPage = () => {
  const {boards, users} = useBoards();
  const [open, setOpen] = useState(false);
  const revalidator = useRevalidator();

  const handleAdd = async (board: Board) => {
    await boardApi.createBoard(board);
    revalidator.revalidate();
    setOpen(false);
  }
  return (
      <div className={styles.pageWrap}>
        <div className={styles.btnWrap}>
          <Button onClick={() => setOpen(true)}>Создать доску</Button>
        </div>
        <Modal open={open} onClose={() => setOpen(false)} title='Создать доску'>
          <BoardAdd users={users} onAdd={handleAdd} />
        </Modal>
        <BoardsTable boards={boards} users={users} />
      </div>
  )
}
