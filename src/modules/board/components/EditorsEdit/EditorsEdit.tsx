import type {User} from '@/core/models/models.ts';
import {useForm} from 'react-hook-form';
import {Stack} from '@mui/material';
import {FormSelect} from '@/shared/ui/FormSelect/FormSelect.tsx';
import {Button} from '@/shared/ui/Button/Button.tsx';

type EditorsEditProps = {
  users: User[];
  ownerId: User['id'];
  editorsIds: User['id'][];
  onSave: (editorsIds: User['id'][]) => void;
};

type EditorsForm = {editorsIds: User['id'][]};

export const EditorsEdit = ({users, ownerId, editorsIds, onSave}: EditorsEditProps) => {
  const {control, handleSubmit} = useForm<EditorsForm>({
    defaultValues: {editorsIds: editorsIds.filter(id => id !== ownerId)},
  });

  const options = users
      .filter(u => u.id !== ownerId)
      .map(u => ({value: u.id, label: u.name}));

  return (
      <form onSubmit={handleSubmit(data => onSave(data.editorsIds))}>
        <Stack spacing={2}>
          <FormSelect name='editorsIds' control={control} label='Редакторы' options={options} multiple />
          <Button type='submit'>Сохранить</Button>
        </Stack>
      </form>
  )

}
