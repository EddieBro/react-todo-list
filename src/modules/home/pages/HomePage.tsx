import styles from './HomePage.module.scss'
import {usersDataMock} from '@/modules/users/usersDataMock.ts';
import {UserAdd} from '@/shared/components/UserAdd/UserAdd.tsx';
import {useState} from 'react';
import type {User} from '@/core/models/models.ts';
import {UserList} from '@/shared/components/UserList/UserList.tsx';

export const HomePage = () => {
  const [users, setUsers] = useState<User[]>(usersDataMock);
  const handleAddUser = (user: User) => {
    setUsers(prev => [...prev, user]);
  };

  return (
      <div className={styles.pageWrap}>
          <div className={styles.centerCol}>Home page</div>
          <div className={styles.rightCol}>
            <h2>Список пользователей</h2>
            <div className={styles.userListScroll}>
              <UserList userList={users} />
            </div>
            <UserAdd onAdd={handleAddUser} />
          </div>
      </div>
  );
};
