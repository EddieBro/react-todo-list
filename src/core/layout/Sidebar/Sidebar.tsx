import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';

export const Sidebar = () => {
  return (
      <aside className={styles.sidebar}>
        <NavLink to='/' className={styles.logo}>
          <img className={styles.logoImg} src='/img/svg/logo.svg' alt='Todo List' width={31} height={36} />
          <b className={styles.logoText}>todo</b>
        </NavLink>



      </aside>
  );
};
