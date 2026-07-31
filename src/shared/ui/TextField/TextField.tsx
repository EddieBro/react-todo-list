import type {BaseTextFieldProps} from '@mui/material';
import TextField from '@mui/material/TextField';

type TextFieldProps = BaseTextFieldProps

export const TextFieldWrap = (props: TextFieldProps) => <TextField {...props} />
