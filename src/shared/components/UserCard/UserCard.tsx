import type {User} from '@/core/models/models.ts';
import styles from './UserCard.module.scss';
import {generatePath, Link} from 'react-router-dom';

export const UserCard = (user: User) => {
  const avatarSrc = user.avatarId ? `/img/ava${user.avatarId}.png` : '/img/ava-default.png';

  return (
      <div className={styles.userBlock}>
        <div className={styles.userBlockAvatarWrap}>
          <div
              className={styles.userBlockAvatar}
              style={{backgroundImage: `url(${avatarSrc})`}}
          />
        </div>
        <div>
          <div className={styles.userBlockId}>ID: {user.id}</div>
          <div className={styles.userBlockName}>
            Name:{' '}
            <Link to={generatePath('/users/:userId', {userId: user.id})}>{user.name}</Link>
          </div>
        </div>
      </div>
  )
}
