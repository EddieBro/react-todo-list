import {Box, Container, Stack, Typography} from '@mui/material';
import {usersDataMock} from '@/modules/users/usersDataMock.ts';
import {UserList} from '@/shared/components/UserList/UserList.tsx';

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
