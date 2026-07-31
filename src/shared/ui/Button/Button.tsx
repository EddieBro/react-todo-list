import MuiButton, {type ButtonProps} from '@mui/material/Button';

type WrapButtonProps = ButtonProps;

export const Button = ({children,variant = 'contained',...rest}: WrapButtonProps) => {
  return (
      <MuiButton variant={variant} {...rest}>
        {children}
      </MuiButton>
  )
}
