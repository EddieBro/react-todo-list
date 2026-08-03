import {HeaderContainer} from '@/modules/header/containers/HeaderContainer.tsx';
import { Outlet } from 'react-router-dom';
import styles from './RootLayout.module.scss'

export const RootLayout = () => {
  return (
      <>
        <div className={styles.pageWrap}>
          <div className={styles.pageWrapSideBar}>LeftSideBar</div>
          <div className={styles.centerBlock}>
            <HeaderContainer/>
            <Outlet />
          </div>
        </div>

      </>
  )
}
