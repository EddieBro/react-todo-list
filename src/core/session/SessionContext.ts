import type {User} from '@/core/models/models.ts';
import {createContext} from 'react';

type SessionContextValue = {
  currentUserId: User['id'] | null;
  login: (userId: User['id']) => void;
  logout: () => void;
}

export const SessionContext = createContext<SessionContextValue | null>(null);
