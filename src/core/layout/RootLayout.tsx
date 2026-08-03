import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import styles from './RootLayout.module.scss';

export const RootLayout = () => {
  return (
      <div className={styles.pageWrap}>
        <Sidebar />
        <div className={styles.centerBlock}>
          <Header />
          <main className={styles.content}>
            <Outlet />
          </main>
        </div>
      </div>
  );
};