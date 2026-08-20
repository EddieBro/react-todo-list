import styles from './BoardListPage.module.scss';
import {BoardAdd} from '../components/BoardAdd/BoardAdd.tsx';
import {BoardsTable} from '../components/BoardsTable/BoardsTable.tsx';
import {useBoards, useBoardsCreate, useBoardsDelete} from '../hooks/useBoards.ts';
import {useState} from 'react';
import {Button} from '@/shared/ui/Button/Button.tsx';
import {Modal} from '@/shared/ui/Modal/Modal.tsx';
import type {Board} from '@/core/models/models.ts';
import {useUsers} from '@/modules/users';
import {PageSpinner} from '@/shared/ui/PageSpinner/PageSpinner.tsx';
import {Typography} from '@mui/material';

export const BoardListPage = () => {
  const {boards, listStatus} = useBoards();
  const {users} = useUsers();
  const {createStatus, createError, create, reset} = useBoardsCreate();
  const {deleteStatus, deleteError, remove} = useBoardsDelete();
  const [open, setOpen] = useState(false);

  const isOpen = open && createStatus !== 'ready';

  const handleOpen = () => { reset(); setOpen(true)};

  const handleAdd = (draft: Omit<Board, 'id'>) => create(draft);

  const handleDelete = (id: Board['id']) => {
    if (!window.confirm('Удалить доску?')) {
      return;
    }
    remove(id)
  }

  if (listStatus === 'loading') return <PageSpinner />
  if (listStatus === 'error') return <h1>Не удалось загрузить доски</h1>;
  return (
      <div className={styles.pageWrap}>
        <div className={styles.btnWrap}>
          <Button onClick={handleOpen}>Создать доску</Button>
        </div>
        <Modal open={isOpen} onClose={() => setOpen(false)} title='Создать доску'>
          <BoardAdd users={users} onAdd={handleAdd} disabled={createStatus === 'loading'} error={createError} />
        </Modal>
        {deleteError && <Typography color='error'>{deleteError}</Typography>}
        <BoardsTable boards={boards} users={users} onDelete={handleDelete} deleting={deleteStatus === 'loading'} />
      </div>
  )
}
