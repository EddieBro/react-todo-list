import {HeaderContainer} from '@/modules/header/components/HeaderContainer.tsx';
import { Outlet } from 'react-router-dom';

export const RootLayout = () => {
  return (
      <>
        <HeaderContainer/>
        <Outlet />
      </>
  )
}
