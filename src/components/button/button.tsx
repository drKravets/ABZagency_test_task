import { FC } from '../../common/types/types';
import styles from './styles.module.scss';

type Props = {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
};

export const Button: FC<Props> = ({
  text,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      className={`${styles.button} ${
        disabled ? `${styles.disabled}` : `${styles.active}`
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
