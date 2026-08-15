import {Stack} from '@mui/material';
import type {User} from '@/core/models/models.ts';
import {Button} from '@/shared/ui/Button/Button.tsx';
import {useForm} from 'react-hook-form';
import {FormTextField} from '@/shared/ui/FormTextField/FormTextField.tsx';
import styles from './UserAdd.module.scss';

type UserAddProps = {
  onAdd: (draft: Omit<User, 'id'>) => void;
};

type CreateUserForm = {
  name: string;
  avatarId: string;
}

export const UserAdd = ({onAdd}: UserAddProps) => {
  const {control, handleSubmit, reset} = useForm<CreateUserForm>({
    defaultValues: {name: '', avatarId: ''}
  });

  const onSubmit = (data: CreateUserForm)=> {
    onAdd({
      name: data.name.trim(),
      avatarId: data.avatarId ? Number(data.avatarId) : undefined,
    });
    reset();
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
          <Button type='submit'>Добавить</Button>
        </Stack>
      </form>
  );
}
