import {Box, Typography} from '@mui/material';
import {UserList} from '../components/UserList/UserList.tsx';
import {useUsers, useUsersCreate, useUsersDelete} from '../hooks/useUsers.ts';
import {UserAdd} from '../components/UserAdd/UserAdd.tsx';
import type {User} from '@/core/models/models.ts';
import styles from './UserListPage.module.scss';
import {Button} from '@/shared/ui/Button/Button.tsx';
import {useState} from 'react';
import {Modal} from '@/shared/ui/Modal/Modal.tsx';
import {PageSpinner} from '@/shared/ui/PageSpinner/PageSpinner.tsx';

export const UserListPage = () => {
  const {users, listStatus} = useUsers();
  const {createStatus, createError, create, reset} = useUsersCreate();
  const {deleteStatus, deleteError, remove} = useUsersDelete();

  const [open, setOpen] = useState(false)

  const isOpen = open && createStatus !== 'ready';

  const handleOpen = () => {
    reset();
    setOpen(true);
  }

  const handleAdd = (draft: Omit<User, 'id'>) => create(draft);

  const handleDelete = (id: User['id']) => {
    if (!window.confirm('Удалить пользователя?')) {
      return;
    }
    remove(id);
  }

  if (listStatus === 'loading') {
    return <PageSpinner />;
  }

  if (listStatus === 'error') {
    return <h1>Не удалось загрузить пользователей</h1>;
  }

  return (
      <div className={styles.pageWrap}>
        <Modal open={isOpen} onClose={() => setOpen(false)} title='Создать пользователя'>
          <UserAdd onAdd={handleAdd} disabled={createStatus === 'loading'} error={createError} />
        </Modal>
        <div className={styles.btnWrap}>
          <Button onClick={handleOpen}>Создать пользователя</Button>
        </div>
        {deleteError && <Typography color='error'>{deleteError}</Typography>}
        <Box className={styles.userList}>
          <UserList userList={users} onDelete={handleDelete} deleting={deleteStatus === 'loading'}  />
        </Box>
      </div>
  )
}
