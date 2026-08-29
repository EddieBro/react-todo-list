import {Outlet, useNavigation} from 'react-router-dom';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import styles from './RootLayout.module.scss';
import {PageSpinner} from '@/shared/ui/PageSpinner/PageSpinner.tsx';
import {useModuleLifecycle} from '@/core/store';
import {usersModuleEnter, usersModuleExit} from '@/modules/users';

export const RootLayout = () => {
  useModuleLifecycle(usersModuleEnter, usersModuleExit);
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
