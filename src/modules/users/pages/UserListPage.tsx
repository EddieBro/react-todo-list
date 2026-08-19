import {Box} from '@mui/material';
import {UserList} from '../components/UserList/UserList.tsx';
import {useUsers, useUsersCreate} from '../hooks/useUsers.ts';
import {UserAdd} from '../components/UserAdd/UserAdd.tsx';
import {useAppDispatch} from '@/core/store';
import type {User} from '@/core/models/models.ts';
import styles from './UserListPage.module.scss';
import {Button} from '@/shared/ui/Button/Button.tsx';
import {useState} from 'react';
import {Modal} from '@/shared/ui/Modal/Modal.tsx';
import {deleteUser} from '../store/usersActions.ts';
import {PageSpinner} from '@/shared/ui/PageSpinner/PageSpinner.tsx';

export const UserListPage = () => {
  const dispatch = useAppDispatch();
  const {users, status} = useUsers();
  const {status: createStatus, error: createError, create, reset} = useUsersCreate();
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
    dispatch(deleteUser(id));
  }

  if (status === 'loading') {
    return <PageSpinner />;
  }

  return (
      <div className={styles.pageWrap}>
        <Modal open={isOpen} onClose={() => setOpen(false)} title='Создать пользователя'>
          <UserAdd onAdd={handleAdd} disabled={createStatus === 'loading'} error={createError} />
        </Modal>
        <div className={styles.btnWrap}>
          <Button onClick={handleOpen}>Создать пользователя</Button>
        </div>
        <Box className={styles.userList}>
          <UserList userList={users} onDelete={handleDelete}  />
        </Box>
      </div>
  )
}
