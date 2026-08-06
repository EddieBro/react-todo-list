import {UserCard} from '@/shared/components/UserCard/UserCard.tsx';
import type {User} from '@/core/models/models.ts';
import styles from './UserList.module.scss';

export const UserList = ({userList}: {userList: User[]}) => {
  return (
      <div className={styles.userList}>
        {userList.map(user => (
            <UserCard key={user.id} {...user} />
        ))}
      </div>
  );
}
