import styles from './BoardAdd.module.scss';
import type {Board, User} from '@/core/models/models.ts';
import {useForm} from 'react-hook-form';
import {createId} from '@/shared/utils/id.ts';
import {Stack} from '@mui/material';
import {FormTextField} from '@/shared/ui/FormTextField/FormTextField.tsx';
import {Button} from '@/shared/ui/Button/Button.tsx';
import {FormSelect} from '@/shared/ui/FormSelect/FormSelect.tsx';

type BoardAddProps = {
  users: User[];
  onAdd: (board: Board) => void;
};

type CreateBoardForm = {
  title: string;
  ownerId: User['id'];
  editorsIds: User['id'][];
}

export const BoardAdd = ({users, onAdd}: BoardAddProps) => {
  const {control, handleSubmit, reset} = useForm<CreateBoardForm>({
    defaultValues: { title: '', ownerId: '', editorsIds: []}
  })
  const userOptions = users.map(u => ({value: u.id, label: u.name}))

  const onSubmit = (data: CreateBoardForm) => {
    onAdd({
      id: createId(),
      title: data.title.trim(),
      ownerId: data.ownerId,
      editorsIds: data.editorsIds
    });
    reset();
  }
  return (
      <form className={styles.formBoardAdd} onSubmit={handleSubmit(onSubmit)}>
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
              label='Владелец доски' options={userOptions}
          />
          <FormSelect
              name='editorsIds'
              control={control}
              label='Редакторы'
              options={userOptions}
              multiple
          />
          <Button type='submit'>Добавить</Button>
        </Stack>
      </form>
  )
}
