import type {User} from '@/core/models/models.ts';
import styles from './UserCard.module.scss';

export const UserCard = (user: User) => {
  return (
      <div className={styles.userBlock}>
        <div className={styles.userBlockAvatarWrap}>
          <div
              className={styles.userBlockAvatar}
              style={{backgroundImage: `url(/img/ava${user.avatarId}.png)`}}
          />
        </div>
        <div>
          <div className={styles.userBlockId}>ID: {user.id}</div>
          <div className={styles.userBlockName}>Name: {user.name}</div>
        </div>
      </div>
  )
}
