import {type ReactNode} from 'react';
import {Box, IconButton, Modal as MuiModal} from '@mui/material';
import Close from '@mui/icons-material/Close';
import styles from './Modal.module.scss';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  showCloseButton?: boolean;
}

export const Modal = ({open, onClose, children, title, showCloseButton = true}: ModalProps) => {
  return (
      <MuiModal
          open={open}
          onClose={onClose}
          aria-labelledby='Модальное окно'
      >
        <Box className={styles['modal']}>
          <div className={styles['modal__title-block']}>
            <div className={styles['modal__title']}>{title}</div>
            {showCloseButton && <IconButton onClick={onClose} aria-label="Закрыть"><Close className={styles['modal__icon']} /> </IconButton>}
          </div>

          {children}
        </Box>
      </MuiModal>
  );
}
