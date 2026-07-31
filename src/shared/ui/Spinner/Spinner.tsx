import {CircularProgress, type CircularProgressProps} from '@mui/material';

type SpinnerProps = CircularProgressProps

export const Spinner = (props: SpinnerProps) => <CircularProgress {...props} />
