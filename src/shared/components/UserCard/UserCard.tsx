import type {User} from '@/core/models/models.ts';
import styles from './UserCard.module.scss';
import {generatePath, Link} from 'react-router-dom';
import {IconButton} from '@mui/material';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';

type UserCardProps = {
  user: User,
  onDelete?: (id: User['id']) => void;
  deleting?: boolean;
}

export const UserCard = ({user, onDelete, deleting}: UserCardProps) => {
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
        {onDelete && (
            <div className={styles.userBlockRemove}>
              <IconButton
                  size='small'
                  color={'warning'}
                  disabled={deleting}
                  aria-label={`Удалить пользователя ${user.name}`}
                  onClick={() => onDelete(user.id)}
              >
                <DeleteOutlined fontSize='small'></DeleteOutlined>
              </IconButton>
            </div>
        )}
      </div>
  )
}
