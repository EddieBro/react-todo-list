import {Box, Container, Stack, Typography} from '@mui/material';
import {UserList} from '@/modules/users';
import {usersDataMock} from '@/shared/api/mocks/usersDataMock.ts';

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
