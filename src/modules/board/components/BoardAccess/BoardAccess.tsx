import type {User} from '@/core/models/models.ts';
import styles from './BoardAccess.module.scss';
import {Stack, Typography} from '@mui/material';
import {UserCard} from '@/shared/components/UserCard/UserCard.tsx';

type BoardAccessProps = {
  owner?: User;
  editors: User[];
};

export const BoardAccess = ({owner, editors}: BoardAccessProps) => {
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
        <Typography variant='subtitle2'>Редакторы</Typography>
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
