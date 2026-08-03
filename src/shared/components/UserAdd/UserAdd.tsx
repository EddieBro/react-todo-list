import {useState} from 'react';
import type {FormEvent} from 'react';
import {Stack} from '@mui/material';
import type {User} from '@/core/models/models.ts';
import {TextFieldWrap} from '@/shared/ui/TextField/TextField.tsx';
import {Button} from '@/shared/ui/Button/Button.tsx';
import styles from './UserAdd.module.scss';

type UserAddProps = {
  onAdd: (user: User) => void;
};

export const UserAdd = ({onAdd}: UserAddProps) => {
  const [name, setName] = useState('');
  const [avatarId, setAvatarId] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    onAdd({
      id: Date.now(),
      name: name.trim(),
      avatarId: avatarId ? Number(avatarId) : undefined,
    });

    setName('');
    setAvatarId('');
  };

  return (
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextFieldWrap
              fullWidth
              label='Имя'
              value={name}
              onChange={(e) => setName(e.target.value)}
          />
          <TextFieldWrap
              fullWidth
              className={styles.avatarInput}
              label='Аватар (1-4, необязательно)'
              type='number'
              value={avatarId}
              onChange={(e) => setAvatarId(e.target.value)}
          />
          <Button type='submit'>Добавить</Button>
        </Stack>
      </form>
  );
}
