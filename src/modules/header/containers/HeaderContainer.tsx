import {AppBar, Container, Link, Stack, Toolbar, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';
import styles from './HeaderContainer.module.scss'

export const HeaderContainer = () => {
  return (
      <AppBar position='sticky'>
        <Container maxWidth='xl'>
          <Toolbar sx={{gap: 3}}>
            <Typography className={styles.logo} variant='h4' component={NavLink} to='/'>Todo List</Typography>
            <Stack component='nav' direction='row' spacing={3}>
              <Link underline='hover' component={NavLink} to='/user' color='inherit'>Профиль</Link>
              <Link  underline='hover' component={NavLink} to='/board' color='inherit'>Доски</Link>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
  )
}
