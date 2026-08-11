import {type ReactNode, useState} from 'react';
import type {Session, User} from '@/core/models/models.ts';
import {SessionContext} from '@/core/session/SessionContext.ts';

export const SessionProvider = ({children}: {children: ReactNode}) => {
  const [currentUserId, setCurrentUserId] = useState<User['id'] | null>(() => {
    const raw = localStorage.getItem('session');
    return raw ? (JSON.parse(raw) as Session).userId : null;
  })

  const login = (userId: User['id']) => {
    setCurrentUserId(userId);
    localStorage.setItem('session', JSON.stringify({userId}));
  }

  const logout = () => {
    setCurrentUserId(null);
    localStorage.setItem('session', JSON.stringify({userId: null}))
  }

  return (
      <SessionContext.Provider value={{currentUserId, login, logout}}>
        {children}
      </SessionContext.Provider>
  )
}
