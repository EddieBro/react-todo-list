import {Container, Stack, Typography} from '@mui/material';
import {useUser} from '../hooks/useUser.ts';
import {UserCard} from '@/shared/components/UserCard/UserCard.tsx';

export const UserPage = () => {
  const user = useUser();
  return (
      <Container maxWidth='xl' sx={{py: 4}}>
        <Stack spacing={3}>
          <Typography variant='h4' component='h1'>
            {user ? 'Пользователь' : 'Пользователь не найден'}
          </Typography>
          {user && <UserCard {...user} />}
        </Stack>
      </Container>
  );
}
