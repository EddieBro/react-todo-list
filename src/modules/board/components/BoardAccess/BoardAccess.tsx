import type {User} from '@/core/models/models.ts';
import styles from './BoardAccess.module.scss';
import {IconButton, Stack, Typography} from '@mui/material';
import {UserCard} from '@/shared/components/UserCard/UserCard.tsx';
import EditOutlined from '@mui/icons-material/EditOutlined';

type BoardAccessProps = {
  owner?: User;
  editors: User[];
  onEditEditors?: () => void;
};

export const BoardAccess = ({owner, editors, onEditEditors}: BoardAccessProps) => {
  return (
    <div className={styles.accessWrap}>
      <div className={styles.group}>
        <Typography variant='subtitle2'>Владелец</Typography>
        {owner
            ? <UserCard user={owner} />
            : <Typography color='text.secondary'>Владелец удален</Typography>
        }
      </div>
      <div className={styles.group}>
        <div className={styles.groupHeader}>
          <Typography variant='subtitle2'>Редакторы</Typography>
          {onEditEditors && (
              <IconButton size='small' aria-label='Смена редакторов' onClick={onEditEditors}>
                <EditOutlined fontSize='small' />
              </IconButton>
          )}
        </div>
        {editors.length === 0
            ? <Typography color='text.secondary'>Нет редакторов</Typography>
            : <Stack direction='row' spacing={1} useFlexGap sx={{flexWrap: 'wrap'}}>
              {editors.map(user =>
                  <UserCard key={user.id} user={user} />
              )}
            </Stack>
        }
      </div>
    </div>
  )
}
