import {Outlet, useNavigation} from 'react-router-dom';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import styles from './RootLayout.module.scss';
import {PageSpinner} from '@/shared/ui/PageSpinner/PageSpinner.tsx';

export const RootLayout = () => {
  const navigation = useNavigation();
  return (
      <div className={styles.pageWrap}>
        <Sidebar />
        <div className={styles.centerBlock}>
          <Header />
          <main className={styles.content}>
            {navigation.state === 'loading' ? <PageSpinner /> : <Outlet />}
          </main>
        </div>
      </div>
  );
};
