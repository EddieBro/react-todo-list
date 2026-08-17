import styles from './HomePage.module.scss'
import {UserList, useUsers} from '@/modules/users';


export const HomePage = () => {
  const users = useUsers();
  return (
      <div className={styles.pageWrap}>
          <div className={styles.centerCol}>Home page</div>
          <div className={styles.rightCol}>
            <h2>Список пользователей</h2>
            <div className={styles.userListScroll}>
              <UserList userList={users} />
            </div>
          </div>
      </div>
  );
};
