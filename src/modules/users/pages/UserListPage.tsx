import {Box, Container, Stack, Typography} from '@mui/material';
import {UserList} from '../components/UserList/UserList.tsx';
import {useUsers} from '../hooks/useUsers.ts';

export const UserListPage = () => {
  const users = useUsers();
  return (
      <Container maxWidth='xl' sx={{py: 4}}>
        <Stack direction='row' sx={{justifyContent: 'space-between', alignItems: 'center', mb: 3}}>
          <Typography variant='h4' component='h1'>Пользователи</Typography>
        </Stack>
        <Box>
          <UserList userList={users}  />
        </Box>
      </Container>
  )
}
