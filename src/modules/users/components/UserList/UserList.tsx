import {UserCard} from '@/shared/components/UserCard/UserCard.tsx';
import type {User} from '@/core/models/models.ts';
import styles from './UserList.module.scss';

type UserListProps = {
  userList: User[];
  onDelete?: (id: User['id']) => void;
}

export const UserList = ({userList, onDelete}: UserListProps) => {
  return (
      <div className={styles.userList}>
        {userList.map(user => (
            <UserCard key={user.id} user={user} onDelete={onDelete} />
        ))}
      </div>
  );
}
