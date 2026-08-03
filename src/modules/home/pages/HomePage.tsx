import styles from './HomePage.module.scss'
import {UserList} from '@/shared/components/UserList/UserList.tsx';
import {usersDataMock} from '@/modules/user/usersDataMock.ts';
import {UserAdd} from '@/shared/components/UserAdd/UserAdd.tsx';
import {useState} from 'react';
import type {User} from '@/core/models/models.ts';

export const HomePage = () => {
  const [users, setUsers] = useState<User[]>(usersDataMock);
  const handleAddUser = (user: User) => {
    setUsers(prev => [...prev, user]);
  };

  return (
      <div className={styles.pageWrap}>
          <div className={styles.centerCol}>222</div>
          <div className={styles.rightCol}>
            <h2>Список пользователей</h2>
            <UserList userList={users} />
            <UserAdd onAdd={handleAddUser} />
          </div>
      </div>
  );
};
