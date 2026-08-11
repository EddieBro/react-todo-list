import {useContext} from 'react';
import {SessionContext} from '@/core/session/SessionContext.ts';

export const useSession = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error('SessionProvider needed');
  }
  return ctx;
}
