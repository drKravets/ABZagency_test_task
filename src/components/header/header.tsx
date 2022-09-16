import { FC } from '../../common/types/types';
import { Button } from '../button/button';
import styles from './styles.module.scss';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <div className={styles.buttonGroup}>
        <Button text='Users' onClick={() => {}} />
        <Button text='Sign up' onClick={() => {}} />
      </div>
    </header>
  );
};
