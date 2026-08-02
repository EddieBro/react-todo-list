import {Box, Container, Stack, Typography} from '@mui/material';
import {UserList} from '@/shared/components/UserList/UserList.tsx';
import {usersDataMock} from '@/modules/user/usersDataMock.ts';

export const UserPage = () => {
  const users = usersDataMock;
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
