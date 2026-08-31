import {MenuItem, Select, type SelectChangeEvent} from '@mui/material';
import {useUsers} from '@/modules/users';
import {useSession} from '@/core/session/useSession.ts';


// Нужен для проверки прав на доску. Положил рядом с Header компонентом потому что он часть хедера

export const CurrentUserSelect = () => {
  const {users} = useUsers();
  const {currentUserId, login, logout} = useSession();

  const value = users.some(u => u.id === currentUserId) ? currentUserId! : '';

  const handleChange = (event: SelectChangeEvent) => {
    const id = event.target.value;
    if (id) { login(id); } else { logout(); }
  };

  return (
      <Select size='small' displayEmpty value={value} onChange={handleChange} sx={{minWidth: 200}}>
        <MenuItem value=''><em>Не выбран</em></MenuItem>
        {users.map(user => (
            <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
        ))}
      </Select>
  );
};
