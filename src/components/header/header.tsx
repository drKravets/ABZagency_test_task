import { FC } from '../../common/types/types';
import { Button } from '../button/button';
import styles from './styles.module.scss';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';

type Props = {
  signUpOnClick: () => void;
  usersOnClick: () => void;
};

export const Header: FC<Props> = ({
  signUpOnClick,
  usersOnClick,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContentContainer}>
        <Logo />
        <div className={styles.buttonGroup}>
          <Button text='Users' onClick={usersOnClick} />
          <Button text='Sign up' onClick={signUpOnClick} />
        </div>
      </div>
    </header>
  );
};
