import styles from './BoardAdd.module.scss';
import type {Board, User} from '@/core/models/models.ts';
import {useForm} from 'react-hook-form';
import {Stack, Typography} from '@mui/material';
import {FormTextField} from '@/shared/ui/FormTextField/FormTextField.tsx';
import {Button} from '@/shared/ui/Button/Button.tsx';
import {FormSelect} from '@/shared/ui/FormSelect/FormSelect.tsx';

type BoardAddProps = {
  users: User[];
  onAdd: (draft: Omit<Board, 'id'>) => void;
  disabled?: boolean;
  error?: string | null;
};

type CreateBoardForm = {
  title: string;
  ownerId: User['id'];
  editorsIds: User['id'][];
}

export const BoardAdd = ({users, onAdd, disabled, error}: BoardAddProps) => {
  const {control, handleSubmit } = useForm<CreateBoardForm>({
    defaultValues: { title: '', ownerId: '', editorsIds: []}
  })
  const userOptions = users.map(u => ({value: u.id, label: u.name}))

  const onSubmit = (data: CreateBoardForm) => {
    onAdd({
      title: data.title.trim(),
      ownerId: data.ownerId,
      editorsIds: data.editorsIds
    });
  }
  return (
      <form className={styles.formBoardAdd} onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={disabled} className={styles.fields}>
          <Stack spacing={2}>
            <FormTextField<CreateBoardForm>
                name='title'
                control={control}
                rules={{required: 'Введите название доски'}}
                label='Название доски'
                fullWidth
            />
            <FormSelect
                name='ownerId'
                control={control}
                rules={{required: 'Выберите владельца доски'}}
                label='Владелец доски' options={userOptions}
            />
            <FormSelect
                name='editorsIds'
                control={control}
                label='Редакторы'
                options={userOptions}
                multiple
            />
            {error && <Typography color='error'>{error}</Typography>}
            <Button type='submit'>Добавить</Button>
          </Stack>
        </fieldset>
      </form>
  )
}
