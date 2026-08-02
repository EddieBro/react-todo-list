import {UserCard} from '@/shared/components/UserCard/UserCard.tsx';
import type {User} from '@/core/models/models.ts';

export const UserList = ({userList}: {userList: User[]}) => {
  return (
      <div>
        {userList.map(user => (
            <UserCard key={user.id} {...user} />
        ))}
      </div>
  );
}
