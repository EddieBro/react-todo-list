import { Link, Stack,} from '@mui/material';
import {NavLink} from 'react-router-dom';
import styles from './Header.module.scss'

export const Header = () => {
  return (
      <header className={styles.header}>
        <Stack component='nav' direction='row' spacing={3}>
          <Link underline='hover' component={NavLink} to='/users' color='inherit'>Пользователи</Link>
          <Link  underline='hover' component={NavLink} to='/boards' color='inherit'>Доски</Link>
        </Stack>
      </header>
  )
}
