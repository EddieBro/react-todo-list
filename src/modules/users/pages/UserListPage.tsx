import {Box} from '@mui/material';
import {UserList} from '../components/UserList/UserList.tsx';
import {useUsers} from '../hooks/useUsers.ts';
import {UserAdd} from '../components/UserAdd/UserAdd.tsx';
import {createUser, deleteUser} from '../store/usersThunks.ts';
import {useAppDispatch} from '@/core/store';
import type {User} from '@/core/models/models.ts';
import styles from './UserListPage.module.scss';
import {Button} from '@/shared/ui/Button/Button.tsx';
import {useState} from 'react';
import {Modal} from '@/shared/ui/Modal/Modal.tsx';
import {useSession} from '@/core/session/useSession.ts';

export const UserListPage = () => {
  const {currentUserId, logout} = useSession();
  const dispatch = useAppDispatch();
  const {users} = useUsers();
  const [open, setOpen] = useState(false)
  const handleAdd = (draft: Omit<User, 'id'>) => {
    dispatch(createUser(draft)).unwrap().then(() => setOpen(false));
  };

  const handleDelete = (id: User['id']) => {
    if (!window.confirm('Удалить пользователя?')) {
      return;
    }
    dispatch(deleteUser(id)).unwrap().then(() => {
      if (id === currentUserId) {
        logout();
      }
    });
  }

  return (
      <div className={styles.pageWrap}>
        <Modal open={open} onClose={() => setOpen(false)} title='Создать пользователя'>
          <UserAdd onAdd={handleAdd} />
        </Modal>
        <div className={styles.btnWrap}>
          <Button onClick={() => setOpen(true)}>Создать пользователя</Button>
        </div>
        <Box className={styles.userList}>
          <UserList userList={users} onDelete={handleDelete}  />
        </Box>
      </div>
  )
}
