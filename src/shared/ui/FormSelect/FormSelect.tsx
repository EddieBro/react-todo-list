import {type Control, type FieldPath, type FieldValues, useController, type UseControllerProps} from 'react-hook-form';
import {Chip, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack} from '@mui/material';

type Option = {value: string; label: string};

type FormSelectProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  rules?: UseControllerProps<T>['rules'];
  label: string;
  options: Option[];
  multiple?: boolean;
}

export const FormSelect = <T extends FieldValues>({name, control, rules, label, options, multiple}: FormSelectProps<T>) => {
  const {field, fieldState} = useController({name, control, rules});

  return (
      <FormControl fullWidth error={!!fieldState.error}>
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
        <Select
            labelId={`${name}-label`}
            label={label}
            multiple={multiple}
            {...field}
            value={field.value ?? (multiple ? [] : '')}
            renderValue={multiple ? (selected) => (
                <Stack direction='row' spacing={1} useFlexGap sx={{flexWrap: 'wrap'}}>
                  {(selected as string[]).map(id => (
                      <Chip key={id} label={options.find(o => o.value === id)?.label ?? id} size='small'/>
                  ))}
                </Stack>
            ) : undefined}
        >
          {options.map(o => (
              <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
          ))}
        </Select>
        <FormHelperText>{fieldState.error?.message ?? ' '}</FormHelperText>
      </FormControl>
  )
}
