import type {User} from '@/core/models/models.ts';
import {getItem, setItem} from '@/shared/api/storage.ts';
import {usersDataMock} from '@/shared/api/mocks/usersDataMock.ts';
import type {UserApi} from '@/shared/api/types.ts';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export  const getUsers = async(): Promise<User[]> => {
  await delay(300);
  const cached = await getItem<User[]>('users');
  if(cached === null) {
    await setItem('users', usersDataMock);
    return usersDataMock;
  } else {
    return cached;
  }
}

export const getUser = async(id: User['id']): Promise<User | null> => {
  const users = await getUsers();
  return users.find(u => u.id === id) ?? null;
}

export const saveUser = async(user: User): Promise<User> => {
  await delay(300);
  const users = await getItem<User[]>('users') ?? [];
  const index = users.findIndex(u => u.id === user.id);
  let next: User[];
  if (index === -1) {
    next = [...users, user];
  } else {
    next = users.map(u => u.id === user.id ? user : u);
  }
  await setItem('users', next);
  return user;
}

export const deleteUser = async(id: User['id']) => {
  await delay(300);
  const users = await getItem<User[]>('users') ?? [];
  const next = users.filter(u => u.id !== id);
  await setItem('users', next);
}

export const userApi: UserApi = {
  getUsers,
  getUser,
  saveUser,
  deleteUser
}
