import {Box} from '@mui/material';
import {UserList} from '../components/UserList/UserList.tsx';
import {useUsers} from '../hooks/useUsers.ts';
import {UserAdd} from '../components/UserAdd/UserAdd.tsx';
import {createUser} from '../store/usersThunks.ts';
import {useAppDispatch} from '@/core/store';
import type {User} from '@/core/models/models.ts';
import styles from './UserListPage.module.scss';
import {Button} from '@/shared/ui/Button/Button.tsx';
import {useState} from 'react';
import {Modal} from '@/shared/ui/Modal/Modal.tsx';

export const UserListPage = () => {
  const dispatch = useAppDispatch();
  const users = useUsers();
  const [open, setOpen] = useState(false)
  const handleAdd = (draft: Omit<User, 'id'>) => {
    dispatch(createUser(draft));
    setOpen(false);
  };

  return (
      <div className={styles.pageWrap}>
        <div className={styles.btnWrap}>
          <Button onClick={() => setOpen(true)}>Создать пользователя</Button>
        </div>
        <Box className={styles.userList}>
          <Modal open={open} onClose={() => setOpen(false)} title='Создать пользователя'>
            <UserAdd onAdd={handleAdd} />
          </Modal>
          <UserList userList={users}  />
        </Box>
      </div>
  )
}
