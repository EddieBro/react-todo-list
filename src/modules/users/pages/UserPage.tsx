import {Container, Stack, Typography} from '@mui/material';
import {useUser} from '../hooks/useUser.ts';
import {UserCard} from '@/shared/components/UserCard/UserCard.tsx';
import {PageSpinner} from '@/shared/ui/PageSpinner/PageSpinner.tsx';

export const UserPage = () => {
  const {user, status} = useUser();

  if (status === 'loading') {
    return <PageSpinner/>;
  }

  if (status === 'error') {
    return <h1>Не удалось загрузить пользователя</h1>;
  }

  return (
      <Container maxWidth='xl' sx={{py: 4}}>
        <Stack spacing={3}>
          <Typography variant='h4' component='h1'>
            {user ? 'Пользователь' : 'Пользователь не найден'}
          </Typography>
          {user && <UserCard user={user} />}
        </Stack>
      </Container>
  );
}
