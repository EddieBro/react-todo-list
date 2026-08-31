import { useBoard } from './useBoard.ts';
import {useUsers} from '@/modules/users';
import {useMemo} from 'react';
import type {User} from '@/core/models/models.ts';

export const useBoardAccess = () => {
  const {board} = useBoard();
  const {users} = useUsers();

  return useMemo(() => {
    if (!board) return {owner: undefined, editors: [] as User[]};

    const userMap = new Map(users.map(u => [u.id, u]));

    return {
      owner: userMap.get(board.ownerId),
      editors: board.editorsIds
        .map(id => userMap.get(id))
        .filter((u): u is User => Boolean(u)),
    };
  }, [board, users]);
}
