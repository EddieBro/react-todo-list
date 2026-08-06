import {Box, Container, Stack, Typography} from '@mui/material';
import {usersDataMock} from '@/modules/users';
import {UserList} from '@/modules/users';

export const UserListPage = () => {
  return (
      <Container maxWidth='xl' sx={{py: 4}}>
        <Stack direction='row' sx={{justifyContent: 'space-between', alignItems: 'center', mb: 3}}>
          <Typography variant='h4' component='h1'>Пользователи</Typography>
        </Stack>

        <Box>
          <UserList userList={usersDataMock}  />
        </Box>
      </Container>
  )
}
