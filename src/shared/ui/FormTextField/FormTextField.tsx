import {type Control, type FieldPath, type FieldValues, useController, type UseControllerProps} from 'react-hook-form';
import type {TextFieldProps} from '@mui/material';
import {TextFieldWrap} from '@/shared/ui/TextField/TextField.tsx';

type FormTextFieldProps<T extends FieldValues> = Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'error' | 'helperText'> & {
  name: FieldPath<T>;
  control: Control<T>;
  rules?: UseControllerProps<T>['rules'];
};

export const FormTextField = <T extends FieldValues>({name, control, rules, ...rest}: FormTextFieldProps<T>) => {
  const {field: {ref, ...field}, fieldState} = useController({name, control, rules});

  return (
      <TextFieldWrap
          {...rest}
          {...field}
          inputRef={ref}
          error={!!fieldState.error}
          helperText={fieldState.error?.message ?? ' '}
      />
  )
}
