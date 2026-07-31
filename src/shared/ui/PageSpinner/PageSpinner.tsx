import {Spinner} from '@/shared/ui/Spinner/Spinner.tsx';
import styles from './PageSpinner.module.scss';

type PageSpinnerProps  = {
  size?: number;
}

export const PageSpinner = ({size}: PageSpinnerProps) => {
  return (
      <div className={styles['page-spinner-wrap']}>
        <Spinner size={size} />
      </div>
  )
}
