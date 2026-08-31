import type {Column} from '@/core/models/models.ts';
import {useForm} from 'react-hook-form';
import {Stack} from '@mui/material';
import {FormTextField} from '@/shared/ui/FormTextField/FormTextField.tsx';
import {FormSelect} from '@/shared/ui/FormSelect/FormSelect.tsx';
import {Button} from '@/shared/ui/Button/Button';

import type {TaskDraft} from '../../hooks/useAddTask.ts';

type TaskAddProps = {
  columns: Column[];
  onAdd: (draft: TaskDraft, columnId: Column['id']) => void;
};

type CreateTaskForm = {title: string; description: string; columnId: string};

export const TaskAdd = ({columns, onAdd}: TaskAddProps) => {
  const {control, handleSubmit} = useForm<CreateTaskForm>({
    defaultValues: {title: '', description: '', columnId: columns[0]?.id ?? ''},
  });

  const columnOptions = columns.map(c => ({value: c.id, label: c.title}));

  const onSubmit = (data: CreateTaskForm) =>
      onAdd({title: data.title, description: data.description}, data.columnId);

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormTextField<CreateTaskForm>
              name='title'
              control={control}
              rules={{required: 'Введите название задачи'}}
              label='Название задачи'
              fullWidth
          />
          <FormTextField<CreateTaskForm>
              name='description'
              control={control}
              label='Описание'
              fullWidth
          />
          <FormSelect
              name='columnId'
              control={control}
              rules={{required: 'Выберите колонку'}}
              label='Колонка'
              options={columnOptions}
          />
          <Button type='submit'>Добавить</Button>
        </Stack>
      </form>
  )
}
