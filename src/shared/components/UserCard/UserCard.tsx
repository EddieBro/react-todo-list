import type {User} from '@/core/models/models.ts';

export const UserCard = (user: User) => {
  return (
      <div>
        <div className="avatar">
          <img src={`assets/ava${user.avatarId}.png`} alt=""/>
        </div>
        <div className="info">
          <div className="id">{user.id}</div>
          <div className="name">{user.name}</div>
        </div>
      </div>
  )
}
