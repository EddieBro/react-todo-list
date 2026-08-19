import {Stack, Typography} from '@mui/material';
import type {User} from '@/core/models/models.ts';
import {Button} from '@/shared/ui/Button/Button.tsx';
import {useForm} from 'react-hook-form';
import {FormTextField} from '@/shared/ui/FormTextField/FormTextField.tsx';
import styles from './UserAdd.module.scss';

type UserAddProps = {
  onAdd: (draft: Omit<User, 'id'>) => void;
  disabled?: boolean;
  error?: string | null;
};

type CreateUserForm = {
  name: string;
  avatarId: string;
}

export const UserAdd = ({onAdd, disabled, error}: UserAddProps) => {
  const {control, handleSubmit} = useForm<CreateUserForm>({
    defaultValues: {name: '', avatarId: ''}
  });

  const onSubmit = (data: CreateUserForm)=> {
    onAdd({
      name: data.name.trim(),
      avatarId: data.avatarId ? Number(data.avatarId) : undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormTextField<CreateUserForm>
            control={control}
            name='name'
            rules={{required: 'Введите имя'}}
            label='Имя'
            fullWidth
        />
        <FormTextField<CreateUserForm>
            control={control}
            name='avatarId'
            className={styles.avatarInput}
            label='Аватар (1-4, необязательно)'
            type='number'
            fullWidth
        />
        {error && <Typography color='error'>{error}</Typography>}
        <Button type='submit' disabled={disabled}>Добавить</Button>
      </Stack>
    </form>
  );
}
